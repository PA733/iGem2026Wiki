# LUT-CHINA Wiki

以用户提供的 `LUT_CHINA WIKI.docx` 为内容来源，使用 Angular standalone 组件实现主页、6 个分类页、17 篇项目文章（85 个正文章节）与英文全文搜索。页面布局与交互参考 [Material Design 3 Get started](https://m3.material.io/get-started)。

## 运行与构建

```bash
npm install
npm start
npm run build
```

本地预览地址为 `http://localhost:4200/`。生产文件在 `dist/material-design-3-clone/browser/`。构建后会根据内容索引自动生成所有分类和文章的静态入口，支持直接访问和刷新；`/get-started` 也可进入项目概览。未知地址由应用显示 404 内容，静态服务器可将错误页配置为生成的 `404.html`。

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
```

页面脚本检查所有文章与分类路由、跳转/刷新、页内目录、主题与动画偏好、404 及 390/768/1100/1440px 布局，同时保存截图。搜索脚本检查英文正文、URL 查询恢复、无结果状态与键盘操作。
