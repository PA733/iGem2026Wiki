"""Real-browser route, reading and responsive checks for the LUT-CHINA Wiki."""
import argparse
import json
import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:4200')
    parser.add_argument('--layout-only', action='store_true', help='Skip prose completeness while reviewing layout')
    parser.add_argument('--output', type=Path, default=Path('/tmp/lut-wiki-checks'))
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    options = Options()
    for flag in ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,1100']:
        options.add_argument(flag)
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=options)
    wait = WebDriverWait(driver, 20)
    checks = []

    def check(name, value):
        checks.append({'check': name, 'passed': bool(value)})
        if not value:
            driver.save_screenshot(str(args.output / 'failure.png'))
            raise AssertionError(name)

    def open_page(path):
        driver.get(args.url.rstrip('/') + path)
        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, '#main_content')) == 1)
        driver.execute_async_script('document.fonts.ready.then(arguments[0])')
        time.sleep(.55)
        check(path + ' declares English', driver.execute_script('return document.documentElement.lang') == 'en')
        check(path + ' has English content and accessible labels', driver.execute_script(r'''
            const han = /[\u3400-\u9fff]/u;
            const labels = [...document.querySelectorAll('[aria-label], [title], [placeholder], [alt]')]
                .flatMap(el => ['aria-label', 'title', 'placeholder', 'alt'].map(attr => el.getAttribute(attr) || ''));
            return !han.test(document.body.innerText + labels.join(' '));
        '''))

    def capture(name):
        driver.save_screenshot(str(args.output / f'{name}.png'))

    def viewport(w, h):
        driver.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {'width': w, 'height': h, 'deviceScaleFactor': 1, 'mobile': False})

    try:
        viewport(1440, 1100)
        open_page('/')
        check('Home has LUT-CHINA heading', 'LUT-CHINA' in driver.find_element(By.TAG_NAME, 'h1').text.replace('\n',''))
        check('Exactly one main landmark', len(driver.find_elements(By.CSS_SELECTOR, 'main, [role=main]')) == 1)
        capture('home-desktop')
        driver.find_element(By.CSS_SELECTOR, '.hero .get-started').click()
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, '.category-main'))
        time.sleep(.55)
        check('Home CTA opens local Project', driver.current_url.endswith('/project'))
        check('Reference rail width 88', driver.execute_script('return document.querySelector(".nav-rail").getBoundingClientRect().width') == 88)
        check('Reference category hero 85vh', abs(driver.find_element(By.CSS_SELECTOR, '.category-hero').size['height'] - 935) < 2)
        capture('project-desktop')
        card = driver.find_element(By.CSS_SELECTOR, '.category-hero .category-card')
        target = card.get_attribute('href').split('#')[-1]
        card.click()
        time.sleep(1.1)
        check('Category anchor scrolls shared container', driver.execute_script('return document.querySelector(".page-content").scrollTop') > 400)
        check('Category anchor updates fragment', driver.current_url.endswith('#' + target))
        capture('project-section')
        gallery = driver.find_element(By.CSS_SELECTOR, '.category-gallery')
        check('Category media remains sticky', gallery.rect['height'] == 1100)
        driver.find_element(By.CSS_SELECTOR, '.category-section .category-link-card').click()
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, '.wiki-article'))
        time.sleep(.55)
        check('Article route and title', '/project/description' in driver.current_url and 'LUT-CHINA' in driver.title)
        capture('article-desktop')
        article_links = driver.find_elements(By.CSS_SELECTOR, '.wiki-toc a[href^="#"]')
        if not article_links:
            article_links = driver.find_elements(By.CSS_SELECTOR, 'a[href^="#"]')
            article_links = [a for a in article_links if a.get_attribute('href').split('#')[-1] != 'main_content' and a.is_displayed()]
        check('Article has real section anchors', len(article_links) > 1)
        anchor = article_links[-1]
        fragment = anchor.get_attribute('href').split('#')[-1]
        driver.execute_script('arguments[0].scrollIntoView({block:"center",behavior:"instant"})', anchor)
        wait.until(lambda d: d.execute_script('const r=arguments[0].getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight', anchor))
        anchor.click()
        time.sleep(1.1)
        check('Article anchor changes URL', driver.current_url.endswith('#' + fragment))
        check('Article anchor focuses section', driver.execute_script('return document.activeElement.id') in [fragment, 'section-' + fragment])
        capture('article-reading')
        driver.refresh()
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, '.wiki-article'))
        time.sleep(.8)
        check('Fragment works after reload', driver.execute_script('return document.querySelector(".page-content").scrollTop') > 500)
        driver.back()
        time.sleep(.6)
        check('Back returns previous article history', driver.find_elements(By.CSS_SELECTOR, '.wiki-article'))

        open_page('/project')
        driver.execute_script('const c=document.querySelector(".page-content"); const a=document.querySelector(".category-section-links a"); c.scrollTo({top:a.getBoundingClientRect().top+c.scrollTop-250,behavior:"instant"})')
        time.sleep(.25)
        previous_scroll = driver.execute_script('return document.querySelector(".page-content").scrollTop')
        driver.find_element(By.CSS_SELECTOR, '.category-section-links a').click()
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, '.wiki-article'))
        time.sleep(.4)
        driver.back()
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, '.category-main'))
        time.sleep(.65)
        check('Back restores manually scrolled category position', abs(driver.execute_script('return document.querySelector(".page-content").scrollTop') - previous_scroll) < 3)
        driver.execute_script('const c=document.querySelector(".page-content"); const s=document.querySelectorAll(".category-section")[1];c.scrollTo({top:s.getBoundingClientRect().top+c.scrollTop,behavior:"instant"})')
        time.sleep(.6)
        check('Sticky artwork changes with the reading section', driver.execute_script('return document.querySelectorAll(".category-gallery-panel")[1].classList.contains("active")'))

        routes = ['/project', '/wet-lab', '/dry-lab', '/human-practices', '/team', '/safety']
        article_routes = []
        for route in routes:
            open_page(route)
            check(route + ' category renders', bool(driver.find_elements(By.CSS_SELECTOR, '.category-main')))
            article_routes.extend(driver.execute_script('return [...document.querySelectorAll(".category-section-links a")].map(a=>new URL(a.href).pathname)'))
        article_routes = sorted(set(article_routes))
        check('All 17 article routes discoverable', len(article_routes) == 17)
        for route in article_routes:
            open_page(route)
            check(route + ' article renders', bool(driver.find_elements(By.CSS_SELECTOR, '.wiki-article')))
            if not args.layout_only:
                check(route + ' has substantive content', len(driver.find_element(By.CSS_SELECTOR, '.wiki-article').text) > 450)

        for width in [390, 768, 1100, 1440]:
            viewport(width, 844 if width == 390 else 1100)
            for route, label in [('/', 'home'), ('/project','category'), ('/project/design','article')]:
                open_page(route)
                check(f'{label} {width}px no horizontal overflow', driver.execute_script('return document.documentElement.scrollWidth <= innerWidth && document.querySelector(".page-content").scrollWidth <= document.querySelector(".page-content").clientWidth + 1'))
                capture(f'{label}-{width}')
                if label == 'category':
                    check(f'{width}px category cards match reference breakpoint', driver.execute_script('return getComputedStyle(document.querySelector(".category-mobile-toc")).display !== "none"') == (width <= 1294))

        viewport(1440, 1100)
        open_page('/project')
        driver.execute_script('localStorage.setItem("current_mode", "dark"); localStorage.setItem("current_animation", "pause")')
        driver.refresh()
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, '.app.dark.motion-paused'))
        time.sleep(.55)
        check('Theme and animation preferences survive reload', bool(driver.find_elements(By.CSS_SELECTOR, '.app.dark.motion-paused')))
        check('Paused category still visible', driver.execute_script('return getComputedStyle(document.querySelector(".category-main")).opacity') == '1')
        capture('project-dark-paused')
        driver.execute_script('localStorage.clear()')
        open_page('/unknown-page')
        check('Unknown routes have clear 404 state', 'Page not found' in driver.find_element(By.TAG_NAME,'h1').text)
        open_page('/project/no-such-article')
        check('Unknown nested article routes also show 404', 'Page not found' in driver.find_element(By.TAG_NAME,'h1').text)
        errors = [entry for entry in driver.get_log('browser') if entry['level'] == 'SEVERE' and 'favicon.ico' not in entry['message'] and 'net::ERR' not in entry['message'] and '404' not in entry['message']]
        check('No severe application console errors', not errors)
    finally:
        (args.output / 'results.json').write_text(json.dumps(checks, ensure_ascii=False, indent=2))
        driver.quit()
    print(json.dumps({'passed': len(checks), 'output': str(args.output)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
