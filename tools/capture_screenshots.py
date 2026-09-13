import argparse
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


SCROLL_POSITIONS = (0, 850, 1750, 2700, 3700, 4500, 5100)


def create_driver(width: int, height: int) -> webdriver.Chrome:
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument(f"--window-size={width},{height}")
    return webdriver.Chrome(
        service=Service("/usr/bin/chromedriver"),
        options=options,
    )


def wait_for_page(driver: webdriver.Chrome) -> None:
    driver.execute_async_script(
        """
        const done = arguments[arguments.length - 1];
        Promise.all([
          document.fonts.ready,
          ...Array.from(document.images).map((image) =>
            image.complete ? Promise.resolve() : new Promise((resolve) => {
              image.addEventListener('load', resolve, {once: true});
              image.addEventListener('error', resolve, {once: true});
            })
          )
        ]).then(done);
        """
    )
    time.sleep(1.5)


def capture(url: str, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    driver = create_driver(1440, 1100)
    try:
        driver.get(url)
        wait_for_page(driver)
        driver.save_screenshot(str(output_dir / "material-full.png"))

        driver.set_window_size(1440, 961)
        time.sleep(0.5)
        container = driver.find_element("css selector", "div.page-content.page-content-height")
        for position in SCROLL_POSITIONS:
            driver.execute_script("arguments[0].scrollTop = arguments[1]", container, position)
            time.sleep(0.7)
            driver.save_screenshot(str(output_dir / f"material-{position}.png"))
    finally:
        driver.quit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Capture the Material homepage at comparison positions.")
    parser.add_argument("--url", default="http://127.0.0.1:4200/")
    parser.add_argument("--output", type=Path, default=Path("artifacts/selenium"))
    args = parser.parse_args()
    capture(args.url, args.output)
