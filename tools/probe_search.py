import json
import sys
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


def make(url, width=1440, height=961, emu=False):
    o = Options()
    o.add_argument('--headless=new')
    o.add_argument('--no-sandbox')
    o.add_argument('--disable-dev-shm-usage')
    o.add_argument(f'--window-size={width},{height}')
    d = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=o)
    if emu:
        d.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': False})
    d.get(url)
    d.execute_async_script("const done=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
    return d


def dump(d):
    return d.execute_script(r'''
      const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
      const rect=n=>{const r=n.getBoundingClientRect();return {x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}};
      const inf=n=>{const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),text:clean(n.innerText||n.textContent).slice(0,240),aria:n.getAttribute('aria-label'),role:n.getAttribute('role'),href:n.getAttribute('href'),value:n.value,placeholder:n.getAttribute('placeholder'),type:n.getAttribute('type'),rect:rect(n),display:s.display,visibility:s.visibility,opacity:s.opacity,bg:s.backgroundColor,color:s.color,font:s.font,z:s.zIndex}};
      const vis=n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'};
      return {url:location.href,title:document.title,htmlClass:document.documentElement.className,bodyClass:document.body.className,inputs:[...document.querySelectorAll('input,textarea')].map(inf),buttons:[...document.querySelectorAll('button,[role=button],mio-icon-button')].filter(vis).map(inf),links:[...document.querySelectorAll('a')].filter(vis).slice(0,25).map(inf),headings:[...document.querySelectorAll('h1,h2,h3')].filter(vis).map(inf),cards:[...document.querySelectorAll('a,article,[class*=result],[class*=search]')].filter(n=>vis(n)&&rect(n).y>70).slice(0,40).map(inf),scroll:{height:document.documentElement.scrollHeight,body:document.body.scrollHeight}};
    ''')


def run(base):
    d=make(base)
    out={'base':base,'home':dump(d)}
    try:
      # Search control differs between source and clone; click first visible aria Search / search-fab.
      nodes=d.find_elements(By.CSS_SELECTOR,'a[aria-label="Search"],button[aria-label="Search"],mio-icon-button[aria-label="search"],button.search-fab,.search-fab')
      nodes=[n for n in nodes if n.is_displayed()]
      out['control']={'count':len(nodes),'outer':d.execute_script('return arguments[0].outerHTML.slice(0,800)',nodes[0]) if nodes else None}
      if nodes:
        out['hrefBefore']=nodes[0].get_attribute('href')
        nodes[0].click();time.sleep(1.2);out['afterClick']=dump(d)
      fields=d.find_elements(By.CSS_SELECTOR,'input.search-input,input[placeholder*=Search i],input')
      fields=[n for n in fields if n.is_displayed()]
      out['visibleFields']=[d.execute_script('return arguments[0].outerHTML.slice(0,800)',n) for n in fields]
      if fields:
        f=fields[-1]; f.click();f.send_keys('button');time.sleep(.8);out['afterType']=dump(d)
        f.send_keys(Keys.ESCAPE);time.sleep(.3);out['afterEscape']=dump(d)
    except Exception as e: out['error']=repr(e)
    finally:d.quit()
    return out


if __name__=='__main__':
    for url in sys.argv[1:] or ['https://m3.material.io/','http://127.0.0.1:4200/']:
      print(json.dumps(run(url),ensure_ascii=False,indent=2))
