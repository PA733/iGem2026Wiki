#!/usr/bin/env python3
"""Capture Material 3 and local motion evidence with Selenium (no golden assertions)."""

import argparse
import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait


REFERENCE = "https://m3.material.io/"
SELECTORS = {
    "reference": {
        "nav": ".article-tab-list",
        "tabs": ".article-tab-list .tab",
        "controls": ".article-tab-list .navigation-container",
        "body": ".carbon-container",
        "hero": "mio-header",
        "toggle": 'mio-toggle-switch[aria-label$="animations"]',
        "track": "mio-toggle-switch[aria-label$='animations'] .track",
        "localToggle": "#btnToggleVideo",
    },
    "local": {
        "nav": ".wiki-article-tab-list",
        "tabs": ".wiki-article-tab",
        "controls": ".wiki-article-tab-controls",
        "body": ".wiki-article-body",
        "hero": ".wiki-article-hero",
        "toggle": ".rail-controls button[aria-label$='animations']",
        "track": ".rail-controls button[aria-label$='animations'] .rail-control-track",
        "localToggle": ".video-control",
    },
}

# Definitions are stored once; frames reference IDs so that a paused animation can
# be distinguished from one destroyed and recreated at time zero on resume.
INSTALL_PROBE = r"""
const selectors = arguments[0], definitions = [], ids = new WeakMap();
const describe = node => node ? {
  tag: node.localName, id: node.id, class: node.getAttribute('class')
} : null;
const style = (node, pseudo = null) => {
  if (!node) return null;
  const s = getComputedStyle(node, pseudo);
  return {target: describe(node), rect: node.getBoundingClientRect().toJSON(),
    opacity: s.opacity, transform: s.transform, position: s.position, top: s.top,
    maxWidth: s.maxWidth, marginBottom: s.marginBottom, height: s.height,
    overflowX: s.overflowX, overflowY: s.overflowY, transition: s.transition};
};
function animations() {
  return document.getAnimations().map(a => {
    if (!ids.has(a)) {
      ids.set(a, definitions.length);
      const timing = a.effect?.getTiming();
      if (timing?.iterations === Infinity) timing.iterations = 'Infinity';
      definitions.push({id: ids.get(a), type: a.constructor.name,
        name: a.animationName, target: describe(a.effect?.target),
        pseudo: a.effect?.pseudoElement, timing, frames: a.effect?.getKeyframes()});
    }
    return {id: ids.get(a), currentTime: a.currentTime, playState: a.playState};
  });
}
window.__motionProbe = {definitions, capture() {
  const q = key => document.querySelector(selectors[key]);
  const toggle = q('toggle'), page = document.querySelector('.page-content');
  const toolbar = document.querySelector('mwc-top-app-bar-fixed')?.shadowRoot
    ?.querySelector('header') || document.querySelector('.mobile-toolbar');
  return {path: location.pathname, width: innerWidth, height: innerHeight,
    scroll: {document: scrollY, page: page?.scrollTop},
    page: style(page), nav: style(q('nav')), controls: style(q('controls')),
    body: style(q('body')), hero: style(q('hero')), toolbar: style(toolbar),
    tabs: [...document.querySelectorAll(selectors.tabs)].map(t => ({
      selected: t.getAttribute('aria-selected'), tabIndex: t.tabIndex,
      href: t.getAttribute('href'), style: style(t), before: style(t, '::before')})),
    focused: describe(document.activeElement),
    preference: localStorage.getItem('current_animation'),
    toggle: toggle ? {label: toggle.getAttribute('aria-label'),
      checked: toggle.getAttribute('aria-checked'), track: style(q('track'))} : null,
    videos: [...document.querySelectorAll('video')].map(v => ({
      target: describe(v), src: v.currentSrc, currentTime: v.currentTime,
      paused: v.paused, readyState: v.readyState})), animations: animations()};
}};
"""

START_TRACE = r"""
const duration = arguments[0], probe = window.__motionProbe;
probe.pending = new Promise(resolve => {
  document.addEventListener('click', () => {
    const start = performance.now(), frames = [];
    function frame() {
      const t = performance.now() - start;
      frames.push({t, ...probe.capture()});
      if (t < duration) requestAnimationFrame(frame);
      else resolve({frames, definitions: probe.definitions});
    }
    frame();
  }, {capture: true, once: true});
});
"""


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")


def wait_frames(driver, milliseconds=500):
    driver.execute_async_script("setTimeout(arguments[1], arguments[0])", milliseconds)


