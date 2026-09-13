import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
o=Options();o.add_argument('--headless=new');o.add_argument('--no-sandbox');o.add_argument('--disable-dev-shm-usage');o.add_argument('--window-size=1440,961')
d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'),options=o)
try:
 d.get('https://m3.material.io/');d.execute_async_script("const x=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(x)")
 result=d.execute_script(r'''
 const f=document.querySelector('footer'); const clean=x=>String(x??'').replace(/\s+/g,' ').trim();
 const a=[...f.querySelectorAll('a')].find(n=>n.getBoundingClientRect().x<200 && n.getBoundingClientRect().y>5800);
 const all=n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),text:clean(n.innerText),html:n.outerHTML,r:{x:r.x,y:r.y,w:r.width,h:r.height},fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,pad:s.padding,display:s.display}};
 return a?[a,...a.querySelectorAll('*')].map(all):[];
 ''')
 print(json.dumps(result,indent=2))
finally:d.quit()
