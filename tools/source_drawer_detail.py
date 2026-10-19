import json
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


def make():
    o=Options(); o.add_argument('--headless=new'); o.add_argument('--no-sandbox'); o.add_argument('--disable-dev-shm-usage'); o.add_argument('--window-size=390,844')
    o.set_capability('goog:loggingPrefs', {'browser':'ALL'})
    d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=o)
    d.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {'width':390,'height':844,'deviceScaleFactor':1,'mobile':False})
    d.get('https://m3.material.io/')
    d.execute_async_script("const done=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
    return d


def dump(d):
    return d.execute_script(r'''
      const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
      const vis=n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'};
      const rect=n=>{const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
      const info=n=>{const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),id:n.id,text:clean(n.innerText||n.textContent).slice(0,180),aria:n.getAttribute('aria-label'),role:n.getAttribute('role'),href:n.getAttribute('href'),rect:rect(n),display:s.display,position:s.position,z:s.zIndex,bg:s.backgroundColor,color:s.color,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight,padding:s.padding,margin:s.margin,gap:s.gap,border:s.border,borderRadius:s.borderRadius,boxShadow:s.boxShadow,overflow:s.overflow,opacity:s.opacity,transform:s.transform,transition:s.transition}};
      const nodes=[...document.querySelectorAll('body,header,nav,aside,button,a,mio-icon-button,mio-toggle-switch,[role=switch],div,span')].filter(n=>vis(n)&&(/drawer|nav-drawer|scrim|section-menu|icon-button|toggle-switch|home-page|mobile|menu/.test(clean(n.className)+' '+n.tagName.toLowerCase())||n.getAttribute('aria-label')));
      return {url:location.href,htmlClass:document.documentElement.className,bodyClass:document.body.className,scroll:{x:document.querySelector('.page-content')?.scrollLeft,y:document.querySelector('.page-content')?.scrollTop,height:document.querySelector('.page-content')?.scrollHeight},nodes:nodes.map(info)};
    ''')


def click(d, selector):
    n=[n for n in d.find_elements(By.CSS_SELECTOR,selector) if n.is_displayed()]
    if not n:return False
    d.execute_script('arguments[0].click()',n[0]);time.sleep(.35);return True


def run():
    d=make(); out={'initial':dump(d)}
    try:
      click(d,'[aria-label="open menu"]');out['opened']=dump(d);d.save_screenshot('/tmp/source-drawer-detail.png')
      # Record candidate backdrop/scrim elements and click outside at x360,y420.
      candidates=d.execute_script(r'''const vis=n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.display!='none'&&s.visibility!='hidden'};return [...document.querySelectorAll('*')].filter(vis).map(n=>({tag:n.tagName,cls:String(n.className),aria:n.getAttribute('aria-label'),r:(()=>{const q=n.getBoundingClientRect();return {x:q.x,y:q.y,w:q.width,h:q.height}})(),bg:getComputedStyle(n).backgroundColor,z:getComputedStyle(n).zIndex})).filter(x=>x.r.w>=370&&x.r.h>=700)''')
      out['largeLayers']=candidates
      d.execute_script('document.elementFromPoint(360,420)?.click()');time.sleep(.35);out['afterOutsideClick']=dump(d)
      # Re-open, close via icon button, then reopen and Escape.
      click(d,'[aria-label="open menu"]');out['reopened']=dump(d)
      click(d,'[aria-label="close menu"]');out['afterCloseIcon']=dump(d)
      click(d,'[aria-label="open menu"]');d.find_element(By.TAG_NAME,'body').send_keys(Keys.ESCAPE);time.sleep(.35);out['afterEscape']=dump(d)
      # Re-open and click Home; record route/menu visibility.
      click(d,'[aria-label="open menu"]'); home=[n for n in d.find_elements(By.CSS_SELECTOR,'a[aria-label="Home"]') if n.is_displayed()]
      if home:d.execute_script('arguments[0].click()',home[0]);time.sleep(.7)
      out['afterHomeClick']=dump(d)
    finally:d.quit()
    return out


if __name__=='__main__':print(json.dumps(run(),ensure_ascii=False,indent=2))
