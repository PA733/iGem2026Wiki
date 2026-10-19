import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

o=Options(); o.add_argument('--headless=new'); o.add_argument('--no-sandbox'); o.add_argument('--disable-dev-shm-usage'); o.add_argument('--window-size=1440,961')
d=webdriver.Chrome(service=Service('/usr/bin/chromedriver'),options=o)
try:
 d.get('https://m3.material.io/')
 d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,2300))]).then(done)")
 result = d.execute_script(r'''
 const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
 const rect=n=>{const r=n.getBoundingClientRect();return Object.fromEntries(['x','y','width','height','top','right','bottom','left'].map(k=>[k,Math.round(r[k]*100)/100]))};
 const st=n=>{const s=getComputedStyle(n);return {display:s.display,position:s.position,width:s.width,height:s.height,margin:s.margin,padding:s.padding,gap:s.gap,grid:s.gridTemplateColumns,align:s.alignItems,justify:s.justifyContent,bg:s.backgroundColor,color:s.color,font:s.font,line:s.lineHeight,border:s.borderRadius}};
 const inf=n=>({tag:n.tagName,cls:clean(n.className),id:n.id,text:clean(n.innerText).slice(0,150),rect:rect(n),style:st(n)});
 const chain=n=>{let a=[];while(n&&a.length<12){a.push(inf(n));n=n.parentElement}return a};
 const legal=[...document.querySelectorAll('section')].find(n=>clean(n.innerText).includes('Privacy Policy'));
 const phrase=[...document.querySelectorAll('p')].find(n=>clean(n.innerText).startsWith('Material Design is an adaptable'));
 const google=[...document.querySelectorAll('*')].find(n=>n.children.length===0&&clean(n.innerText)==='Google');
 const waves=[...document.querySelectorAll('*')].filter(n=>{const s=getComputedStyle(n);return s.backgroundImage.includes('svg')||s.clipPath!=='none'}).slice(-30).map(inf);
 return {legal:legal?chain(legal):[],phrase:phrase?chain(phrase):[],google:google?chain(google):[],waves,footers:[...document.querySelectorAll('footer')].map(inf)};
 ''')
 print(json.dumps(result, indent=2))
finally:d.quit()
