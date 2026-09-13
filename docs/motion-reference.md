# Material 3 动画行为对照

参考页面为 [Material 3 首页](https://m3.material.io/) 和 [Buttons / Overview 文章](https://m3.material.io/components/buttons/overview)，采集日期为 2026-09-13。结论结合公开发布的 JavaScript / CSS、Selenium 截图、computed styles、Web Animations 关键帧和逐帧滚动位置；具体时间参数以源码为准，浏览器采样时间会受到帧率与调度影响。

## 文章 tabs

| 行为 | 原站证据与本项目对齐目标 |
| --- | --- |
| 正向切换 | 原正文用 `100ms cubic-bezier(.2,0,0,1)` 淡出，`translateX(0)` → `translateX(-10px)`；新正文从 `translateX(10px)` 入场。 |
| 反向切换 | 原正文向 `10px` 淡出，新正文从 `-10px` 入场；方向由目标 tab 与原 tab 的顺序决定。 |
| 新正文入场 | 淡出结束后替换正文；入场本身先等待 `200ms`，再执行 `200ms linear` 的透明度与位移变化。从点击算，约 `100ms` 替换正文、`300ms` 开始可见入场、`500ms` 结束。 |
| 选中背景 | 每个 tab 的 `::before` 独立执行 `scaleX(.32)` → `scaleX(1)` 与 `opacity: 0` → `1`，时长 `200ms`、曲线 `cubic-bezier(.2,0,0,1)`；反选逆向恢复。 |
| 桌面滚动 | 点击约 `300ms` 后处理 `.page-content` 的滚动。新 tab 默认位置为文章 header 高度加 `8px`；从上方进入时平滑滚动，从更深处返回默认位置时直接定位。 |
| 阅读位置记忆 | 每个 tab 保存独立阅读位置。保存位置比默认正文起点更深时，再次进入恢复该位置；靠近页首的位置回到默认正文起点。 |
| sticky 形变 | 桌面 tabs 顶部触及视口时，最大宽度收至 `1040px`，controls 高度由 `88px` 收至 `72px`，下方增加 `16px` margin；尺寸过渡 `300ms cubic-bezier(.2,0,0,1)`。 |

源码对应 [文章动态 chunk 551](https://m3.material.io/static/angular/551.daaacbfab5e4b01e.js) 的 `tabClick`、`scrollPage`、`calculateDefaultScrollY`、`articleScrollY` 与组件 CSS；`tabFadeOut` / `tabFadeIn` 以及 `MIO_ANIMATIONS` 常量位于 [main bundle](https://m3.material.io/static/angular/main.71b75c898cbb56ee.js)。文件 hash 属于本次发布版本，重新采集时以生成的 `sources/manifest.json` 为准。

## 小屏幕与导航

在 `961px` 及以上，正文滚动由 `.page-content` 承担；在 `960px` 及以下，文档本身滚动。Selenium 同时记录 `window.scrollY` 与 `.page-content.scrollTop`，避免仅凭 CSS 中的 `position: sticky` 判断实际吸顶行为。

原站小屏幕文章 tabs 会随文档离开视口，实际没有保持在顶部；切换 tab 后文档回到顶部。桌面的阅读位置记忆不能直接套用为移动端行为。另一个独立断点是 `600px`：向下滚动时 controls 透明度隐藏的规则只在这一宽度范围生效。

移动抽屉为 `320px`，开关使用 `300ms cubic-bezier(.2,0,0,1)` 位移过渡。抽屉主菜单与文章子菜单转换采用 `±10px` 横移：离场 `100ms`，入场延迟 `200ms` 后再用 `200ms linear` 显示；嵌套文章列表展开/折叠为 `235ms cubic-bezier(.2,0,0,1)`。这些参数来自 main bundle 的导航组件及 Selenium 捕获到的 Web Animations。

## 暂停与继续

全局播放按钮控制持续媒体播放，包括视频和项目中对应的持续插图动画。原站暂停后，tabs 反馈、导航过渡和滚动交互仍继续工作；再次播放从暂停时间继续，不重新触发页面入场。

按钮内部是上下排列的两个 `48px` 槽位，轨道在 `translateY(-48px)` 与原位置之间切换，过渡为 `300ms cubic-bezier(.2,0,0,1)`。图标不应在点击时直接替换。`aria-checked` 为播放状态，标签在 “Pause animations” / “Play animations” 间变化。状态以 `current_animation=play|pause` 保存在 localStorage，刷新后继续生效。

全局暂停后，单个视频仍可手动播放；该操作不更改全局偏好。下一次全局切换重新统一媒体状态。对应证据来自 main bundle 的 toggle switch、媒体控制逻辑，以及暂停前后的 `currentTime`、`playState`、轨道 transform 和刷新后的状态。

**明确保留的差异：** 本项目遵守操作系统 `prefers-reduced-motion: reduce`，减少装饰性动态与过渡；本次实测原站在该系统偏好下仍默认播放首页视频。这项项目保护不作为需要复刻的原站行为。页面自身的暂停偏好与系统减少动态效果偏好分开处理。

## 复现与证据文件

先按仓库 AGENTS.md 准备 Selenium、Chrome 和 chromedriver，并启动本地站点：

```bash
npm start -- --host 127.0.0.1
```

另一个终端执行：

```bash
python3 tools/compare_motion_reference.py
# 增加中间尺寸或指定本地服务、输出目录：
python3 tools/compare_motion_reference.py --url http://127.0.0.1:4200/ --widths 1440 961 960 768 600 390 --output /tmp/wiki-motion-reference
```

脚本默认检查 `1440 / 961 / 960 / 390px`，本地文章为 `/project/description`，可用 `--article-path` 修改。Chrome 通过 `port=0` 分配独立 chromedriver 端口。输出是供比较的证据，不会把原站正文与 wiki 正文截图当作应逐像素相同的 golden test。

- `run.json`：采集时间、地址、视口与 Chrome 版本。
- `reference/sources`、`local/sources`：公开 JS / CSS 与 URL、文件名、SHA-256 映射；原站只保存同源 `/static/angular/` 下的 JS / CSS，并从 Performance Resource Timing 补齐动态 chunk，不下载第三方 tracking 脚本。
- `*/article-{width}`：页面 DOM、内联样式、顶部与滚动截图；tabs 正向、反向和阅读位置恢复的逐帧 trace。trace 记录正文/选中背景样式、两种滚动位置、动画定义与动画实例 ID。
- `*/playback`：暂停、持续暂停、单独播放、全局继续、刷新恢复和系统减少动态效果的状态/截图；暂停与继续还记录逐帧轨道与媒体时间。`media-readiness.json` 标明暂停前媒体是否已就绪，避免把尚未加载的视频时间 `0` 误判为暂停行为。

首次调查的完整临时证据位于 `/tmp/wiki-article-motion`、`/tmp/wiki-motion-playback`、`/tmp/wiki-responsive-motion`，这些目录不会进入版本控制。文章调查的文件序号曾因动态资源更新而变化，应以 `initial.json` 内的 URL 为准：最终 `asset-14.js` 是文章 chunk 551，`asset-12.js` 是 main bundle。

本次实现回归：页面检查 `158` 项、文章动效检查 `68` 项、搜索检查 `31` 项及播放控制检查全部通过，`npm run build` 成功。文章动效检查包含八个响应式尺寸、目录滚动中断、返回后焦点与历史导航吸顶。
