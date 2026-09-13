# Material Design 3 页面项目

基于 Angular standalone 组件构建，包含首页、搜索页与 Accessibility 文章页。

## 本地运行

```bash
npm install
npm start
```

开发页面默认位于 `http://localhost:4200/`。

```bash
npm run build
```

生产文件输出到 `dist/material-design-3-clone/browser/`。构建后的 `postbuild` 会为搜索页与本地文章路径生成静态入口，部署到静态服务器时也能直接打开这些地址。

## 文件职责

```text
src/
  main.ts                         # 应用启动
  app/
    app.component.ts              # 页面切换、浏览器历史、主题与动画偏好
    app.component.html            # 页面外壳及组件组合
    layout/
      navigation/                 # 桌面导航、移动抽屉及菜单数据
      footer/                     # 共用页脚
    pages/
      home/                       # 首页卡片、内容数据和视频控制
      search/                     # 搜索输入、补全、分组与建议数据
      foundations/                # 文章渲染、目录、内容数据及路径解析
  styles.css                      # 全局样式的有序导入入口
  styles/
    base.css                      # 字体、重置与基础可访问性样式
    theme.css                     # 主题变量及共用样式
    navigation.css                # 导航栏和桌面抽屉
    page-shell.css                # 页面滚动容器
    article.css                   # 文章阅读布局
    search.css                    # 搜索布局
    home.css                      # 首页及卡片
    footer.css                    # 页脚
    responsive/                   # 中屏、移动端、小屏及文章响应式规则
public/assets/                    # 图片、字体和视频
tools/                           # 截图、交互检查与页面分析脚本
```

各功能目录中的 `*.component.ts` 管理交互，`*.component.html` 管理模板，`*.data.ts` 保存内容，`*.models.ts` 定义相应的数据类型。修改菜单、卡片或文章内容时，优先编辑对应的数据文件。

子组件通过输入接收页面状态、通过输出通知页面切换；根组件管理 URL 与全局偏好。搜索输入、菜单展开、视频播放和文章目录状态由各自组件维护。

样式集中从 `src/styles.css` 按顺序加载，保留原有主题及跨页面选择器的层叠关系；响应式规则在功能样式之后加载。组件宿主使用 `display: contents`，使组件拆分不额外引入布局盒子。调整样式时请保留入口的导入顺序。

## 浏览器验证

安装 Selenium，并确保本机有 Chrome 和 `/usr/bin/chromedriver`，启动本地页面后执行：

```bash
python3 tools/test_interactions.py --url http://127.0.0.1:4200/ --output /tmp/wiki-browser-checks
```

脚本检查桌面与移动端导航、搜索、主题与动画偏好、视频控制和文章阅读交互，并输出截图和检查结果。原有截图流程见 [AGENTS.md](AGENTS.md)，批量截图入口为 `tools/capture_screenshots.py` 与 `tools/capture_responsive.py`。
