import argparse
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


def main(url: str, width: int, height: int) -> None:
    o = Options()
    o.add_argument('--headless=new')
    o.add_argument('--no-sandbox')
    o.add_argument('--disable-dev-shm-usage')
    o.add_argument('--window-size=800,900')
    d = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=o)
    try:
        d.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {
            'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': False,
        })
        d.get(url)
        d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
        result = d.execute_script(r'''
          const rr=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
          const q=s=>rr(document.querySelector(s));
          const cards=[...document.querySelectorAll('.material-card,.next-card')].map((n,i)=>({i,title:n.querySelector('h3')?.innerText,rect:rr(n),media:rr(n.querySelector('.card-media'))}));
          const sourceCards=[...document.querySelectorAll('mio-card')].filter(n=>String(n.innerText||'').trim()).map((n,i)=>({i,title:n.querySelector('.title')?.innerText,rect:rr(n),media:rr(n.querySelector('mio-thumbnail,.thumb-container')),copy:rr(n.querySelector('.content-container'))}));
          const sourceHero=[...document.querySelectorAll('mio-landing-page, .landing-page, [class*=hero]')].filter(n=>rr(n)?.w>0).slice(0,10).map(n=>({tag:n.tagName,cls:n.className,rect:rr(n),text:String(n.innerText||'').trim().slice(0,100)}));
          const sourceFooter=[...document.querySelectorAll('mio-footer,footer')].filter(n=>rr(n)?.w>0).map(n=>({tag:n.tagName,rect:rr(n),pad:getComputedStyle(n).padding,margin:getComputedStyle(n).margin}));
          return {viewport:{innerWidth,innerHeight,outerWidth,outerHeight},page:{rect:q('.page-content'),clientWidth:document.querySelector('.page-content')?.clientWidth,scrollHeight:document.querySelector('.page-content')?.scrollHeight},bar:q('.mobile-bar'),hero:q('.hero'),copy:q('.hero-copy'),h1:q('.hero-title h1'),p:q('.hero-title p'),media:q('.hero-media'),home:q('.home-content'),headings:[...document.querySelectorAll('h2')].map(rr),cards,sourceCards,sourceHero,sourceFooter,footer:q('.site-footer')};
        ''')
        print(json.dumps(result, indent=2, ensure_ascii=False))
    finally:
        d.quit()


if __name__ == '__main__':
    p=argparse.ArgumentParser(); p.add_argument('--url',required=True); p.add_argument('--width',type=int,required=True); p.add_argument('--height',type=int,default=844); a=p.parse_args(); main(a.url,a.width,a.height)
