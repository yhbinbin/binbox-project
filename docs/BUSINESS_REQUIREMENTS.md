# binbox Business Requirements

本文件用于总结 `binbox` 当前阶段的业务需求与产品边界。

它的目标不是写成大而全 PRD，而是让你、AI、设计工具都能快速回答：

- 这个项目到底是什么
- 当前阶段优先做什么
- 明确不做什么

配套文档：

- 开发说明：`docs/AI_DEVELOPMENT_GUIDE.md`
- UI 结构：`docs/UI_STRUCTURE_FOR_DESIGN_TOOLS.md`
- 主题参考：`docs/theme-vhs-tap.md`、`docs/theme-cd-rom.md`

---

## 1. 项目基础信息

- 项目名：`binbox`
- 一句话定位：90s 数字怀旧语境下的音乐创作、内容书写与 Web Audio 交互实验站点
- 产品类型：个人创作品牌站 + 实验室 + 内容归档 + 无支付商店展示

核心目标：

- 展示音乐与创作者身份
- 提供浏览器内可玩的声音实验
- 建立文章内容中枢
- 验证商店视觉与商品叙事
- 为未来音频分析与 AI 辅助能力预留接口

---

## 2. 当前产品形态

`binbox` 不是：

- 电商系统
- 账户系统
- CMS 后台
- SaaS 控制台
- 社交平台

`binbox` 当前更像：

- 一个复古电子音乐人的数字工作室入口
- 一个内容优先、气质明确的创作站点
- 一个以浏览器实验为核心的迷你音乐实验室

---

## 3. 顶层信息架构

正式顶层只有 6 个模块：

1. `Home`
2. `Music`
3. `Lab`
4. `Archive`
5. `Store`
6. `About`

路由清单：

- `/{locale}`
- `/{locale}/music`
- `/{locale}/lab`
- `/{locale}/lab/breakbeat-generator`
- `/{locale}/lab/break-slicer`
- `/{locale}/lab/music-theory-keyboard`
- `/{locale}/archive`
- `/{locale}/archive/[slug]`
- `/{locale}/store`
- `/{locale}/store/[slug]`
- `/{locale}/about`

当前不作为正式顶层入口：

- `Samples`
- `Tutorials`

它们后续可以回归，但不是当前 IA 的一部分。

---

## 4. 模块需求

## 4.1 Home

目标：

- 品牌入口
- 快速引导到主要模块

要求：

- 内容优先
- 单列为主
- 快速进入 `Music / Lab / Archive / Store`

---

## 4.2 Music

目标：

- 展示个人音乐作品与发布档案

当前阶段：

- 允许使用静态内容与占位作品
- 重点先把作品结构、字段、视觉语言建立起来

后续可增强：

- 接入真实作品列表
- 展示 BPM / Key / Mood 等分析信息
- 自动生成描述

---

## 4.3 Lab

目标：

- 作为核心交互区
- 从“内容站”切到“工具站”

当前实验模块：

- `Breakbeat Generator`
- `Break Slicer`
- `Music Theory Keyboard`

Lab 的核心要求：

- 更宽的工作台布局
- 明确的工具面板感
- 前端可先行，后端能力后续接入

---

## 4.4 Break Slicer

定位：

- 从手动切片工具逐步升级成半自动创作工具

当前重点：

- 浏览器内加载音频
- 视觉化波形
- 切片与重排
- 音序视图与控制机架

后续增强：

- 自动切片点检测
- 节拍对齐建议
- 波形预处理

---

## 4.5 Breakbeat Generator

定位：

- 浏览器内鼓机 / breakbeat pattern 工具

当前重点：

- 鼓机工作台
- 16 step 音序器
- Pattern、Swing、Tempo 等控制

后续增强：

- AI rhythm pattern 生成
- BPM-aware 生成
- MIDI 导出

---

## 4.6 Music Theory Keyboard

定位：

- 乐理学习与创作辅助工具

当前重点：

- 根音选择
- 和弦库
- 调式库
- 五度圈
- 底部可演奏键盘

后续增强：

