"""Check local UI behavior and optionally capture deterministic comparison artifacts.

Start the built site, then run:
    python3 tools/test_interactions.py --url http://127.0.0.1:4200 --output /tmp/wiki-ui
Only local pages are opened; outgoing resource links are inspected without visiting them.
"""

import argparse
import json
import time
from pathlib import Path
from urllib.parse import urlsplit

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait


SNAPSHOT_SELECTORS = (
    '.app', '.page-content', '.page-body', '.nav-rail', '.mobile-bar',
    '.home-main', '.hero', '.hero-title', '.hero-title h1', '.hero-media',
    '.content-section', '.material-card', '.next-card', '.site-footer',
    '.footer-content', '.footer-column', '.footer-legal', '.search-page-view',
    '.search-page-input-container', '.search-page-input', '.search-suggestions',
    '.search-suggestion-group', '.search-items', '.article-main', '.article-hero',
    '.article-hero-copy', '.article-hero h1', '.article-hero-media', '.article-tabs',
    '.article-content-shell', '.article-toc', '.article-carbon', '.article-block',
    '.article-text-column', '.article-block figure', '.article-up-next',
)


def create_driver(width, height):
    options = Options()
    for flag in ('--headless=new', '--no-sandbox', '--disable-dev-shm-usage',
                 f'--window-size={width},{height}'):
        options.add_argument(flag)
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    browser = webdriver.Chrome(service=Service('/usr/bin/chromedriver', port=0), options=options)
    browser.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {
        'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': False,
    })
    return browser


def until(browser, predicate, message):
    return WebDriverWait(browser, 8, poll_frequency=.05).until(predicate, message)


def element(browser, selector):
    return browser.find_element(By.CSS_SELECTOR, selector)


def visible(browser, selector):
    return any(item.is_displayed() for item in browser.find_elements(By.CSS_SELECTOR, selector))


def check(condition, message):
    if not condition:
        raise AssertionError(message)


def settle(browser):
    browser.execute_async_script('''
        const done = arguments[0];
        Promise.all([document.fonts.ready, ...Array.from(document.images).filter(image => {
          const rect = image.getBoundingClientRect();
          return image.loading !== 'lazy' || (rect.height && rect.top < innerHeight && rect.bottom > 0);
        }).map(image =>
          image.complete ? Promise.resolve() : new Promise(resolve => {
            setTimeout(resolve, 2000);
            image.addEventListener('load', resolve, {once: true});
            image.addEventListener('error', resolve, {once: true});
          }))]).then(() => setTimeout(done, 400));
    ''')


def visit(browser, base_url, path='/'):
    browser.get(base_url + path)
    until(browser, lambda b: visible(b, '.app'), f'App did not load at {path}')
    settle(browser)


def snapshot(browser, name, results, output):
    if output is None:
        return
    # Freeze a reproducible montage frame and remove caret/focus timing noise.
    browser.execute_script('''
        document.querySelectorAll('video').forEach(video => {
          video.pause();
          if (video.readyState >= 2) video.currentTime = Math.min(1, video.duration || 1);
        });
        document.activeElement?.blur();
        document.querySelector('.page-content').scrollTo({top: 0, behavior: 'instant'});
    ''')
    browser.execute_cdp_cmd('Input.dispatchMouseEvent', {'type': 'mouseMoved', 'x': 0, 'y': 0})
    settle(browser)
    results['snapshots'][name] = browser.execute_script('''
        const round = value => Math.round(value * 100) / 100;
        return Object.fromEntries(arguments[0].map(selector => [selector,
          Array.from(document.querySelectorAll(selector), node => {
            const r = node.getBoundingClientRect(), css = getComputedStyle(node);
            return {text: node.innerText?.trim().slice(0, 100),
              rect: [r.x, r.y, r.width, r.height].map(round),
              display: css.display, color: css.color, background: css.backgroundColor,
              font: css.fontFamily, fontSize: css.fontSize, lineHeight: css.lineHeight,
              borderRadius: css.borderRadius, padding: css.padding, gap: css.gap};
          })]));
    ''', SNAPSHOT_SELECTORS)
    browser.save_screenshot(str(output / f'{name}.png'))
    # Establish keyboard input modality before programmatic focus so that
    # :focus-visible rules are measured consistently for each exposed control.
    element(browser, 'body').send_keys(Keys.TAB)
    results['focus'][name] = browser.execute_script('''
        const selectors = ['.search-fab', '.nav-item', '.rail-control', '.mobile-bar button',
          '.mobile-brand', '.search-page-input', '.search-clear', '.search-items',
          '.material-card', '.article-tab', '.article-toc a', '.article-copy-link'];
        return Object.fromEntries(selectors.flatMap(selector => {
          const node = Array.from(document.querySelectorAll(selector)).find(item =>
            item.getClientRects().length && getComputedStyle(item).visibility !== 'hidden');
          if (!node) return [];
          node.focus({preventScroll: true});
          const css = getComputedStyle(node);
          return [[selector, {visible: node.matches(':focus-visible'), outline: css.outline,
            outlineOffset: css.outlineOffset, boxShadow: css.boxShadow}]];
        }));
    ''')
    browser.execute_script('document.activeElement?.blur()')


