# Selenium 截图流程

1. 安装 Selenium：

   ```bash
   python3 -m pip install --user selenium
   ```

2. 确认本机已安装 Google Chrome 和 `chromedriver`。

3. 创建 Python 脚本并启动无头 Chrome：

   ```python
   import time
   from selenium import webdriver
   from selenium.webdriver.chrome.options import Options
   from selenium.webdriver.chrome.service import Service

   options = Options()
   options.add_argument("--headless=new")
   options.add_argument("--no-sandbox")
   options.add_argument("--disable-dev-shm-usage")
   options.add_argument("--window-size=1440,1100")

   driver = webdriver.Chrome(
       service=Service("/usr/bin/chromedriver", port=9515),
       options=options,
   )
   ```

4. 打开目标页面，等待加载后保存截图：

   ```python
   driver.get("https://m3.material.io/")
   time.sleep(4)
   driver.save_screenshot("m3-material.png")
   ```

5. 截取内部滚动区域的不同位置：

   ```python
   from selenium.webdriver.common.by import By

   container = driver.find_element(
       By.CSS_SELECTOR, "div.page-content.page-content-height"
   )
   for y in [0, 850, 1750, 2700, 3700, 4500, 5100]:
       driver.execute_script("arguments[0].scrollTop = arguments[1]", container, y)
       time.sleep(0.7)
       driver.save_screenshot(f"m3-material-{y}.png")

   driver.quit()
   ```
