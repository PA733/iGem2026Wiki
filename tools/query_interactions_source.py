import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


def make_driver(width=1440, height=961):
    o = Options()
    o.add_argument('--headless=new')
    o.add_argument('--no-sandbox')
    o.add_argument('--disable-dev-shm-usage')
    o.add_argument(f'--window-size={width},{height}')
    o.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    return webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=o)


def ready(d, delay=2.0):
    d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,%d))]).then(done)" % int(delay * 1000))


def js_state(d):
    return d.execute_script(r'''
      const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
      const rect=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
      const visible=n=>{const r=rect(n),s=getComputedStyle(n);return r&&r.w>0&&r.h>0&&s.display!=='none'&&s.visibility!=='hidden'};
      const info=n=>{if(!n)return null;const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),id:n.id,text:clean(n.innerText||n.textContent).slice(0,160),aria:n.getAttribute('aria-label'),role:n.getAttribute('role'),rect:rect(n),display:s.display,bg:s.backgroundColor,color:s.color,font:s.font,position:s.position,z:s.zIndex}};
      const all=[...document.querySelectorAll('*')];
      return {
        url:location.href,
        title:document.title,
        viewport:{innerWidth,innerHeight,dpr:devicePixelRatio},
        htmlClass:document.documentElement.className,
        bodyClass:document.body.className,
        bodyBg:getComputedStyle(document.body).backgroundColor,
        buttons:[...document.querySelectorAll('button,[role=button]')].filter(visible).map(info),
        links:[...document.querySelectorAll('a')].filter(visible).map(info).slice(0,80),
        videos:[...document.querySelectorAll('video')].map(v=>({info:info(v),paused:v.paused,muted:v.muted,autoplay:v.autoplay,loop:v.loop,currentTime:v.currentTime,duration:v.duration})),
        inputs:[...document.querySelectorAll('input,textarea')].filter(visible).map(info),
        dialogs:[...document.querySelectorAll('[role=dialog],dialog,[class*=search],[class*=drawer],[class*=menu]')].filter(visible).map(info).slice(0,80),
      };
    ''')


def main():
    d=make_driver()
    try:
      d.get('https://m3.material.io/')
      ready(d)
      print(json.dumps({'initial':js_state(d)},ensure_ascii=False,indent=2))
      # Capture visible page screenshot for visual inspection (no OCR).
      d.save_screenshot('/tmp/source-interactions-initial.png')
      # Print browser console entries too.
      try: print(json.dumps({'logs':d.get_log('browser')},ensure_ascii=False,indent=2))
      except Exception as e: print('logs unavailable',e)
    finally:
      d.quit()


if __name__=='__main__': main()
