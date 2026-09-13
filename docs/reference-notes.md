# Material 3 参考与页面实现

参考页面：https://m3.material.io/get-started 。通过 Selenium、页面 DOM、computed styles、公开 CSS 和 JavaScript 检查布局与交互。参考内容于 2026-09-13 抓取。

## 还原参数

| 元素 | 实测行为 |
| --- | --- |
| 桌面导航 | 88px 固定栏；二级抽屉 240px；300ms cubic-bezier(.2,0,0,1) |
| 移动导航 | 960px 以下切换；320px 抽屉与遮罩 |
| 分类页首屏 | 85vh、最小 760px；24px 圆角；内容最大宽度 1200px、56px 外边距 |
| 首屏文字 | 96px / 96px 主标题；22px / 30px 说明；152×41px 顶部形状 |
| 分类入口 | 两列、8px 间距、112px 最小高度、24px 内边距 |
| 分类正文 | 左侧内容与右侧插图各 50%；右侧 sticky；插图切换 500ms 淡入 |
| 平板布局 | 1294px 以下把入口移到首屏下方，并将插图改为行内排列 |
| 页面进入 | 200ms 延迟、200ms linear；opacity 0 → 1 与 translateY(10px) → 0 |

参考页的黄绿色/橙色背景与顶部形状是静态素材。持续动画来自下方视频；本项目用 SVG 科学插图和敷料分层动画表达对应项目内容。全局暂停只控制自动播放，恢复时继续原进度；tabs、抽屉和目录跳转保留过渡。系统减少动态效果偏好独立限制运动效果。详细参数及 Selenium 复现记录见 [动效对比记录](motion-reference.md)。

## 素材来源

保留的参考素材：

- `public/assets/m3-category-background.jpg`
- `public/assets/m3-category-background-dark.jpg`
- `public/assets/m3-category-shapes.svg`

以上素材来自 Google Material Design 的 Get started 页面。背景资源 URL 与原始 SVG 来源可通过该页公开内容接口 `/guide-page-content` 和 DOM 查到。设计归属 Google Material Design；原站说明其内容以 Apache 2.0 或 CC BY 4.0 提供，具体见 https://m3.material.io/ 。项目中的分层敷料、分子、实验、建模与人类实践插画为本次实现的本地 SVG。

正文内容唯一依据为用户提供的 `LUT_CHINA WIKI.docx`。重复段落已合并，第一代单分子敷料与第二代双糖苷方案分别说明。原文未提供的实验数据、成员名单、合作完成记录与审批文件，未写成既有成果。方案中的设计数值保留其目标/待验证属性。