def check_home(browser):
    check(element(browser, '.hero-title h1').text == 'Material Design', 'Home title changed')
    cards = browser.find_elements(By.CSS_SELECTOR, '.material-card')
    check(len(cards) == 17, f'Expected 17 home material cards; found {len(cards)}')
    check(len(browser.find_elements(By.CSS_SELECTOR, '.next-card')) == 3, 'Missing next-step cards')
    for card in cards:
        check(bool(card.get_attribute('href')), f'Card has no destination: {card.text}')
        check(bool(card.get_attribute('aria-label')), 'Card is missing its accessible name')
    check(len(browser.find_elements(By.CSS_SELECTOR, '.site-footer .legal-links a')) == 4,
          'Footer legal links changed')
    check('Material Design 2' in element(browser, '.site-footer').get_attribute('textContent'),
          'Footer archive link missing')


def check_preferences(browser):
    video = element(browser, 'video')
    until(browser, lambda b: b.execute_script('return arguments[0].readyState >= 2', video),
          'Hero video failed to load')
    until(browser, lambda b: not b.execute_script('return arguments[0].paused', video),
          'Hero video did not autoplay')
    element(browser, '.video-control').click()
    until(browser, lambda b: b.execute_script('return arguments[0].paused', video),
          'Video pause control did not pause playback')
    check('Play' in element(browser, '.video-control').get_attribute('aria-label'),
          'Paused video must expose a play action')
    element(browser, '.video-control').click()
    until(browser, lambda b: not b.execute_script('return arguments[0].paused', video),
          'Video play control did not resume playback')
    element(browser, '.rail-control[aria-label="Pause animations"]').click()
    check(browser.execute_script('return localStorage.current_animation') == 'pause',
          'Animation preference was not persisted')
    check(browser.execute_script('return arguments[0].paused', video),
          'Pausing animations should pause the video')
    element(browser, '.rail-control[aria-label="Switch to dark mode"]').click()
    check(browser.execute_script('return localStorage.current_mode') == 'dark',
          'Theme preference was not persisted')
    browser.refresh()
    settle(browser)
    check('dark' in element(browser, '.app').get_attribute('class'), 'Dark theme lost on reload')
    check(element(browser, '.rail-control[aria-label="Play animations"]').get_attribute('aria-checked') == 'false',
          'Animation preference lost on reload')
    check(browser.execute_script('return document.querySelector("video").paused'),
          'Video resumed despite stored animation pause preference')
    element(browser, '.rail-control[aria-label="Switch to light mode"]').click()
    element(browser, '.rail-control[aria-label="Play animations"]').click()


def check_search(browser, results, output, prefix, trigger):
    element(browser, trigger).click()
    until(browser, lambda b: urlsplit(b.current_url).path == '/search.html',
          'Search action did not navigate to /search.html')
    until(browser, lambda b: b.execute_script('return document.activeElement.matches(".search-page-input")'),
          'Search field did not receive focus')
    check(visible(browser, '.search-history'), 'Empty search should show recent searches')
    field = element(browser, '.search-page-input')
    field.send_keys('but')
    until(browser, lambda b: element(b, '.search-page-autocorrect').get_attribute('placeholder') == 'buttons',
          'Partial query did not produce the buttons completion')
    field.send_keys(Keys.TAB)
    check(field.get_attribute('value') == 'buttons', 'Tab did not accept search completion')
    settle(browser)
    titles = browser.execute_script('return Array.from(document.querySelectorAll(".search-items"), item => item.innerText)')
    check(len(titles) >= 3 and any('Buttons' in title for title in titles),
          f'Expected button search results, got {titles}')
    check(browser.execute_script('return document.activeElement === arguments[0]', field),
          'Accepting completion should keep input focus')
    snapshot(browser, f'{prefix}-search', results, output)
    element(browser, '.search-clear').click()
    until(browser, lambda b: element(b, '.search-page-input').get_attribute('value') == '',
          'Clear action did not empty the search')
    check(not browser.find_elements(By.CSS_SELECTOR, '.search-items'), 'Clear left stale results')
    check(visible(browser, '.search-history'), 'Clear did not restore recent searches')
    field.send_keys('zzzz-no-matching-result')
    check(visible(browser, '.search-empty'), 'Unmatched query did not show an empty result state')
    home = '.mobile-brand' if prefix == 'mobile' else '.nav-item[aria-label="Home"]'
    element(browser, home).click()
    until(browser, lambda b: urlsplit(b.current_url).path == '/', 'Home did not reset the route')
    check(visible(browser, '.home-main'), 'Home content missing after leaving search')
    if prefix == 'mobile':
        element(browser, '.mobile-bar button').click()
    browser.back()
    until(browser, lambda b: visible(b, '.search-page-input'), 'History back did not restore search')
    if prefix == 'mobile':
        until(browser, lambda b: b.execute_script('return document.activeElement.matches(".mobile-bar button")'),
              'History navigation did not restore focus to the mobile menu trigger')
        check(not visible(browser, '.mobile-drawer'), 'History navigation left the mobile drawer open')
    check(element(browser, '.search-page-input').get_attribute('value') == '',
          'History navigation should reset the query')
    browser.forward()
    until(browser, lambda b: visible(b, '.home-main'), 'History forward did not restore home')


