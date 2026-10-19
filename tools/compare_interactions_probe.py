import json, time, sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


def drv(width=1440, height=961, emu=False):
    o=Options(); o.add_argument('--headless=new'); o.add_argument('--no-sandbox'); o.add_argument('--disable-dev-shm-usage'); o.add_argument(f'--window-size={width},{height}')
    o.set_capability('goog:loggingPrefs', {'browser':'ALL'})
    d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'),options=o)
    if emu:
        d.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {'width':width,'height':height,'deviceScaleFactor':1,'mobile':False})
    return d

def wait(d, sec=2): d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,%d))]).then(done)"%(sec*1000))
def visible(n):
    try: return n.is_displayed() and n.size['width']>0 and n.size['height']>0
    except: return False
def rect(d,n): return d.execute_script("const r=arguments[0].getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}",n)
def one(d, selectors):
    for s in selectors:
        for n in d.find_elements(By.CSS_SELECTOR,s):
            if visible(n): return n
    return None
def snap(d):
    return d.execute_script(r'''const clean=v=>String(v??'').replace(/\s+/g,' ').trim();const vis=n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.display!='none'&&s.visibility!='hidden'};const info=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {tag:n.tagName,cls:clean(n.className),text:clean(n.innerText||n.textContent).slice(0,120),aria:n.getAttribute('aria-label'),role:n.getAttribute('role'),href:n.getAttribute('href'),x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}};return {url:location.href,htmlClass:document.documentElement.className,bodyClass:document.body.className,buttons:[...document.querySelectorAll('button,[role=button],mio-toggle-switch')].filter(vis).map(info),links:[...document.querySelectorAll('a')].filter(vis).slice(0,30).map(info),inputs:[...document.querySelectorAll('input,textarea')].filter(vis).map(info),videos:[...document.querySelectorAll('video')].map(v=>({paused:v.paused,currentTime:v.currentTime,muted:v.muted})),overlays:[...document.querySelectorAll('[role=dialog],dialog,[class*=search-overlay],[class*=drawer],[class*=scrim],[class*=menu]')].filter(vis).map(info)}''')

def probe_desktop(url):
    d=drv(); out={}
    try:
      d.get(url); wait(d); out['initial']=snap(d)
      # Search: source's search is a link. Click then record resulting URL/page; restore home.
      s=one(d,['a[aria-label="Search"]','.search-fab','a.section-fab'])
      out['searchControl']={'found':bool(s),'info': (d.execute_script('return arguments[0].outerHTML.slice(0,500)',s) if s else None)}
      if s:
        href=s.get_attribute('href'); out['searchHref']=href
        try:
          s.click(); time.sleep(1.5); out['afterSearchClick']=snap(d)
        except Exception as e: out['searchClickError']=repr(e)
        d.get(url); wait(d)
      # Video button / rail animation and theme controls, picking exact source labels.
      v=one(d,['video']); vc=one(d,['#btnToggleVideo','.video-control','.ally-container'])
      out['videoBefore']={'video':bool(v),'state': d.execute_script('return arguments[0]&&{paused:arguments[0].paused,currentTime:arguments[0].currentTime}',v) if v else None,'control':snap(d)['buttons'][-1] if snap(d)['buttons'] else None}
      if vc:
        vc.click(); time.sleep(.25); out['videoAfterClick']={'state':d.execute_script('return {paused:document.querySelector("video")?.paused}',), 'control':snap(d)['buttons'][-1] if snap(d)['buttons'] else None}
      # Find animation/theme switches by aria-label, click each, record classes/styles.
      for label in ['Pause animations','Play animations','Switch to dark mode','Switch to light mode']:
        n=one(d,[f'[aria-label="{label}"]'])
        if n:
          n.click(); time.sleep(.35); out['after_'+label]=snap(d)
          break
      # Locate second switch after animation maybe theme; click if light/dark change not yet recorded.
      n=one(d,['[aria-label="Switch to dark mode"]','[aria-label="Switch to light mode"]'])
      if n and 'after_Switch to' not in ''.join(out):
        n.click(); time.sleep(.35); out['afterTheme']=snap(d)
      try: out['logs']=d.get_log('browser')
      except: pass
    finally:d.quit()
    return out

def probe_mobile(url):
    d=drv(390,844,True); out={}
    try:
      d.get(url); wait(d); out['initial']=snap(d)
      # Collect visible top-level controls and click likely menu button (first button with menu icon / aria).
      controls=d.execute_script(r'''const vis=n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.display!='none'&&s.visibility!='hidden'};return [...document.querySelectorAll('button,[role=button],a')].filter(vis).map(n=>({tag:n.tagName,txt:(n.innerText||n.textContent||'').trim().replace(/\s+/g,' '),aria:n.getAttribute('aria-label'),href:n.getAttribute('href'),cls:String(n.className),r:(()=>{const z=n.getBoundingClientRect();return {x:z.x,y:z.y,w:z.width,h:z.height}})()})).filter(x=>x.r.y<80)''')
      out['topControls']=controls
      # Source uses a custom MIO-ICON-BUTTON element (not a native button).
      menu=one(d,['mio-icon-button[aria-label="open menu"]','[aria-label="open menu"]'])
      if menu:
        out['menuControl']={'info':d.execute_script('return arguments[0].outerHTML.slice(0,500)',menu)}
        menu.click(); time.sleep(.5); out['afterMenu']=snap(d); d.save_screenshot('/tmp/source-mobile-menu.png')
        # click scrim if any (using JS to avoid hit-testing issues)
        scr=one(d,['.drawer-scrim','[class*=scrim]']);
        if scr: d.execute_script('arguments[0].click()',scr); time.sleep(.25); out['afterScrim']=snap(d)
      # Search top control
      d.get(url); wait(d); search=one(d,['mio-icon-button[aria-label="search"]','[aria-label="search"]','.search-fab']);
      if search:
        out['mobileSearchControl']={'info':d.execute_script('return arguments[0].outerHTML.slice(0,500)',search),'href':search.get_attribute('href')}
        search.click(); time.sleep(1); out['afterMobileSearch']=snap(d)
    finally:d.quit()
    return out

if __name__=='__main__':
  url=sys.argv[1] if len(sys.argv)>1 else 'https://m3.material.io/'
  print(json.dumps({'desktop':probe_desktop(url),'mobile':probe_mobile(url)},ensure_ascii=False,indent=2))
