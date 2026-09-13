import argparse,json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

p=argparse.ArgumentParser();p.add_argument('--width',type=int,default=500);a=p.parse_args()
o=Options();o.add_argument('--headless=new');o.add_argument('--no-sandbox');o.add_argument('--disable-dev-shm-usage');o.add_argument(f'--window-size={a.width},900')
d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'),options=o)
try:
 d.get('https://m3.material.io/');d.execute_async_script("const x=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,2000))]).then(x)")
 result=d.execute_script(r'''
 const clean=v=>String(v??'').replace(/\s+/g,' ').trim();const rr=n=>{const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};const st=n=>{const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),font:s.font,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,margin:s.margin,padding:s.padding,display:s.display,grid:s.gridTemplateColumns,gap:s.gap,align:s.alignItems,justify:s.justifyContent,bg:s.backgroundColor,r:rr(n)}};const inf=n=>({text:clean(n.innerText).slice(0,180),...st(n)});
 const cards=[...document.querySelectorAll('mio-card')].filter(n=>clean(n.innerText));
 return {cards:cards.slice(0,20).map(card=>({text:clean(card.innerText).slice(0,100),r:rr(card),children:[...card.querySelectorAll('*')].filter(n=>rr(n).w>0&&['DIV','SPAN','P','MIO-THUMBNAIL'].includes(n.tagName)).map(inf)}))};
 ''')
 print(json.dumps(result,indent=2))
finally:d.quit()