def open_page(driver, url, source, ready_selector):
    driver.get(url)
    WebDriverWait(driver, 30).until(
        lambda d: d.find_elements(By.CSS_SELECTOR, ready_selector)
    )
    driver.execute_async_script("document.fonts.ready.then(() => arguments[0]())")
    wait_frames(driver, 900)
    driver.execute_script(INSTALL_PROBE, SELECTORS[source])


def viewport(driver, width):
    driver.execute_cdp_cmd("Emulation.setDeviceMetricsOverride", {
        "width": width, "height": 1100 if width > 960 else 844,
        "deviceScaleFactor": 1, "mobile": False,
    })


def snapshot(driver, folder, name):
    state = driver.execute_script("return window.__motionProbe.capture()")
    write_json(folder / f"{name}.json", state)
    driver.save_screenshot(str(folder / f"{name}.png"))
    return state


def click_trace(driver, folder, name, selector, index=0, duration=1100):
    element = driver.find_elements(By.CSS_SELECTOR, selector)[index]
    if driver.execute_script("return innerWidth <= 960"):
        # WebDriver's default nearest scroll can leave a tab behind the fixed
        # mobile toolbar. Center it before starting the click's motion trace.
        driver.execute_script("""
          arguments[0].scrollIntoView({block: 'center', inline: 'center',
            behavior: 'instant'});
        """, element)
        wait_frames(driver, 300)
    driver.execute_script(START_TRACE, duration)
    element.click()
    trace = driver.execute_async_script(
        "window.__motionProbe.pending.then(arguments[0])"
    )
    write_json(folder / f"{name}-trace.json", trace)
    snapshot(driver, folder, f"{name}-after")


def scroll_page(driver, top):
    # Attempt both owners and record which one moved. This exposes breakpoint
    # regressions instead of making the probe assume the implementation is right.
    driver.execute_script("""
      window.scrollTo({top: arguments[0], behavior: 'instant'});
      document.querySelector('.page-content')?.scrollTo({
        top: arguments[0], behavior: 'instant'});
    """, top)
    wait_frames(driver)


def capture_sources(driver, folder, source, manifest):
    folder.mkdir(exist_ok=True)
    urls = driver.execute_script("""
      return [...new Set([
        ...[...document.scripts].map(n => n.src),
        ...[...document.querySelectorAll('link[rel=stylesheet]')].map(n => n.href),
        ...performance.getEntriesByType('resource').map(n => n.name)
      ])];
    """)
    origin = urlparse(driver.current_url)
    for url in urls:
        parsed = urlparse(url)
        if (parsed.scheme, parsed.netloc) != (origin.scheme, origin.netloc):
            continue
        if not re.search(r"\.(?:js|css)$", parsed.path):
            continue
        if source == "reference" and not parsed.path.startswith("/static/angular/"):
            continue
        if url in manifest:
            continue
        response = driver.execute_async_script("""
          const done = arguments[1];
          fetch(arguments[0]).then(async r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            done({body: await r.text()});
          }).catch(e => done({error: String(e)}));
        """, url)
        if "error" in response:
            manifest[url] = response
            continue
        filename = hashlib.sha256(url.encode()).hexdigest()[:10] + "-" + Path(parsed.path).name
        data = response["body"]
        (folder / filename).write_text(data, encoding="utf-8")
        manifest[url] = {"file": filename, "sha256": hashlib.sha256(data.encode()).hexdigest()}
    write_json(folder / "manifest.json", manifest)


def capture_document(driver, folder, name):
    (folder / f"{name}.html").write_text(driver.page_source, encoding="utf-8")
    inline = driver.execute_script(
        "return [...document.querySelectorAll('style')].map(n => n.textContent).join('\\n')"
    )
    (folder / f"{name}-inline.css").write_text(inline, encoding="utf-8")


def capture_article(driver, folder, source, url, widths, manifest):
    selectors = SELECTORS[source]
    for width in widths:
        viewport(driver, width)
        open_page(driver, url, source, selectors["tabs"])
        target = folder / f"article-{width}"
        target.mkdir(exist_ok=True)
        capture_document(driver, target, "initial")
        snapshot(driver, target, "top")
        capture_sources(driver, folder / "sources", source, manifest)
        scroll_page(driver, 1000)
        snapshot(driver, target, "scroll-1000")
        scroll_page(driver, 0)
        driver.execute_script("""
          document.querySelector(arguments[0]).scrollIntoView({
            block: 'center', behavior: 'instant'});
        """, selectors["nav"])
        snapshot(driver, target, "tabs-before")
        click_trace(driver, target, "tab-forward", selectors["tabs"], index=1)
        scroll_page(driver, 1400)
        snapshot(driver, target, "second-tab-reading")
        click_trace(driver, target, "tab-back", selectors["tabs"], index=0)
        click_trace(driver, target, "tab-restore", selectors["tabs"], index=1)
        capture_document(driver, target, "final")
        capture_sources(driver, folder / "sources", source, manifest)
        print(f"Captured {source}: article {width}px", flush=True)


