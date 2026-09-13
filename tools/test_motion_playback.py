"""Exercise media playback commands without disabling navigation motion.

Run against an already started app: python3 tools/test_motion_playback.py
"""

import argparse
import json
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait


STATE = """
const animations = selector => [...document.querySelectorAll(selector)]
  .flatMap(el => el.getAnimations().map(a => ({
    name: a.animationName, time: a.currentTime, state: a.playState
  })));
const track = document.querySelector('.rail-control-track');
const sceneButton = document.querySelector('.video-control');
const home = document.querySelector('.home-main');
return {
  preference: localStorage.getItem('current_animation'),
  sceneButtonDisabled: sceneButton?.disabled,
  trackTransition: track && getComputedStyle(track).transition,
  homeOpacity: home && getComputedStyle(home).opacity,
  scene: animations('.dressing-illustration [class]'),
  diagrams: animations('.category-diagram [class]'),
  home: animations('.home-main'),
  scroll: { document: scrollY, page: document.querySelector('.page-content').scrollTop }
};
"""


def run(base_url, output):
    options = Options()
    for argument in ('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,1100'):
        options.add_argument(argument)
    driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver', port=0), options=options)
    results = {}
    output.mkdir(parents=True, exist_ok=True)

    def record(name):
        results[name] = driver.execute_script(STATE)
        return results[name]

    def global_toggle():
        driver.find_element(By.CSS_SELECTOR, '.rail-controls button').click()
        settle_frame()

    def local_toggle():
        driver.find_element(By.CSS_SELECTOR, '.video-control').click()
        settle_frame()

    def settle_frame():
        driver.execute_async_script('const done = arguments[0]; requestAnimationFrame(() => requestAnimationFrame(done));')

    def all_in_state(animations, expected):
        assert animations and all(animation['state'] == expected for animation in animations)

    try:
        driver.get(base_url + '/')
        WebDriverWait(driver, 15).until(lambda d: d.find_elements(By.CSS_SELECTOR, '.rail-control-track'))
        driver.execute_script('localStorage.removeItem("current_animation")')
        driver.refresh()
        time.sleep(.6)
        all_in_state(record('initial')['scene'], 'running')

        global_toggle()
        time.sleep(.35)
        paused = record('global_pause')
        all_in_state(paused['scene'], 'paused')
        assert not paused['sceneButtonDisabled']
        assert paused['trackTransition'] == 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)'
        time.sleep(.2)
        assert paused['scene'] == record('still_paused')['scene'], 'Paused artwork advanced'

        local_toggle()
        time.sleep(.1)
        resumed = record('local_resume')
        assert resumed['preference'] == 'pause', 'Local control changed the site preference'
        all_in_state(resumed['scene'], 'running')

        global_toggle()
        local_toggle()
        all_in_state(record('local_pause')['scene'], 'paused')
        global_toggle()
        global_toggle()
        resumed = record('global_resume')
        all_in_state(resumed['scene'], 'running')
        assert resumed['homeOpacity'] == '1', 'Resume hid the page'
        assert not resumed['home'], 'Resume restarted the page entrance animation'

        global_toggle()
        driver.refresh()
        time.sleep(.6)
        restored = record('pause_reload')
        assert restored['preference'] == 'pause'
        all_in_state(restored['scene'], 'paused')

        driver.find_element(By.CSS_SELECTOR, 'a.get-started').click()
        time.sleep(.6)
        all_in_state(record('category_paused')['diagrams'], 'paused')
        global_toggle()
        time.sleep(.1)
        all_in_state(record('category_resumed')['diagrams'], 'running')
        global_toggle()
        time.sleep(.35)
        driver.find_element(By.CSS_SELECTOR, '.category-hero-toc .category-card:nth-child(2)').click()
        time.sleep(.04)
        start = record('category_scroll_start')['scroll']['page']
        time.sleep(.8)
        end = record('category_scroll_end')['scroll']['page']
        assert 0 < start < end, 'The media preference disabled smooth TOC scrolling'

        driver.set_window_size(390, 844)
        driver.get(base_url + '/project')
        time.sleep(.6)
        target_link = driver.find_elements(By.CSS_SELECTOR, '.category-mobile-toc .category-card')[1]
        target = target_link.get_attribute('href').split('#')[-1]
        target_link.click()
        time.sleep(.8)
        top = driver.execute_script('return document.getElementById(arguments[0]).getBoundingClientRect().top', target)
        results['mobile_toc_top'] = top
        assert 70 <= top <= 90, 'Mobile TOC target is obscured by the toolbar'
        assert record('mobile_scroll')['scroll']['document'] > 0

        driver.execute_cdp_cmd('Emulation.setEmulatedMedia', {
            'features': [{'name': 'prefers-reduced-motion', 'value': 'reduce'}],
        })
        driver.get(base_url + '/')
        time.sleep(.6)
        assert not record('reduced_motion')['scene'], 'Reduced motion left the scene running'
    except Exception:
        driver.save_screenshot(str(output / 'failure.png'))
        raise
    finally:
        (output / 'results.json').write_text(json.dumps(results, indent=2))
        driver.quit()
    print(f'Playback checks passed; measurements: {output / "results.json"}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='http://127.0.0.1:4200')
    parser.add_argument('--output', type=Path, default=Path('/tmp/wiki-motion-playback-regression'))
    args = parser.parse_args()
    run(args.url.rstrip('/'), args.output)
