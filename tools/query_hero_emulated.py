import argparse,json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

def main(url,w,h):
 o=Options();o.add_argument('--headless=new');o.add_argument('--no-sandbox');o.add_argument('--disable-dev-shm-usage');o.add_argument('--window-size=800,900')
 d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'),options=o)
 try:
  d.execute_cdp_cmd('Emulation.setDeviceMetricsOverride',{'width':w,'height':h,'deviceScaleFactor':1,'mobile':False})
  d.get(url);d.execute_async_script("const done=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
  x=d.execute_script(r'''
   const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
   const rr=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
   const inf=n=>{if(!n)return null;const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),text:clean(n.innerText||n.textContent).slice(0,160),rect:rr(n),display:s.display,font:s.font,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,pad:s.padding,margin:s.margin,grid:s.gridTemplateColumns,gap:s.gap,box:s.boxSizing,height:s.height,minHeight:s.minHeight,maxHeight:s.maxHeight,alignSelf:s.alignSelf,flex:s.flex,overflow:s.overflow,border:s.border}};
   const leaves=[...document.querySelectorAll('*')].filter(n=>n.children.length===0&&clean(n.innerText||n.textContent));
   const wanted=['Material Design','Material Design 3 is Google’s open-source design system for building beautiful, usable products.','Get started'];
   const found=wanted.map(t=>{let n=leaves.find(x=>clean(x.innerText||x.textContent)===t);let a=[];while(n&&a.length<6){a.push(inf(n));n=n.parentElement}return {t,anc:a}});
   const media=[...document.querySelectorAll('video,mio-hero,mio-thumbnail,[class*=hero],[class*=video]')].filter(n=>rr(n)?.w>0).slice(0,30).map(n=>({self:inf(n),anc:(()=>{let a=[];for(let x=n.parentElement;x&&a.length<6;x=x.parentElement)a.push(inf(x));return a})()}));
   const ctas=[...document.querySelectorAll('a,button')].filter(n=>clean(n.innerText||n.textContent)==='Get started'&&rr(n)?.w>0).map(inf);
   return {viewport:{innerWidth,innerHeight},found,ctas,media};
  ''')
  print(json.dumps(x,indent=2,ensure_ascii=False))
 finally:d.quit()
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--url',required=True);p.add_argument('--width',type=int,required=True);p.add_argument('--height',type=int,default=844);a=p.parse_args();main(a.url,a.width,a.height)