def capture_playback(driver, folder, source, url, manifest):
    viewport(driver, 1440)
    selectors = SELECTORS[source]
    target = folder / "playback"
    target.mkdir(exist_ok=True)
    open_page(driver, url, source, selectors["toggle"])
    try:
        WebDriverWait(driver, 15).until(lambda d: d.execute_script("""
          const videos = [...document.querySelectorAll('video')];
          return !videos.length || videos.some(v => v.readyState >= 2 && v.currentTime > .1);
        """))
        media_ready = True
    except TimeoutException:
        media_ready = False
    write_json(target / "media-readiness.json", {"ready_before_pause": media_ready})
    wait_frames(driver, 600)
    capture_document(driver, target, "initial")
    capture_sources(driver, folder / "sources", source, manifest)
    snapshot(driver, target, "initial")
    click_trace(driver, target, "pause", selectors["toggle"], duration=600)
    wait_frames(driver, 300)
    snapshot(driver, target, "still-paused")
    click_trace(driver, target, "resume", selectors["toggle"], duration=600)
    # A local media control remains usable while the global preference is paused.
    if driver.find_elements(By.CSS_SELECTOR, selectors["localToggle"]):
        click_trace(driver, target, "pause-for-local-play", selectors["toggle"], duration=600)
        click_trace(driver, target, "local-play", selectors["localToggle"], duration=600)
        click_trace(driver, target, "global-resume-after-local", selectors["toggle"], duration=600)
    click_trace(driver, target, "pause-before-reload", selectors["toggle"], duration=600)
    open_page(driver, url, source, selectors["toggle"])
    snapshot(driver, target, "pause-reload")
    # Record this intentional accessibility difference independently of the
    # persistent site preference: the local project reduces decorative motion.
    driver.execute_script("localStorage.removeItem('current_animation')")
    driver.execute_cdp_cmd("Emulation.setEmulatedMedia", {
        "features": [{"name": "prefers-reduced-motion", "value": "reduce"}],
    })
    try:
        open_page(driver, url, source, selectors["toggle"])
        snapshot(driver, target, "system-reduced-motion")
    finally:
        driver.execute_cdp_cmd("Emulation.setEmulatedMedia", {"features": []})
    print(f"Captured {source}: pause, local play, resume, reload, reduced motion", flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", default="http://127.0.0.1:4200/", help="Local app base URL")
    parser.add_argument("--article-path", default="/project/description")
    parser.add_argument("--output", type=Path, default=Path("/tmp/wiki-motion-reference"))
    parser.add_argument("--widths", nargs="+", type=int, default=[1440, 961, 960, 390])
    parser.add_argument("--chromedriver", default="/usr/bin/chromedriver")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    options = Options()
    for arg in ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--window-size=1440,1100"]:
        options.add_argument(arg)
    driver = webdriver.Chrome(service=Service(args.chromedriver, port=0), options=options)
    driver.set_script_timeout(45)
    driver.set_page_load_timeout(45)
    write_json(args.output / "run.json", {
        "captured_at": datetime.now(timezone.utc).isoformat(),
        "reference": REFERENCE, "local": args.url, "widths": args.widths,
        "browser": driver.capabilities.get("browserVersion"),
        "note": "CSS viewport emulation; mobile=False; frame times depend on browser scheduling.",
    })
    try:
        for source, base, article in [
            ("reference", REFERENCE, urljoin(REFERENCE, "components/buttons/overview")),
            ("local", args.url, urljoin(args.url, args.article_path)),
        ]:
            folder = args.output / source
            folder.mkdir(exist_ok=True)
            manifest = {}
            capture_article(driver, folder, source, article, args.widths, manifest)
            capture_playback(driver, folder, source, base, manifest)
    finally:
        driver.quit()
    print(f"Evidence saved to {args.output.resolve()}")


if __name__ == "__main__":
    main()