def check_desktop_menu(browser):
    element(browser, '.nav-item[aria-label="Foundations"]').click()
    until(browser, lambda b: visible(b, '.desktop-topic-drawer-open'), 'Desktop topic drawer did not open')
    # Let the entrance animation finish before clicking the drawer.
    time.sleep(.4)
    devices = element(browser, '.desktop-topic-toggle[aria-label="Devices"]')
    devices.click()
    until(browser, lambda b: visible(b, '.desktop-topic-toggle[aria-label="XR"]'), 'Devices children missing')
    time.sleep(.3)
    element(browser, '.desktop-topic-toggle[aria-label="XR"]').click()
    until(browser, lambda b: visible(b, '.desktop-topic-item[href$="/xr/design"]'), 'Nested XR Design link missing')
    check(devices.get_attribute('aria-expanded') == 'true', 'Parent menu lost its expanded state')
    # Real pointer movement exercises the outside-dismiss listener.
    ActionChains(browser).move_to_element(element(browser, '.hero-title h1')).click().perform()
    until(browser, lambda b: not visible(b, '.desktop-topic-drawer-open'), 'Outside click did not close drawer')


def check_mobile_menu(browser):
    element(browser, '.mobile-bar button').click()
    until(browser, lambda b: visible(b, '.mobile-drawer'), 'Mobile drawer did not open')
    element(browser, '.drawer-item[aria-label="Foundations"]').click()
    check(visible(browser, '.drawer-back'), 'Mobile submenu back action missing')
    element(browser, '.drawer-item[aria-label="Devices"]').click()
    until(browser, lambda b: visible(b, '.drawer-item[aria-label="XR"]'), 'Mobile Devices children missing')
    element(browser, '.drawer-item[aria-label="XR"]').click()
    until(browser, lambda b: visible(b, '.drawer-item[href$="/xr/design"]'), 'Mobile nested XR Design link missing')
    element(browser, '.drawer-back').click()
    check(visible(browser, '.drawer-item[aria-label="Home"]'), 'Mobile back did not restore main menu')
    browser.execute_cdp_cmd('Input.dispatchMouseEvent', {'type': 'mousePressed', 'x': 360, 'y': 420,
                                                       'button': 'left', 'clickCount': 1})
    browser.execute_cdp_cmd('Input.dispatchMouseEvent', {'type': 'mouseReleased', 'x': 360, 'y': 420,
                                                       'button': 'left', 'clickCount': 1})
    until(browser, lambda b: not visible(b, '.mobile-drawer'), 'Mobile scrim did not close drawer')
    element(browser, '.mobile-bar button').click()
    element(browser, '.drawer-item[aria-label="Home"]').click()
    until(browser, lambda b: b.execute_script('return document.activeElement.matches(".mobile-bar button")'),
          'Mobile Home action did not restore focus to the menu trigger')
    check(not visible(browser, '.mobile-drawer'), 'Mobile Home action left the drawer open')
    element(browser, '.mobile-bar button').click()
    element(browser, '.drawer-search-through').click()
    until(browser, lambda b: visible(b, '.search-page-input'), 'Drawer search did not open search')
    check(not visible(browser, '.mobile-drawer'), 'Drawer remained open after search navigation')
    element(browser, '.mobile-brand').click()


