import argparse
import json
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By


def main(url: str, width: int, height: int) -> None:
    o = Options()
    o.add_argument('--headless=new')
    o.add_argument('--no-sandbox')
    o.add_argument('--disable-dev-shm-usage')
    o.add_argument(f'--window-size={width},{height}')
    d = webdriver.Chrome(service=Service('/usr/bin/chromedriver', port=9515), options=o)
    try:
        d.get(url)
        d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
        # The source uses the second rail control; the clone exposes the same
        # control class, while this fallback finds the theme-labelled button.
        controls = d.find_elements(By.CSS_SELECTOR, '.rail-control, .theme-toggle, [aria-label*="dark"], [aria-label*="theme"]')
        if controls:
            controls[-1].click()
            time.sleep(.5)
        else:
            # Find the visible symbol and click its nearest actionable parent.
            d.execute_script(r'''
              const n=[...document.querySelectorAll('*')].find(x=>String(x.textContent||'').trim()==='dark_mode' && x.getBoundingClientRect().width>0);
              const a=n?.closest('button,a'); if(a) a.click();
            ''')
            time.sleep(.5)
        result = d.execute_script(r'''
          const q=s=>document.querySelector(s);
          const cs=n=>{if(!n)return null;const s=getComputedStyle(n);return {bg:s.backgroundColor,color:s.color,font:s.font,fontFamily:s.fontFamily,transition:s.transition}};
          const all=[...document.querySelectorAll('*')];
          const byText=t=>all.find(x=>String(x.textContent||'').trim()===t&&x.getBoundingClientRect().width>0);
          const first=s=>q(s);
          return {body:cs(document.body),root:cs(q('.app')||document.documentElement),page:cs(q('.page-content')),rail:cs(q('.nav-rail')||byText('material_design')?.parentElement),card:cs(q('.material-card')||byText('What’s new at Google I/O 2026')?.closest('a')),cta:cs(q('.get-started, mio-button')||byText('Get started')?.closest('a,button')),search:cs(q('.search-fab,.section-fab')),videoControl:cs(q('.video-control,.ally-container')),
            classes:q('.app')?.className,htmlClass:document.documentElement.className};
        ''')
        print(json.dumps(result, indent=2, ensure_ascii=False))
    finally:
        d.quit()


if __name__ == '__main__':
    p=argparse.ArgumentParser(); p.add_argument('--url',required=True); p.add_argument('--width',type=int,default=1440); p.add_argument('--height',type=int,default=961); a=p.parse_args(); main(a.url,a.width,a.height)
