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
    d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,2200))]).then(done)")
    result = d.execute_script(r'''
      const clean = v => String(v ?? '').replace(/\s+/g,' ').trim();
      const rr = n => { const r=n.getBoundingClientRect(); return Object.fromEntries(['x','y','width','height','top','right','bottom','left'].map(k=>[k,Math.round(r[k]*100)/100])); };
      const cs = n => { const s=getComputedStyle(n); return {display:s.display,position:s.position,width:s.width,height:s.height,margin:s.margin,padding:s.padding,gap:s.gap,grid:s.gridTemplateColumns,align:s.alignItems,justify:s.justifyContent,font:s.font,lineHeight:s.lineHeight,color:s.color,background:s.backgroundColor,borderRadius:s.borderRadius}; };
      const inf = n => ({tag:n.tagName,cls:clean(n.className),id:n.id,text:clean(n.innerText).slice(0,300),rect:rr(n),style:cs(n)});
      const chain = n => { const a=[]; while(n && a.length<8){a.push(inf(n)); n=n.parentElement;} return a; };
      const textNode = (needle) => [...document.querySelectorAll('*')].filter(n=>clean(n.innerText).includes(needle) && [...n.children].every(c=>!clean(c.innerText).includes(needle))).slice(0,10);
      const h2s=[...document.querySelectorAll('h2')].map(n=>({node:inf(n),chain:chain(n.parentElement).slice(0,4)}));
      const ps=[...document.querySelectorAll('p')].filter(n=>clean(n.innerText)).map(n=>inf(n));
      const links=[...document.querySelectorAll('a')].filter(n=>clean(n.innerText) && n.getBoundingClientRect().width>100).map(n=>inf(n));
      const classes=[...document.querySelectorAll('*')].filter(n=>typeof n.className==='string' && /footer|content-container|is-card-row|block|legal|social-links/.test(n.className)).map(inf);
      const footerText=textNode('Material Design is an adaptable system')[0];
      const expressiveText=textNode('Build more usable and engaging products')[0];
      return {scroll:(()=>{const n=document.querySelector('.page-content.page-content-height');return {height:n.scrollHeight,client:n.clientHeight}})(),h2s,expressive:expressiveText?chain(expressiveText):[],footer:footerText?chain(footerText):[],paragraphs:ps,largeLinks:links,classes};
    ''')
    print(json.dumps(result, indent=2))
finally:
    d.quit()
