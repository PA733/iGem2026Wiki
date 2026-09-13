import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
o=Options();o.add_argument('--headless=new');o.add_argument('--no-sandbox');o.add_argument('--disable-dev-shm-usage');o.add_argument('--window-size=1440,961')
d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'),options=o)
try:
 d.get('https://m3.material.io/');d.execute_async_script("const x=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,2200))]).then(x)")
 result=d.execute_script(r'''
 const f=document.querySelector('footer'); const clean=x=>String(x??'').replace(/\s+/g,' ').trim(); const out=[];
 const rr=n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}};
 for(const a of f.querySelectorAll('a')){const s=getComputedStyle(a),r=rr(a);out.push({text:clean(a.innerText),cls:clean(a.className),r,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,pad:s.padding,margin:s.margin,display:s.display})}
 return out;
 ''')
 print(json.dumps(result,indent=2))
finally:d.quit()
