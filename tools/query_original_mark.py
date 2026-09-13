import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

o = Options()
o.add_argument('--headless=new')
o.add_argument('--no-sandbox')
o.add_argument('--disable-dev-shm-usage')
o.add_argument('--window-size=1440,961')
d = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=o)
try:
    d.get('https://m3.material.io/')
    d.execute_async_script("const x=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,2200))]).then(x)")
    result = d.execute_script(r'''
      const clean=x=>String(x??'').replace(/\s+/g,' ').trim();
      const rr=n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}};
      const inf=n=>{const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),text:clean(n.innerText),r:rr(n),font:s.font,line:s.lineHeight,margin:s.margin,pad:s.padding,display:s.display,align:s.alignItems,gap:s.gap,color:s.color}};
      return [...document.querySelectorAll('*')].filter(n=>n.children.length===0&&['material_design','Social','GitHub','X','YouTube','Blog RSS','Android','Compose','Flutter','Web','Google Design','Archived versions','Material Design 1','Material Design 2'].includes(clean(n.innerText))).map(inf);
    ''')
    print(json.dumps(result, indent=2))
finally:
    d.quit()
