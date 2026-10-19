import argparse
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


def main(url: str, width: int, height: int) -> None:
    o = Options()
    o.add_argument('--headless=new'); o.add_argument('--no-sandbox'); o.add_argument('--disable-dev-shm-usage'); o.add_argument(f'--window-size={width},{height}')
    d = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=o)
    try:
        d.get(url)
        d.execute_async_script("const done=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
        result = d.execute_script(r'''
          const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
          const rr=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
          const st=n=>{if(!n)return null;const s=getComputedStyle(n);return {display:s.display,width:s.width,height:s.height,pad:s.padding,margin:s.margin,maxWidth:s.maxWidth,font:s.font,line:s.lineHeight,grid:s.gridTemplateColumns,gap:s.gap}};
          const q=s=>{const n=document.querySelector(s);return {selector:s,rect:rr(n),style:st(n),text:n?clean(n.innerText).slice(0,120):null}};
          const byText=t=>[...document.querySelectorAll('*')].find(n=>n.children.length===0&&clean(n.innerText)===t);
          const textInfo=t=>{const n=byText(t);return n?{tag:n.tagName,cls:clean(n.className),rect:rr(n),style:st(n)}:null};
          const selectors=['.mobile-bar','.mobile-bar-button','.mobile-brand','.mobile-brand .symbol','.hero','.hero-copy','.hero-title h1','.hero-title p','.get-started','.hero-media','.home-content','.content-section h2','.material-card','.site-footer'];
          return {viewport:{innerWidth,innerHeight,dpr:devicePixelRatio},scroll:(()=>{const n=document.querySelector('.page-content');return n?{client:n.clientHeight,height:n.scrollHeight}:null})(),items:selectors.map(q),social:textInfo('Material Design 3')};
        ''')
        print(json.dumps(result, indent=2))
    finally:
        d.quit()


if __name__ == '__main__':
    p=argparse.ArgumentParser();p.add_argument('--url',required=True);p.add_argument('--width',type=int,required=True);p.add_argument('--height',type=int,default=900);a=p.parse_args();main(a.url,a.width,a.height)
