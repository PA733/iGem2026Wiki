"""Selenium regression for article transitions, scrolling and keyboard controls.

Run against npm start. Reference measurements: docs/motion-reference.md.
"""
import argparse
import json
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:4200')
    parser.add_argument('--output', type=Path, default=Path('/tmp/wiki-article-motion-tests'))
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    options = Options()
    for flag in ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,1100']:
        options.add_argument(flag)
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    d = webdriver.Chrome(service=Service('/usr/bin/chromedriver', port=0), options=options)
    wait = WebDriverWait(d, 15)
    checks = []

    def check(name, passed):
        checks.append({'check': name, 'passed': bool(passed)})
        if not passed:
            d.save_screenshot(str(args.output / 'failure.png'))
            raise AssertionError(name)

    def viewport(width):
        d.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {
            'width': width, 'height': 844 if width <= 960 else 1100, 'deviceScaleFactor': 1, 'mobile': False,
        })

    def open_article():
        d.get(args.url.rstrip('/') + '/project/description')
        wait.until(lambda b: b.find_elements(By.CSS_SELECTOR, '.wiki-article-tab'))
        d.execute_async_script('document.fonts.ready.then(arguments[0])')
        time.sleep(.5)

    def tab(index, delay=.8):
        d.execute_script('document.querySelectorAll(".wiki-article-tab")[arguments[0]].click()', index)
        time.sleep(delay)

    def scroll(top):
        d.execute_script('''const c=innerWidth<=960?document.scrollingElement:document.querySelector('.page-content');
            c.scrollTo({top:arguments[0],behavior:'instant'});''', top)
        time.sleep(.4)

    def position():
        return d.execute_script('return innerWidth<=960?scrollY:document.querySelector(".page-content").scrollTop')

    try:
        viewport(1440)
        open_article()
        trace = d.execute_async_script('''
            const done=arguments[0], start=performance.now(), frames=[];
            function sample() {
                const nav=document.querySelector('.wiki-article-tab-list'), r=nav.getBoundingClientRect();
                frames.push({t:performance.now()-start,path:location.pathname,scroll:document.querySelector('.page-content').scrollTop,
                    nav:{y:r.y,height:r.height,width:r.width},
                    animations:document.getAnimations().filter(a=>a.effect?.target?.matches('.wiki-article, .wiki-article-body'))
                        .map(a=>({target:a.effect.target.className,frames:a.effect.getKeyframes(),timing:a.effect.getTiming()}))});
                if(performance.now()-start<1500) requestAnimationFrame(sample); else done(frames);
            }
            requestAnimationFrame(sample); document.querySelectorAll('.wiki-article-tab')[1].click();
        ''')
        (args.output / 'tab-forward-frames.json').write_text(json.dumps(trace, indent=2))
        check('Click fades old content before changing the route', trace[0]['path'].endswith('/description'))
        check('Tab changes route after the outgoing transition', trace[-1]['path'].endswith('/design'))
        animations = [a for f in trace for a in f['animations']]
        check('Tab transition preserves the hero without replaying page entrance', all(a['target'] != 'wiki-article' for a in animations))
        check('Outgoing content moves left', any(a['frames'][-1].get('transform') == 'translateX(-10px)' for a in animations))
        check('Incoming content arrives from the right', any(a['frames'][0].get('transform') == 'translateX(10px)' for a in animations))
        check('Scrolling progresses through intermediate positions', any(20 < f['scroll'] < 500 for f in trace))
        check('New desktop tab lands at the end of the hero', abs(trace[-1]['scroll'] - 552) < 2)
        check('Sticky tabs settle at 1040px wide and 72px tall', abs(trace[-1]['nav']['width'] - 1040) < 1 and abs(trace[-1]['nav']['height'] - 72) < 1)
        d.save_screenshot(str(args.output / 'desktop-tabs-sticky.png'))

        scroll(1500)
        tab(0)
        check('Previously unread tab starts at the reading area', abs(position() - 552) < 2)
        tab(1)
        check('Returning to a tab restores its deeper reading position', abs(position() - 1500) < 2)
        d.back()
        time.sleep(.7)
        check('Browser Back restores the previous tab and scroll', d.current_url.endswith('/description') and abs(position() - 552) < 2)
        check('Browser Back retains compact sticky tabs after entrance', d.find_element(By.CSS_SELECTOR, '.wiki-article-tab-list').size['height'] == 72)

        # Keep native tab focus navigation separate from route activation.
        active = d.find_element(By.CSS_SELECTOR, '.wiki-article-tab.active')
        active.send_keys(Keys.ARROW_RIGHT)
        check('ArrowRight changes focus without changing the page', d.current_url.endswith('/description') and d.execute_script('return document.activeElement.textContent') == 'Design')
        d.switch_to.active_element.send_keys(Keys.ENTER)
        time.sleep(.8)
        check('Enter activates the focused tab', d.current_url.endswith('/design'))

        # Rapid requests and external navigation must invalidate delayed commits.
        d.execute_script('''document.querySelectorAll('.wiki-article-tab')[0].click();
            setTimeout(()=>document.querySelectorAll('.wiki-article-tab')[2].click(),30);''')
        time.sleep(.9)
        check('Rapid tab changes settle on the last requested article', d.current_url.endswith('/implementation'))
        d.execute_script('''document.querySelectorAll('.wiki-article-tab')[0].click();
            setTimeout(()=>document.querySelector('.wiki-article-eyebrow').click(),30);''')
        time.sleep(.7)
        check('Leaving the article cancels a pending tab change', d.current_url.endswith('/project') and bool(d.find_elements(By.CSS_SELECTOR, '.category-main')))

        open_article()
        tab(1, .15)
        d.execute_script('document.querySelectorAll(".wiki-article-toc a")[1].click()')
        time.sleep(.9)
        check('A section click interrupts the pending tab scroll', d.execute_script('return Math.abs(document.querySelectorAll("[data-wiki-section]")[1].getBoundingClientRect().top-136)<2'))

        for width in [390, 600, 768, 960, 961, 1100, 1294, 1440]:
            viewport(width)
            open_article()
            check(f'{width}px has no horizontal document overflow', d.execute_script('return document.documentElement.scrollWidth<=innerWidth'))
            scroll(1100)
            check(f'{width}px uses the expected scrolling element', d.execute_script('return scrollY>0 && document.querySelector(".page-content").scrollTop===0') == (width <= 960))
            check(f'{width}px tabs match reference sticky behavior', d.execute_script('return document.querySelector(".wiki-article-tab-list").getBoundingClientRect().top<=-1') if width <= 960 else abs(d.find_element(By.CSS_SELECTOR, '.wiki-article-tab-list').rect['height'] - 72) < 1)
            d.execute_script('document.querySelectorAll(".wiki-article-toc a")[1].click()')
            time.sleep(.9)
            heading = d.execute_script('return document.querySelectorAll("[data-wiki-section]")[1].getBoundingClientRect().top')
            check(f'{width}px section target clears the toolbar or sticky tabs', heading >= (72 if width > 960 else 64))
            if width <= 960:
                before = position()
                tab(1)
                check(f'{width}px new tab returns to page top', position() < 1)
                d.back()
                time.sleep(.7)
                check(f'{width}px Back restores document reading position', abs(position() - before) < 3)
                d.refresh()
                time.sleep(.8)
                check(f'{width}px fragment survives refresh', position() > 100)
                d.save_screenshot(str(args.output / f'mobile-fragment-{width}.png'))

        viewport(1100)
        open_article()
        scroll(2300)
        d.find_element(By.CSS_SELECTOR, '.wiki-back-to-top').click()
        time.sleep(.9)
        check('Returning to contents moves focus away from the hidden button', d.execute_script('return !!document.activeElement.closest(".wiki-article-toc")'))

        viewport(390)
        open_article()
        check('Overflowing tabs expose next-tab control', bool(d.find_elements(By.CSS_SELECTOR, '[aria-label="Go to next tab"]')))
        d.execute_script('arguments[0].click()', d.find_element(By.CSS_SELECTOR, '[aria-label="Go to next tab"]'))
        time.sleep(.7)
        check('Next-tab control selects the next article', d.current_url.endswith('/design'))
        check('Selected tab is revealed inside the horizontal viewport', d.execute_script('''const t=document.querySelector('.wiki-article-tab.active').getBoundingClientRect(),
            r=document.querySelector('.wiki-article-tabs').getBoundingClientRect();return t.left>=r.left-1&&t.right<=r.right+1;'''))

        viewport(1440)
        d.execute_cdp_cmd('Emulation.setEmulatedMedia', {'features': [{'name': 'prefers-reduced-motion', 'value': 'reduce'}]})
        open_article()
        tab(1, .15)
        check('Reduced motion changes tabs and scrolls without waiting', d.current_url.endswith('/design') and abs(position() - 552) < 2)
        check('Reduced motion does not create an article slide animation', d.execute_script('return !document.getAnimations().some(a=>a.effect?.target?.matches(".wiki-article-body"))'))
        errors = [entry for entry in d.get_log('browser') if entry['level'] == 'SEVERE' and 'favicon' not in entry['message'] and 'net::ERR' not in entry['message']]
        check('No severe application console errors', not errors)
    finally:
        (args.output / 'results.json').write_text(json.dumps(checks, indent=2))
        d.quit()
    print(json.dumps({'passed': len(checks), 'output': str(args.output)}))


if __name__ == '__main__':
    main()
