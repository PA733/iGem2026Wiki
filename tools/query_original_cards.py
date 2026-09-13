import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

o=Options(); o.add_argument('--headless=new'); o.add_argument('--no-sandbox'); o.add_argument('--disable-dev-shm-usage'); o.add_argument('--window-size=1440,961')
d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=o)
try:
 d.get('https://m3.material.io/')
 d.execute_async_script("const x=arguments[0];Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,2200))]).then(x)")
 result=d.execute_script(r'''
 const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
 const rr=n=>{const r=n.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)}};
 const st=n=>{const s=getComputedStyle(n);return {tag:n.tagName,cls:clean(n.className),font:s.font,fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,line:s.lineHeight,margin:s.margin,padding:s.padding,display:s.display,grid:s.gridTemplateColumns,align:s.alignItems,justify:s.justifyContent,color:s.color,bg:s.backgroundColor,r:rr(n)}};
 const texts=['What’s new at Google I/O 2026','Material Android is Compose-first','Google I/O 2026','Updated: Figma M3 Design Kit','New: Motion physics','Expanded: Shape library','Blog: Guide to our latest update','Google Design: Making Google Sans Flex','New: Toolbars','New: Split button','Updated: Progress indicators','New: Button groups','See all expressive components','Blog: Using motion physics','Watch: Build with M3 Expressive','Material Design blog','Google Design','Get started','Figma M3 Design Kit','Develop'];
 const nodes=[...document.querySelectorAll('*')].filter(n=>n.children.length===0&&texts.includes(clean(n.innerText))).map(n=>{let a=n.parentElement;return {node:st(n),parent:a?st(a):null,grand:a&&a.parentElement?st(a.parentElement):null}});
 const dates=[...document.querySelectorAll('*')].filter(n=>n.children.length===0&&clean(n.innerText)==='May 19, 2026').map(n=>st(n));
 return {nodes,dates};
 ''')
 print(json.dumps(result,indent=2))
finally:d.quit()
