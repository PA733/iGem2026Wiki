import argparse
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


def main(url: str, width: int, height: int) -> None:
    options = Options()
    options.add_argument('--headless=new')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument(f'--window-size={width},{height}')
    driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=options)
    try:
        driver.get(url)
        driver.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
        result = driver.execute_script(r'''
          const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
          const rect=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
          const info=n=>{if(!n)return null;const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),text:clean(n.innerText||n.textContent),rect:rect(n),display:s.display,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,pad:s.padding,margin:s.margin,gap:s.gap,bg:s.backgroundColor,color:s.color,variation:s.fontVariationSettings}};
          const navs=[...document.querySelectorAll('nav,aside,[class*=nav-rail],[class*=navigation]')].filter(n=>rect(n)?.w>0);
          const bottom=[...document.querySelectorAll('button,a')].filter(n=>{const r=rect(n);return r&&r.y>innerHeight*.65&&r.w>0}).map(info);
          return {viewport:{innerWidth,innerHeight},bottom,navs:navs.slice(0,10).map(n=>({self:info(n),children:[n,...n.querySelectorAll('a,button,[class*=label],[class*=icon],span')].filter(x=>rect(x)?.w>0).slice(0,80).map(info)}))};
        ''')
        print(json.dumps(result, indent=2, ensure_ascii=False))
    finally:
        driver.quit()


if __name__ == '__main__':
    p=argparse.ArgumentParser(); p.add_argument('--url', required=True); p.add_argument('--width', type=int, required=True); p.add_argument('--height', type=int, default=900); a=p.parse_args(); main(a.url,a.width,a.height)