def check_articles(browser, base_url, results, output, prefix):
    visit(browser, base_url, '/foundations/overview/principles/')
    check(element(browser, '.article-tab[aria-label="Principles"]').get_attribute('aria-selected') == 'true',
          'Principles deep link did not select the principles tab')
    check(len(browser.find_elements(By.CSS_SELECTOR, '.article-block')) >= 4, 'Principles article content missing')
    snapshot(browser, f'{prefix}-principles', results, output)
    target = browser.find_elements(By.CSS_SELECTOR, '.article-toc a')[-1]
    target_id = target.get_attribute('href').split('#')[-1]
    target.click()
    until(browser, lambda b: b.execute_script('''
        const page = document.querySelector('.page-content');
        return page.scrollTop > 0 && Math.abs(document.getElementById(arguments[0]).getBoundingClientRect().top
          - page.getBoundingClientRect().top) < 5;
    ''', target_id), 'TOC did not scroll the reading container to its section')
    if prefix == 'desktop':
        # A deterministic clipboard substitute verifies the exact requested URL.
        browser.execute_script('''Object.defineProperty(navigator, 'clipboard', {configurable: true,
          value: {writeText: text => {window.__copiedUrl = text; return Promise.resolve();}}});''')
        copy = element(browser, f'#{target_id} .article-copy-link')
        ActionChains(browser).move_to_element(copy).click().perform()
        check(browser.execute_script('return window.__copiedUrl') == browser.current_url.split('#')[0] + '#' + target_id,
              'Copy section link used an incorrect URL')
        check('Link copied' in copy.get_attribute('textContent'), 'Copy confirmation missing')
    browser.execute_script('document.querySelector(".page-content").scrollTo({top: 0, behavior: "instant"})')
    element(browser, '.article-tab[aria-label="Assistive technology"]').click()
    until(browser, lambda b: urlsplit(b.current_url).path.rstrip('/').endswith('/assistive-technology'),
          'Article tab did not update the route')
    check(element(browser, '.article-tab[aria-label="Assistive technology"]').get_attribute('aria-selected') == 'true',
          'Assistive technology tab selection missing')
    check('Assistive technology' in element(browser, '.article-carbon').text, 'Assistive technology content missing')
    snapshot(browser, f'{prefix}-assistive', results, output)
    browser.back()
    until(browser, lambda b: element(b, '.article-tab[aria-label="Principles"]').get_attribute('aria-selected') == 'true',
          'History back did not restore principles article')
    visit(browser, base_url, '/foundations/overview/assistive-technology/')
    check(element(browser, '.article-tab[aria-label="Assistive technology"]').get_attribute('aria-selected') == 'true',
          'Assistive technology deep link failed')
    visit(browser, base_url, '/foundations/overview/')
    check(visible(browser, '.article-main'), 'Overview alias did not render the article reader')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='http://127.0.0.1:4200', help='Local built-site URL')
    parser.add_argument('--output', type=Path, help='Directory for PNG screenshots and results.json')
    args = parser.parse_args()
    if args.output:
        args.output.mkdir(parents=True, exist_ok=True)
    results = {'checks': [], 'snapshots': {}, 'focus': {}}
    for prefix, width, height in (('desktop', 1440, 1100), ('mobile', 390, 844)):
        browser = create_driver(width, height)
        try:
            visit(browser, args.url.rstrip('/'))
            check_home(browser)
            results['checks'].append(f'{prefix}: home cards and footer')
            if prefix == 'desktop':
                check_preferences(browser)
                results['checks'].append('desktop: video controls and preference persistence')
            snapshot(browser, f'{prefix}-home', results, args.output)
            if prefix == 'desktop':
                check_desktop_menu(browser)
            else:
                check_mobile_menu(browser)
            results['checks'].append(f'{prefix}: nested navigation and dismissal')
            check_search(browser, results, args.output, prefix,
                         '.search-fab' if prefix == 'desktop' else '.mobile-bar a[aria-label="search"]')
            results['checks'].append(f'{prefix}: search completion, results, clear and history')
            check_articles(browser, args.url.rstrip('/'), results, args.output, prefix)
            results['checks'].append(f'{prefix}: article tabs, deep links and TOC')
            errors = [entry['message'] for entry in browser.get_log('browser')
                      if entry['level'] == 'SEVERE' and entry['source'] == 'javascript']
            check(not errors, f'{prefix} browser JavaScript errors: {errors}')
        except Exception:
            if args.output:
                browser.save_screenshot(str(args.output / f'{prefix}-failure.png'))
            raise
        finally:
            browser.quit()
    if args.output:
        (args.output / 'results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'passed': len(results['checks']), 'checks': results['checks'],
                      'output': str(args.output) if args.output else None}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
