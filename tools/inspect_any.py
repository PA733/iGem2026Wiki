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
   const st=n=>{if(!n)return null;const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),display:s.display,position:s.position,width:s.width,height:s.height,pad:s.padding,margin:s.margin,max:s.maxWidth,font:s.font,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,gap:s.gap,grid:s.gridTemplateColumns,align:s.alignItems,justify:s.justifyContent,bg:s.backgroundColor,color:s.color}};
   const inf=n=>({node:st(n),rect:rr(n),text:clean(n?.innerText).slice(0,220)});
   const leaf=t=>[...document.querySelectorAll('*')].filter(n=>n.children.length===0&&clean(n.innerText)===t)[0];
   const anc=n=>{let a=[];while(n&&a.length<8){a.push(inf(n));n=n.parentElement}return a};
   const h1=document.querySelector('h1'); const video=document.querySelector('video');
   const ps=[...document.querySelectorAll('p')].filter(n=>rr(n)?.w>0).slice(0,8).map(inf);
   const h2=[...document.querySelectorAll('h2')].slice(0,8).map(inf);
   const imgs=[...document.querySelectorAll('img')].filter(n=>rr(n)?.w>100).slice(0,15).map(inf);
   const buttons=[...document.querySelectorAll('button')].filter(n=>rr(n)?.w>0).slice(0,20).map(inf);
   const custom=[...document.querySelectorAll('*')].filter(n=>n.tagName.includes('-')&&rr(n)?.w>0).slice(0,80).map(inf);
   return {viewport:{innerWidth,innerHeight},scroll:(()=>{const n=[...document.querySelectorAll('*')].find(n=>n.className&&String(n.className).includes('page-content-height'));return n?{height:n.scrollHeight,client:n.clientHeight}:null})(),h1:h1?anc(h1):[],video:video?anc(video):[],heroText:anc(leaf('Material Design 3 is Google’s open-source design system for building beautiful, usable products.')),getStarted:anc(leaf('Get started')),ps,h2,imgs,buttons,custom};
  ''')
  print(json.dumps(x,indent=2))
 finally:d.quit()
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--url',required=True);p.add_argument('--width',type=int,required=True);p.add_argument('--height',type=int,default=900);a=p.parse_args();main(a.url,a.width,a.height)
