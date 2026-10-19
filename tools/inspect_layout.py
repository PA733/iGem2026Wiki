import argparse
import json

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


SELECTORS = (
    ".page-content",
    ".hero",
    ".hero-copy",
    ".hero-media",
    ".home-content",
    ".expressive-intro h2",
    ".section-intro",
    ".expressive-intro .material-card",
    ".site-footer",
    ".wave",
    ".footer-content",
    ".footer-about",
    ".footer-about p",
    ".footer-column",
    ".footer-more",
    ".footer-legal",
    ".footer-mark",
    ".footer-column h3",
    ".footer-column > a",
    ".footer-legal > a",
)


def inspect(url: str, width: int, height: int, intro_width: int | None) -> dict:
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(f"--window-size={width},{height}")
    driver = webdriver.Chrome(service=Service("/usr/bin/chromedriver"), options=options)
    try:
        driver.get(url)
        driver.execute_async_script(
            "const done = arguments[0]; document.fonts.ready.then(() => requestAnimationFrame(done));"
        )
        if intro_width:
            driver.execute_script(
                "document.querySelector('.section-intro').style.maxWidth = arguments[0] + 'px'",
                intro_width,
            )
        return driver.execute_script(
            """
            const selectors = arguments[0];
            const roundedRect = (rect) => Object.fromEntries(
              ['x', 'y', 'width', 'height', 'top', 'right', 'bottom', 'left']
                .map((key) => [key, Math.round(rect[key] * 100) / 100])
            );
            const metrics = {};
            for (const selector of selectors) {
              const nodes = Array.from(document.querySelectorAll(selector));
              metrics[selector] = nodes.map((node) => {
                const style = getComputedStyle(node);
                return {
                  rect: roundedRect(node.getBoundingClientRect()),
                  display: style.display,
                  margin: style.margin,
                  padding: style.padding,
                  gap: style.gap,
                  gridTemplateColumns: style.gridTemplateColumns,
                  font: style.font,
                };
              });
            }

            const intro = document.querySelector('.section-intro');
            const characters = [];
            const walker = document.createTreeWalker(intro, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
              const node = walker.currentNode;
              for (let index = 0; index < node.length; index += 1) {
                const range = document.createRange();
                range.setStart(node, index);
                range.setEnd(node, index + 1);
                const rect = range.getBoundingClientRect();
                if (rect.width || rect.height) characters.push({text: node.data[index], top: rect.top});
              }
            }
            const lines = [];
            for (const character of characters) {
              const top = Math.round(character.top);
              let line = lines.find((entry) => Math.abs(entry.top - top) <= 1);
              if (!line) {
                line = {top, text: ''};
                lines.push(line);
              }
              line.text += character.text;
            }
            metrics.introLines = lines.map((line) => ({
              top: line.top,
              text: line.text.replace(/\\s+/g, ' ').trim(),
            }));
            metrics.scroll = {
              clientHeight: document.querySelector('.page-content').clientHeight,
              scrollHeight: document.querySelector('.page-content').scrollHeight,
            };
            return metrics;
            """,
            SELECTORS,
        )
    finally:
        driver.quit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Inspect key rendered layout measurements.")
    parser.add_argument("--url", default="http://127.0.0.1:4200/")
    parser.add_argument("--width", type=int, default=1440)
    parser.add_argument("--height", type=int, default=961)
    parser.add_argument("--intro-width", type=int)
    args = parser.parse_args()
    print(json.dumps(inspect(args.url, args.width, args.height, args.intro_width), indent=2))
