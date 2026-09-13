import argparse
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


def main(url: str, width: int, height: int) -> None:
    o = Options(); o.add_argument('--headless=new'); o.add_argument('--no-sandbox'); o.add_argument('--disable-dev-shm-usage'); o.add_argument(f'--window-size={width},{height}')
    d = webdriver.Chrome(service=Service('/usr/bin/chromedriver', port=9515), options=o)
    try:
        d.get(url)
        d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
        out = d.execute_script(r'''
          const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
          const rr=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
          const inf=n=>{if(!n)return null;const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),rect:rr(n),src:n.currentSrc||n.src||n.getAttribute('src'),display:s.display,width:s.width,height:s.height,objectFit:s.objectFit,objectPosition:s.objectPosition,background:s.backgroundImage,backgroundSize:s.backgroundSize,backgroundPosition:s.backgroundPosition,borderRadius:s.borderRadius,overflow:s.overflow,margin:s.margin,padding:s.padding}};
          const root=[...document.querySelectorAll('mio-thumbnail,.card-media')].find(n=>rr(n)?.w>500&&rr(n)?.y>700);
          return {root:inf(root),children:root?[root,...root.querySelectorAll('*')].filter(n=>rr(n)?.w>0).slice(0,20).map(inf):[]};
        ''')
        print(json.dumps(out, indent=2, ensure_ascii=False))
    finally: d.quit()


if __name__ == '__main__':
    p=argparse.ArgumentParser(); p.add_argument('--url',required=True); p.add_argument('--width',type=int,default=1440); p.add_argument('--height',type=int,default=961); a=p.parse_args(); main(a.url,a.width,a.height)
