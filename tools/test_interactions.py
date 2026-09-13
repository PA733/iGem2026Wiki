import json
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


def driver(width=1440, height=961):
    o = Options()
    o.add_argument('--headless=new')
    o.add_argument('--no-sandbox')
    o.add_argument('--disable-dev-shm-usage')
    o.add_argument('--window-size=%d,%d' % (width, height))
    o.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    return webdriver.Chrome(service=Service('/usr/bin/chromedriver', port=9515), options=o)


def wait(d):
    d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,500))]).then(done)")


def main():
    result = {}
    d = driver()
    try:
        d.get('http://127.0.0.1:4200/')
        wait(d)
        video = d.find_element(By.CSS_SELECTOR, 'video')
        result['initial'] = {
            'dark': 'dark' in d.find_element(By.CSS_SELECTOR, '.app').get_attribute('class'),
            'videoPaused': d.execute_script('return arguments[0].paused', video),
            'scrollHeight': d.execute_script('return document.querySelector(".page-content").scrollHeight'),
        }
        d.find_element(By.CSS_SELECTOR, '.search-fab').click()
        inp = d.find_element(By.CSS_SELECTOR, '.search-panel input')
        inp.send_keys('button')
        time.sleep(.2)
        result['searchOpen'] = {
            'dialog': d.find_element(By.CSS_SELECTOR, '.search-overlay').is_displayed(),
            'value': inp.get_attribute('value'),
            'message': d.find_element(By.CSS_SELECTOR, '.search-empty').text,
        }
        inp.send_keys(Keys.ESCAPE)
        time.sleep(.15)
        result['searchEscClosed'] = not d.find_elements(By.CSS_SELECTOR, '.search-overlay')

        control = d.find_element(By.CSS_SELECTOR, '.video-control')
        control.click(); time.sleep(.2)
        result['videoButtonPause'] = {
            'paused': d.execute_script('return arguments[0].paused', video),
            'aria': control.get_attribute('aria-label'),
        }
        control.click(); time.sleep(.3)
        result['videoButtonPlay'] = {
            'paused': d.execute_script('return arguments[0].paused', video),
            'aria': control.get_attribute('aria-label'),
        }

        rail_controls = d.find_elements(By.CSS_SELECTOR, '.rail-control')
        rail_controls[0].click(); time.sleep(.15)
        result['animationPause'] = {
            'appClass': d.find_element(By.CSS_SELECTOR, '.app').get_attribute('class'),
            'paused': d.execute_script('return arguments[0].paused', video),
            'aria': rail_controls[0].get_attribute('aria-label'),
        }
        rail_controls[0].click(); time.sleep(.2)
        result['animationPlay'] = {
            'paused': d.execute_script('return arguments[0].paused', video),
            'aria': rail_controls[0].get_attribute('aria-label'),
        }

        rail_controls[1].click(); time.sleep(.15)
        app = d.find_element(By.CSS_SELECTOR, '.app')
        time.sleep(.4)
        result['darkOn'] = {
            'class': app.get_attribute('class'),
            'root': d.execute_script('return getComputedStyle(arguments[0]).backgroundColor', app),
            'card': d.execute_script('return getComputedStyle(document.querySelector(".material-card")).backgroundColor'),
            'text': d.execute_script('return getComputedStyle(document.querySelector(".hero-title h1")).color'),
            'aria': rail_controls[1].get_attribute('aria-label'),
        }
        rail_controls[1].click(); time.sleep(.15)

        first = d.find_element(By.CSS_SELECTOR, '.material-card')
        d.execute_script('document.querySelector(".page-content").style.scrollBehavior="auto"; arguments[0].scrollIntoView({block:"center"})', first)
        from selenium.webdriver.common.action_chains import ActionChains
        ActionChains(d).move_to_element(first).perform()
        time.sleep(.5)
        result['cardHover'] = {
            'bg': d.execute_script('return getComputedStyle(arguments[0]).backgroundColor', first),
            'radius': d.execute_script('return getComputedStyle(arguments[0]).borderRadius', first),
            'hovered': bool(d.find_elements(By.CSS_SELECTOR, '.material-card:hover')),
        }
    finally:
        d.quit()

    d = driver(390, 844)
    try:
        d.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {'width': 390, 'height': 844, 'deviceScaleFactor': 1, 'mobile': False})
        d.get('http://127.0.0.1:4200/')
        wait(d)
        d.find_element(By.CSS_SELECTOR, '.mobile-bar button').click()
        drawer = d.find_element(By.CSS_SELECTOR, '.mobile-drawer')
        result['mobileDrawer'] = {
            'display': drawer.is_displayed(),
            'rect': d.execute_script('const r=arguments[0].getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}', drawer),
            'items': [x.text for x in d.find_elements(By.CSS_SELECTOR, '.drawer-item')],
        }
        # Click the visible portion of the scrim outside the drawer (the drawer
        # itself intentionally sits above the scrim in the stacking order).
        scrim = d.find_element(By.CSS_SELECTOR, '.drawer-scrim')
        d.execute_script('arguments[0].dispatchEvent(new MouseEvent("click", {bubbles:true, clientX:360, clientY:420}))', scrim)
        result['mobileDrawerClosed'] = not d.find_elements(By.CSS_SELECTOR, '.mobile-drawer')
        d.find_element(By.CSS_SELECTOR, '.mobile-bar button:last-child').click()
        time.sleep(.15)
        result['mobileSearch'] = bool(d.find_elements(By.CSS_SELECTOR, '.search-overlay'))
    finally:
        d.quit()
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
