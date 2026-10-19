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
          const clean = v => String(v ?? '').replace(/\s+/g, ' ').trim();
          const rect = node => { if (!node) return null; const r=node.getBoundingClientRect(); return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}; };
          const style = node => { if (!node) return null; const s=getComputedStyle(node); return {font:s.font,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,pad:s.padding,margin:s.margin,display:s.display,grid:s.gridTemplateColumns,gap:s.gap,bg:s.backgroundColor}; };
          const info = (node, extra={}) => ({...extra, rect:rect(node), style:style(node), text:clean(node?.innerText).slice(0,90)});
          const page=document.querySelector('.page-content');
          const hs=[...document.querySelectorAll('h2')];
          const cards=[...document.querySelectorAll('.material-card,.next-card')];
          const cardInfo=cards.map((n,i)=>info(n,{i,cls:n.className,title:clean(n.querySelector('h3')?.innerText),media:rect(n.querySelector('.card-media')),copy:info(n.querySelector('.card-copy')),titleRect:rect(n.querySelector('h3')),descriptionRect:rect(n.querySelector('p')),dateRect:rect(n.querySelector('.card-date'))}));
          const sourceCards=[...document.querySelectorAll('mio-card')].filter(n=>clean(n.innerText)).map((n,i)=>{
            const media=n.querySelector('mio-thumbnail,.thumb-container');
            const title=n.querySelector('.title');
            const description=n.querySelector('.description');
            return {i,title:clean(title?.innerText),rect:rect(n),media:rect(media),copy:rect(n.querySelector('.content-container')),description:rect(description)};
          });
          const toolbar=document.querySelector('.mobile-bar') || document.querySelector('mio-toolbar');
          const intros=[...document.querySelectorAll('.section-intro')].map((n,i)=>info(n,{i}));
          const paragraphs=[...document.querySelectorAll('p')].filter(n=>clean(n.innerText)).map((n,i)=>({i,text:clean(n.innerText).slice(0,120),rect:rect(n),style:style(n)}));
          return {url:location.href, viewport:{innerWidth,innerHeight,dpr:devicePixelRatio}, page:page?{rect:rect(page),clientWidth:page.clientWidth,clientHeight:page.clientHeight,scrollHeight:page.scrollHeight}:null, toolbar:info(toolbar), hero:info(document.querySelector('.hero')), copy:info(document.querySelector('.hero-copy')), h1:info(document.querySelector('.hero-title h1')), heroP:info(document.querySelector('.hero-title p')), cta:info(document.querySelector('.get-started')), media:info(document.querySelector('.hero-media')), home:info(document.querySelector('.home-content')), headings:hs.map(n=>info(n,{id:n.id})), intros, paragraphs, cards:cardInfo, sourceCards, footer:info(document.querySelector('.site-footer'))};
        ''')
        print(json.dumps(result, indent=2, ensure_ascii=False))
    finally:
        driver.quit()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', required=True)
    parser.add_argument('--width', type=int, required=True)
    parser.add_argument('--height', type=int, default=900)
    args = parser.parse_args()
    main(args.url, args.width, args.height)
