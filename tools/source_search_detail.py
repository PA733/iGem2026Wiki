import json
import sys
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


def make(width=1440, height=961, mobile=False):
    options = Options()
    options.add_argument('--headless=new')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument(f'--window-size={width},{height}')
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    d = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=options)
    if mobile:
        d.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': False})
    return d


def wait(d, sec=1.8):
    d.execute_async_script("const done=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,%d))]).then(done)" % int(sec * 1000))


def dump(d):
    return d.execute_script(r'''
      const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
      const rect=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
      const info=n=>{if(!n)return null;const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),id:n.id,text:clean(n.innerText||n.textContent).slice(0,260),aria:n.getAttribute('aria-label'),role:n.getAttribute('role'),href:n.getAttribute('href'),placeholder:n.getAttribute('placeholder'),value:n.value,type:n.getAttribute('type'),rect:rect(n),display:s.display,position:s.position,visibility:s.visibility,opacity:s.opacity,z:s.zIndex,bg:s.backgroundColor,color:s.color,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight,padding:s.padding,margin:s.margin,gap:s.gap,border:s.border,borderRadius:s.borderRadius,boxShadow:s.boxShadow,overflow:s.overflow,transform:s.transform,transition:s.transition}};
      const visible=n=>{if(!n)return false;const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'};
      const selectors=['body','app-root','mio-app','.app','.page-content','.page-content-height','main','header','nav','aside','.search-container','.search-page','.search-input-container','.search-input','.search-autocorrect','.search-history-section','.search-suggestions','.search-suggestion-title','.search-suggestion-list','.search-suggestion-item','.search-suggestion-category','.search-results','.search-result','.section-fab','[aria-label="Search"]','[aria-label="clear search input"]','[aria-label="open menu"]'];
      const picked=[]; for(const s of selectors){for(const n of document.querySelectorAll(s)){if(visible(n)&&!picked.includes(n))picked.push(n)}}
      return {url:location.href,title:document.title,viewport:{innerWidth,innerHeight},htmlClass:document.documentElement.className,bodyClass:document.body.className,scroll:{html:document.documentElement.scrollHeight,body:document.body.scrollHeight},nodes:picked.map(info),inputs:[...document.querySelectorAll('input,textarea')].map(info),buttons:[...document.querySelectorAll('button,[role=button],mio-icon-button,mio-toggle-switch')].filter(visible).map(info),visibleText:[...document.querySelectorAll('h1,h2,h3,h4,p')].filter(visible).map(info).slice(0,80)};
    ''')


def detail(width, height, mobile):
    d=make(width,height,mobile)
    try:
      d.get('https://m3.material.io/search.html'); wait(d)
      out={'initial':dump(d)}
      fields=[n for n in d.find_elements(By.CSS_SELECTOR,'input.search-input') if n.is_displayed()]
      if fields:
        f=fields[0]; f.click(); f.send_keys('button'); time.sleep(.9); out['typedButton']=dump(d)
        clear=[n for n in d.find_elements(By.CSS_SELECTOR,'[aria-label="clear search input"]') if n.is_displayed()]
        out['clearControl'] = dump(d) if not clear else {'info':d.execute_script('return arguments[0].outerHTML.slice(0,900)',clear[0]),'rect':d.execute_script('const r=arguments[0].getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}',clear[0])}
        if clear:
          d.execute_script('arguments[0].click()',clear[0]); time.sleep(.35); out['afterClear']=dump(d)
        f=next((n for n in d.find_elements(By.CSS_SELECTOR,'input.search-input') if n.is_displayed()),None)
        if f:
          f.send_keys('button'); time.sleep(.35); f.send_keys(Keys.ESCAPE); time.sleep(.35); out['afterEscape']=dump(d)
      d.save_screenshot('/tmp/source-search-detail-%s.png' % ('mobile' if mobile else 'desktop'))
      return out
    finally: d.quit()


if __name__=='__main__':
    width=int(sys.argv[1]) if len(sys.argv)>1 else 1440
    height=int(sys.argv[2]) if len(sys.argv)>2 else 961
    mobile=bool(int(sys.argv[3])) if len(sys.argv)>3 else False
    print(json.dumps(detail(width,height,mobile),ensure_ascii=False,indent=2))
