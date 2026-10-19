import argparse,json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

def main(url,w,h):
 o=Options();o.add_argument('--headless=new');o.add_argument('--no-sandbox');o.add_argument('--disable-dev-shm-usage');o.add_argument(f'--window-size={w},{h}')
 d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'),options=o)
 try:
  d.get(url);d.execute_async_script("const done=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
  x=d.execute_script(r'''
   const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
   const rr=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
   const inf=n=>{if(!n)return null;const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),text:clean(n.innerText||n.textContent).slice(0,140),rect:rr(n),display:s.display,font:s.font,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,pad:s.padding,margin:s.margin,gap:s.gap,grid:s.gridTemplateColumns,bg:s.backgroundColor}};
   const footerRoot=document.querySelector('mio-footer,.site-footer');
   const matches=[...document.querySelectorAll('*')].filter(n=>rr(n)?.w>0 && (footerRoot?.contains(n) || n===footerRoot || clean(n.innerText).includes('Material Design is an adaptable system') || /footer|legal|social|libraries|google-sites|about/.test(String(n.className))));
   const uniq=[];for(const n of matches){if(!uniq.some(x=>x===n))uniq.push(n)}
   return {viewport:{innerWidth,innerHeight},nodes:uniq.slice(-100).map(inf)};
  ''')
  print(json.dumps(x,indent=2,ensure_ascii=False))
 finally:d.quit()
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--url',required=True);p.add_argument('--width',type=int,required=True);p.add_argument('--height',type=int,default=900);a=p.parse_args();main(a.url,a.width,a.height)
