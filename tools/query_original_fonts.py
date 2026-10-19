import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
o=Options();o.add_argument('--headless=new');o.add_argument('--no-sandbox');o.add_argument('--disable-dev-shm-usage');o.add_argument('--window-size=1440,961')
d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'),options=o)
try:
 d.get('https://m3.material.io/'); d.execute_async_script("const x=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(x)")
 result=d.execute_script(r'''
 const wanted=['GitHub','X','YouTube','Blog RSS','Android','Compose','Flutter','Web','Privacy Policy','Terms of Service','Join research studies','Feedback'];
 const clean=x=>String(x??'').replace(/\s+/g,' ').trim();
 const out=[];for(const n of document.querySelectorAll('a')){if(wanted.includes(clean(n.innerText))){const s=getComputedStyle(n),r=n.getBoundingClientRect();out.push({text:clean(n.innerText),x:r.x,y:r.y,w:r.width,h:r.height,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing,padding:s.padding,margin:s.margin,display:s.display})}}return out;
 ''')
 print(json.dumps(result,indent=2))
finally:d.quit()
