import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

options = Options()
options.add_argument('--headless=new')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--window-size=1440,961')
driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=options)
try:
    driver.get('https://m3.material.io/')
    driver.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready, new Promise(r=>setTimeout(r,2500))]).then(done)")
    data = driver.execute_script(r'''
      const compact = value => String(value || '').replace(/\s+/g, ' ').trim();
      const rect = node => { const r=node.getBoundingClientRect(); return Object.fromEntries(['x','y','width','height','top','right','bottom','left'].map(k=>[k,Math.round(r[k]*100)/100])); };
      const style = node => { const s=getComputedStyle(node); return {display:s.display,position:s.position,margin:s.margin,padding:s.padding,gap:s.gap,width:s.width,height:s.height,font:s.font,lineHeight:s.lineHeight,grid:s.gridTemplateColumns,overflow:s.overflow}; };
      const info = node => ({tag:node.tagName, id:node.id, cls:compact(node.className), text:compact(node.innerText).slice(0,240), rect:rect(node), style:style(node)});
      const all = [...document.querySelectorAll('*')];
      const findText = text => all.filter(n => compact(n.innerText).includes(text) && [...n.children].every(c => !compact(c.innerText).includes(text))).slice(0,8).map(info);
      const findClass = token => all.filter(n => typeof n.className==='string' && n.className.split(/\s+/).some(c=>c.includes(token))).slice(0,30).map(info);
      const headings = [...document.querySelectorAll('h1,h2,h3')].map(info);
      const links = [...document.querySelectorAll('a')].filter(a=>compact(a.innerText)).slice(0,100).map(info);
      return {
        viewport:{innerWidth,innerHeight,devicePixelRatio},
        page: info(document.querySelector('div.page-content.page-content-height')),
        scroll: (()=>{const n=document.querySelector('div.page-content.page-content-height');return n?{scrollHeight:n.scrollHeight,clientHeight:n.clientHeight}:null})(),
        headings,
        expressive:findText('Build more usable and engaging products with emotion-driven UX'),
        footer:findText('Material Design is an adaptable system of guidelines'),
        footerClasses:[...new Set(['footer','site-footer','page-footer','legal','social','libraries','google'].flatMap(findClass).flat().map(x=>x.cls))].slice(0,100),
        pageClasses:[...new Set(all.filter(n=>typeof n.className==='string' && /page|footer|content|section|card|rail|nav/i.test(n.className)).map(n=>n.className))].slice(0,200),
      };
    ''')
    print(json.dumps(data, indent=2))
finally:
    driver.quit()
