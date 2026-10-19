import json
import sys
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


def make_driver(url, width=1440, height=961):
    options = Options()
    options.add_argument('--headless=new')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument(f'--window-size={width},{height}')
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=options)
    driver.get(url)
    driver.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
    return driver


def state(driver):
    return driver.execute_script(r'''
      const q=s=>document.querySelector(s);
      const vis=n=>{if(!n)return false;const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.display!=='none'};
      const info=n=>{if(!n)return null;const r=n.getBoundingClientRect(),s=getComputedStyle(n);return {tag:n.tagName,cls:String(n.className),aria:n.getAttribute('aria-label'),role:n.getAttribute('role'),text:(n.innerText||n.textContent||'').trim().replace(/\s+/g,' '),x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),bg:s.backgroundColor,color:s.color,border:s.border,transition:s.transition,animation:s.animation}};
      const v=q('video'), app=q('.app'), page=q('.page-content'), b=document.body, h=document.documentElement;
      const switches=[...document.querySelectorAll('[role=switch],mio-toggle-switch,.rail-control')].filter(vis);
      return {html:{cls:h.className,style:h.getAttribute('style')},body:{cls:b.className,style:b.getAttribute('style')},app:info(app),page:info(page),video:v?{paused:v.paused,currentTime:v.currentTime,style:v.getAttribute('style'),cls:v.className}:null,switches:switches.map(info),buttons:[...document.querySelectorAll('button')].filter(vis).map(info).slice(-5),styles:{bodyBg:getComputedStyle(b).backgroundColor,rootBg:app?getComputedStyle(app).backgroundColor:null,card:q('.material-card')?getComputedStyle(q('.material-card')).backgroundColor:null,heading:q('h1')?getComputedStyle(q('h1')).color:null,search:q('.search-fab,[aria-label="Search"]')?getComputedStyle(q('.search-fab,[aria-label="Search"]')).backgroundColor:null}};
    ''')


def click_label(driver, label):
    nodes = driver.find_elements('css selector', f'[aria-label="{label}"]')
    nodes = [node for node in nodes if node.is_displayed()]
    if not nodes:
        return False
    driver.execute_script('arguments[0].click()', nodes[0])
    time.sleep(.4)
    return True


def run(url):
    driver = make_driver(url)
    result = {'url': url, 'initial': state(driver)}
    try:
        visible_switches = [n.get_attribute('aria-label') for n in driver.find_elements('css selector', '[role=switch],mio-toggle-switch,.rail-control') if n.is_displayed()]
        animation = next((x for x in visible_switches if x and ('Pause animations' in x or 'Pause animation' in x or x.lower() == 'pause')), None)
        if animation:
            click_label(driver, animation)
            result['afterAnim'] = state(driver)
            visible_switches = [n.get_attribute('aria-label') for n in driver.find_elements('css selector', '[role=switch],mio-toggle-switch,.rail-control') if n.is_displayed()]
            animation_back = next((x for x in visible_switches if x and ('Play animations' in x or 'Pause animations' in x or x.lower() == 'play')), None)
            if animation_back:
                click_label(driver, animation_back)
                result['afterAnimBack'] = state(driver)
        visible_switches = [n.get_attribute('aria-label') for n in driver.find_elements('css selector', '[role=switch],mio-toggle-switch,.rail-control') if n.is_displayed()]
        theme = next((x for x in visible_switches if x and ('dark mode' in x.lower() or 'dark theme' in x.lower())), None)
        if theme:
            click_label(driver, theme)
            result['afterTheme'] = state(driver)
            visible_switches = [n.get_attribute('aria-label') for n in driver.find_elements('css selector', '[role=switch],mio-toggle-switch,.rail-control') if n.is_displayed()]
            theme_back = next((x for x in visible_switches if x and ('light mode' in x.lower() or 'light theme' in x.lower())), None)
            if theme_back:
                click_label(driver, theme_back)
                result['afterThemeBack'] = state(driver)
        try:
            result['logs'] = driver.get_log('browser')
        except Exception:
            pass
    finally:
        driver.quit()
    return result


if __name__ == '__main__':
    urls = sys.argv[1:] or ['https://m3.material.io/', 'http://127.0.0.1:4200/']
    for url in urls:
        print(json.dumps(run(url), ensure_ascii=False, indent=2))
