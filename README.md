# LUT-CHINA Wiki

以用户提供的 `LUT_CHINA WIKI.docx` 为内容来源，使用 Angular standalone 组件实现主页、6 个分类页、17 篇项目文章（85 个正文章节）与英文全文搜索。页面布局与交互参考 [Material Design 3 Get started](https://m3.material.io/get-started)。

## 运行与构建

```bash
npm install
npm start
npm run build
```

本地预览地址为 `http://localhost:4200/`。生产文件在 `dist/material-design-3-clone/browser/`。构建后会根据内容索引自动生成所有分类和文章的静态入口，支持直接访问和刷新；`/get-started` 也可进入项目概览。未知地址由应用显示 404 内容，静态服务器可将错误页配置为生成的 `404.html`。

## 部署到 Cloudflare Pages

使用 Node.js 22.21 或更新的兼容版本。在项目根目录执行：

```bash
npm ci
npm run cf:login  # 首次使用：浏览器中登录 PA733 账户并授权
npm run deploy   # 生产构建、生成静态入口，再上传到 Pages
```

部署脚本为 [tools/cloudflare-pages.mjs](tools/cloudflare-pages.mjs)，固定使用本次部署的账户 `59a01eefabdbc9ef0ebadf236bbf3081`、已有项目 `igem2026` 和生产分支 `main`。每次发布的是当前工作目录的内容，包括尚未提交的修改。构建失败时不会上传。

脚本通过 `npx` 使用固定版本 `wrangler@4.63.0`，首次运行需要联网下载。登录信息保存在本项目的 `.cloudflare/`（已加入 Git 忽略），与本机默认登录配置隔离，因此首次运行需要重新授权。若存在优先级更高的旧式 `~/.wrangler` 配置目录，脚本会停止，防止沿用旧登录。CI 可通过环境变量 `CLOUDFLARE_API_TOKEN` 提供目标账户的 Pages 写入令牌，跳过交互式登录。

仅验证构建和部署参数，不上传：

```bash
npm run deploy -- --dry-run
```

默认站点为 <https://igem2026.pages.dev>；[项目控制台](https://dash.cloudflare.com/59a01eefabdbc9ef0ebadf236bbf3081/pages/view/igem2026)。自定义域名 `igem2026.bllxl.com` 的 DNS 与证书状态在控制台单独管理；发布脚本只更新站点文件。

## 内容栏目

| 栏目 | 路径 | 内容 |
| --- | --- | --- |
| Project | `/project` | 项目背景、四层敷料设计、实施路径、社区贡献 |
| Wet lab | `/wet-lab` | 工程循环、细胞实验、元件、验证与结果规划 |
| Dry lab | `/dry-lab` | 数学模型与辅助决策平台规划 |
| Human Practices | `/human-practices` | 利益相关方、教育传播、合作规划 |
| Team | `/team` | 团队组织、成果归属、工作时间线 |
| Safety | `/safety` | 项目边界与生物安全规划 |

文档中的设计和计划保持其原有状态；未填造实验结果、团队成员、元件编号或已完成合作。网站内容、导航说明、搜索提示与辅助功能标签统一使用英文。

## 修改内容与样式

- `src/app/content/wiki.data.ts`：统一的分类、文章、表格和段落数据；搜索与静态入口均从此生成。
- `src/app/pages/home/`：首页文案、卡片、SVG 插图与暂停控制。
- `src/app/pages/category/`：分类首屏、二级入口、固定插图与滚动淡入切换。
- `src/app/pages/wiki-article/`：文章、分类标签、目录跟随、章节链接复制与深链接。
- `src/app/pages/search/`：中英文正文检索、摘要、键盘导航与 URL 查询。
- `src/app/layout/`：桌面/移动导航及共用页脚。
- `src/app/app.component.ts`：站内路由、历史记录、深色模式与动画偏好。
- `src/styles.css`：样式入口，响应式规则和新增页面样式按顺序导入。

参考尺寸、交互和素材归属记录在 [docs/reference-notes.md](docs/reference-notes.md)。

已保存浏览器实测截图：[主页](docs/screenshots/home-desktop.png)、[分类页](docs/screenshots/project-desktop.png)、[文章页](docs/screenshots/article-desktop.png)、[移动端分类页](docs/screenshots/project-mobile.png)。

## Selenium 验证

按 [AGENTS.md](AGENTS.md) 安装 Selenium、Chrome 和 `/usr/bin/chromedriver`。启动本地站点后执行：

```bash
python3 tools/test_wiki_pages.py --url http://127.0.0.1:4200 --output /tmp/lut-wiki-checks
python3 tools/test_wiki_search.py --url http://127.0.0.1:4200 --output /tmp/lut-wiki-search
python3 tools/test_article_motion.py --url http://127.0.0.1:4200
python3 tools/test_motion_playback.py --url http://127.0.0.1:4200
```

页面脚本检查所有文章与分类路由、跳转/刷新、页内目录、主题与动画偏好、404 及 390/768/1100/1440px 布局，同时保存截图。搜索脚本检查英文正文、URL 查询恢复、无结果状态与键盘操作。

动效脚本检查 tabs 的方向、滚动目标、吸顶收缩、阅读位置恢复、连续点击、小屏锚点，以及自动动画暂停／继续和局部播放控制。原站 Selenium 逐帧记录、公开源码参数和复现方式见 [docs/motion-reference.md](docs/motion-reference.md)。