- 练耳与播放模式
- 音阶可视化联动
- 与 MIDI / Tone.js 更深结合

---

## 4.7 Archive

目标：

- 站点的“思考层”
- 承载教程、制作思考、创意写作

数据源：

- `content/archive/*.mdx`

文章 frontmatter 字段：

- `title`
- `date`
- `tags`
- `description`

支持：

- 列表页 `/archive`
- 详情页 `/archive/[slug]`
- MDX 内嵌 React 组件

后续增强：

- AI 摘要
- 自动 tag 推荐
- 内容 embedding 与相关文章推荐

---

## 4.8 Store

目标：

- 验证商品视觉表达与叙事
- 暂不接支付

页面：

- `/store`
- `/store/[slug]`

当前商品类型可包括：

- sample pack
- preset pack
- tutorial

商品字段：

- title
- description
- cover image
- static price
- buy button（非真实支付）

后续增强：

- sample pack 的 BPM / Key 分布
- 商品内容分析

---

## 4.9 About

目标：

- 展示创作者身份与联络方式

应包含：

- 中英正文
- Email
- GitHub
- 社交媒体链接

---

## 4.10 Backend Engine Layer

定位：

- 为 `Lab / Music / Archive / Store` 提供音频分析与 AI 能力
- 不做传统业务后台

能力分层：

### A. 音频分析

- BPM 检测
- Key 检测
- Onset / Slice 点检测
- 波形数据预处理

对应接口方向：

- `/api/audio/analyze`
- `/api/audio/slice`
- `/api/audio/waveform`

### B. AI 创作辅助

- chord progression 生成
- 风格描述生成
- track idea 辅助

对应接口方向：

- `/api/ai/chords`
- `/api/ai/describe`
- `/api/ai/idea`

### C. 数据与推荐

- 音乐标签分析
- 简单推荐
- Archive 内容关联

对应接口方向：

- `/api/recommend`
- `/api/tags/analyze`

### D. 创作者自动化工具

- 音频批处理
- sample pack 辅助生成
- metadata 提取

这一层偏内部工具，不是当前公开站点的前台能力。

---

## 5. 国际化要求

- 语言：中文 / 英文
- 路由机制：`[locale]`
- 新模块必须同步中英文
- Header、标题、按钮、说明文字统一 i18n 管理

---

## 6. 设计与交互原则

整体气质：

- 极简
- 克制
- 内容优先
- 带明确的 90s 数字怀旧人格

不要做成：

- 通用 SaaS
- 大量卡片堆叠的后台
- 纯营销 Landing Page

容器原则：

- 内容页偏窄、阅读优先
- Lab / Store 等工具页可更宽

主题方向：

- `VHS-Tape`
- `ROM-CD`

详细视觉语言见 `docs/UI_STRUCTURE_FOR_DESIGN_TOOLS.md` 与主题文档。

---

## 7. 当前非目标

当前阶段明确不做：

- 支付网关
- 订单系统
- 账户系统
- CMS 后台
- 大型社交功能

---

## 8. 风险与约束

- 浏览器音频初始化依赖用户手势
- 复杂音频交互要注意移动端性能
- WaveSurfer 与 Tone.js 并行时要注意事件与资源释放
- 中英双语会增加页面长度和布局约束

---

## 9. 当前阶段的优先顺序

先做：

1. 工程结构清晰
2. IA 稳定
3. 页面结构、视觉语言、主题系统稳定
4. Lab 三个核心实验页好用
5. Archive / Store / About 可承载真实内容

再做：

6. 后端音频分析正式接入
7. AI 辅助能力
8. 推荐与自动化工具

---

## 10. 给 AI 的最短业务上下文

```md
binbox is a bilingual music creation and web-audio experiment site.

Current product shape:
- Home
- Music
- Lab
- Archive
- Store
- About

It is not an ecommerce system, not a CMS, and not a SaaS dashboard.

Current priorities:
- stable IA
- strong visual identity
- usable lab tools
- content-ready archive/store/about pages
- backend engine capabilities reserved for later integration

Current themes:
- VHS-Tape
- ROM-CD
```
