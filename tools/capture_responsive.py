import argparse
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


def driver_for(width: int, height: int) -> webdriver.Chrome:
    options = Options()
    options.add_argument('--headless=new')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument(f'--window-size={width},{height}')
    return webdriver.Chrome(service=Service('/usr/bin/chromedriver'), options=options)


def capture(url: str, output: Path, widths: tuple[tuple[int, int], ...]) -> None:
    output.mkdir(parents=True, exist_ok=True)
    for width, height in widths:
        d = driver_for(width, height)
        try:
            d.get(url)
            d.execute_async_script("const done=arguments[0]; Promise.all([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]).then(done)")
            d.save_screenshot(str(output / f'{width}x{height}.png'))
        finally:
            d.quit()


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--url', required=True)
    p.add_argument('--output', type=Path, required=True)
    args = p.parse_args()
    capture(args.url, args.output, ((390, 844), (600, 900), (768, 900), (1024, 900), (1280, 900)))
