"""Check LUT-CHINA search behavior against a running local site.

Usage: python3 tools/test_wiki_search.py --url http://127.0.0.1:4200 --output /tmp/lut-wiki-search
Uses an ephemeral ChromeDriver port so screenshot checks can run concurrently.
"""

import argparse
import json
from pathlib import Path
from urllib.parse import quote, parse_qs, urlsplit

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait


def run_checks(base, output):
    options = Options()
    for flag in ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,1100']:
        options.add_argument(flag)
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    driver = webdriver.Chrome(service=Service('/usr/bin/chromedriver', port=0), options=options)
    wait = WebDriverWait(driver, 20)
    results = []
    report = {'status': 'running', 'checks': results}
    if output:
        output.mkdir(parents=True, exist_ok=True)

    def check(value, description):
        assert value, description
        results.append(description)

    def input_el():
        return driver.find_element(By.CSS_SELECTOR, '.wiki-search .search-page-input')

    def loaded():
        wait.until(lambda d: any(item.is_displayed() for item in d.find_elements(By.CSS_SELECTOR, '.wiki-search .search-page-input')))

    def search(query):
        field = input_el()
        field.send_keys(Keys.CONTROL, 'a')
        field.send_keys(query)
        wait.until(lambda d: parse_qs(urlsplit(d.current_url).query).get('q') == [query])

    def resize(width):
        driver.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {
            'width': width, 'height': 1100 if width > 900 else 844,
            'deviceScaleFactor': 1, 'mobile': width < 600,
        })

    def capture(name):
        if not output:
            return
        driver.execute_async_script('''
            const done = arguments[0];
            document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(done)));
        ''')
        driver.save_screenshot(str(output / name))

    try:
        resize(1440)
        driver.get(base + '/search.html?q=' + quote('Lobetyolin'))
        loaded()
        check(input_el().get_attribute('value') == 'Lobetyolin', 'Direct URL restores English query')
        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, '.wiki-search .search-items')) > 0)
        check(len(driver.find_elements(By.CSS_SELECTOR, '.wiki-search .search-items')) > 0, 'English full-text query returns links')
        capture('search-desktop.png')
        input_el().click()
        input_el().send_keys(Keys.TAB)
        check(driver.execute_script('return document.activeElement.classList.contains("search-clear")'), 'Tab advances naturally to clear button')
        input_el().click()
        input_el().send_keys(Keys.ARROW_DOWN)
        check(driver.execute_script('return document.activeElement.classList.contains("search-items")'), 'ArrowDown focuses first result')
        driver.switch_to.active_element.send_keys(Keys.ARROW_UP)
        check(driver.execute_script('return document.activeElement.classList.contains("search-page-input")'), 'ArrowUp returns to search input')
        first_href = driver.find_element(By.CSS_SELECTOR, '.wiki-search .search-items').get_attribute('href')
        input_el().send_keys(Keys.ENTER)
        wait.until(lambda d: urlsplit(d.current_url).path == urlsplit(first_href).path)
        check(urlsplit(driver.current_url).path == urlsplit(first_href).path, 'Enter opens the first result')
        wait.until(lambda d: any(item.is_displayed() for item in d.find_elements(By.CSS_SELECTOR, 'h1')))
        check(True, 'Search result navigation renders a page heading')
        driver.back()
        loaded()
        check(input_el().get_attribute('value') == 'Lobetyolin', 'Back navigation restores the search query')
        search('hUmAn pRaCtIcEs')
        check(len(driver.find_elements(By.CSS_SELECTOR, '.wiki-search .search-items')) > 0, 'English matching ignores letter case')
        driver.refresh()
        loaded()
        check(input_el().get_attribute('value') == 'hUmAn pRaCtIcEs', 'Refresh preserves a typed query')
        search('Dressing')
        check(len(driver.find_elements(By.CSS_SELECTOR, '.wiki-search .search-items')) > 0, 'Suggested dressing query returns results')
        for query, field in [
            ('cellulose nanocrystals', 'paragraph'),
            ('partial pore blockage', 'bullet'),
            ('1500–2200', 'table cell'),
            ('established standards for use', 'note'),
        ]:
            search(query)
            matching_results = [item for item in driver.find_elements(By.CSS_SELECTOR, '.wiki-search .search-items')
                                if urlsplit(item.get_attribute('href')).path == '/project/design']
            check(bool(matching_results), f'Real document {field} content is searchable')
            check(query.lower() in matching_results[0].find_element(By.CSS_SELECTOR, '.search-item-snippet').text.lower(),
                  f'{field.capitalize()} match appears in the result excerpt')
        search('no-such-wiki-page-xyz123')
        check('No matching pages' in driver.find_element(By.CSS_SELECTOR, '.wiki-search .search-empty').text, 'No-results state is explicit')
        capture('search-no-results.png')
        driver.find_element(By.CSS_SELECTOR, '.search-clear').click()
        check('q' not in parse_qs(urlsplit(driver.current_url).query), 'Clearing query updates URL')
        check(len(driver.find_elements(By.CSS_SELECTOR, '.search-query-chips button')) == 3, 'Empty state offers three useful suggested queries')
        capture('search-empty.png')
        driver.find_element(By.CSS_SELECTOR, '.search-query-chips button').click()
        check(input_el().get_attribute('value') == 'Lobetyolin', 'Suggested query chip performs search')
        for width in [1440, 768, 390]:
            resize(width)
            check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth && document.querySelector(".wiki-search").scrollWidth <= document.querySelector(".wiki-search").clientWidth'), f'No horizontal overflow at {width}px')
        capture('search-mobile.png')
        resize(1440)
        for alias in ['/search', '/search/index.html']:
            driver.get(base + alias + '?q=' + quote('Lobetyolin'))
            loaded()
            check(input_el().get_attribute('value') == 'Lobetyolin', f'{alias} restores a direct query')
            search('Dressing')
            driver.refresh()
            loaded()
            check(input_el().get_attribute('value') == 'Dressing', f'{alias} preserves a typed query after refresh')
        errors = [entry for entry in driver.get_log('browser') if entry['level'] == 'SEVERE' and 'favicon' not in entry['message']]
        report['browser_errors'] = errors
        check(not errors, 'No severe browser errors')
        report['status'] = 'passed'
    except Exception as error:
        report['status'] = 'failed'
        report['error'] = str(error)
        report['url'] = driver.current_url
        report['browser_errors'] = driver.get_log('browser')
        capture('search-failure.png')
        raise
    finally:
        if output:
            (output / 'results.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
        print(json.dumps(report, ensure_ascii=False, indent=2))
        driver.quit()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='http://127.0.0.1:4200')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    run_checks(args.url.rstrip('/'), args.output)
