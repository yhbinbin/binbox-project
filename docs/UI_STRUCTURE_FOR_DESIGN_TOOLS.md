# binbox UI Structure For Design Tools

本文件给 Stitch、Figma AI、Galileo、Uizard 等 UI 工具使用。

它的任务不是让设计工具自由生成“通用网站”，而是让它基于 `binbox` 的真实产品结构与审美人格，输出可以回流到代码的页面设计。

配套文档：

- 业务需求：`docs/BUSINESS_REQUIREMENTS.md`
- 开发说明：`docs/AI_DEVELOPMENT_GUIDE.md`
- 主题参考：`docs/theme-vhs-tap.md`、`docs/theme-cd-rom.md`

---

## 1. Project Identity

- 项目名：`binbox`
- 类型：音乐创作与 Web Audio 实验站点
- 关键词：90s digital nostalgia / VHS / CRT / PS1 / jungle / breakbeat / bedroom producer
- 站点角色：个人品牌站 + 作品展示 + 浏览器实验室 + Archive + 无支付 Store

一句话叙事：

> 一个在 1995 年卧室里，通过损坏接收器接收未来信号的观察者。

---

## 2. Emotional Core

UI 设计要同时容纳两组气质：

- 冷：卧室、旧设备、夜晚、信号漂移、技术废墟
- 热：舞池、秀场、海岛、流行文化、肉身渴望

不要消灭这种矛盾，要让它共存。

设计目标：

- 像“虚拟避难所”
- 像“私人工作台”
- 不是企业官网
- 不是通用 dashboard

---

## 3. Site IA

顶层导航只有：

1. `Home`
2. `Music`
3. `Lab`
4. `Archive`
5. `Store`
6. `About`

路由结构：

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

中英双语必须成立，设计稿要预留中文长度。

---

## 4. Global Layout Rules

## 4.1 Header

必须包含：

- 品牌名 `binbox`
- 主导航
- 当前路由高亮
- 主题切换
- 语言切换

风格要求：

- 更像内容站导航和设备顶部条带
- 不要做得过重
- 不要做成 SaaS 控制台

## 4.2 Container Width

内容页：

- `Home`
- `Archive`
- `Archive Detail`
- `About`
- `Music`

建议：

- 约 `760px - 1020px`
- 阅读优先

宽布局页：

- `Lab`
- 各实验工具页
- `Store`
- `Store Detail`

建议：

- 约 `1100px - 1280px`
- 更像工作台

## 4.3 Footer

保持简洁，可包含：

- 品牌
- 联系方式
- 一句站点说明

---

## 5. Shared Visual Principles

## 5.1 不该出现的方向

- 通用创业官网风格
- 过强 dashboard 感
- 纯玻璃拟态堆叠
- 只有紫粉霓虹的廉价 synthwave
- 过亮、过干净、无阴影的商业科技感

## 5.2 应该出现的方向

- 旧媒介的物质感
- 设备壳体与显示屏之间的层次
- 细线、标签、编号、状态条
- 内容优先
- 克制但有情绪

## 5.3 媒介滤镜

热素材必须经过冷媒介处理。

可以使用：

- CRT glow
- VHS 扫描线
- 旧电视 OSD
- Win95 / 旧设备面板
- 低分辨率缩放
- 波形、网格、示波器、接收器

原则：

> 热信号被冷设备接收，而不是直接满屏倾倒。

---

## 6. Theme System

必须基于同一套页面结构，输出两套皮肤：

- `VHS-Tape`
- `ROM-CD`

不要做成两套完全不同的信息架构，只做：

- 相同结构
- 不同配色
- 不同材质
- 不同媒介气质

## 6.1 VHS-Tape

关键词：

- vaporwave
- damaged tape
- VHS sleeve
- CRT afterglow
- hot signal in a cold room

气质：

- 更情绪化
- 更私密
- 更像深夜里被截获的热信号

适合页面：

- `Home`
- `Archive`
- `Store`
- `Break Slicer`

## 6.2 ROM-CD

关键词：

- millennium
- win95 shell
- silver chassis
- cold blue interface
- device workstation

气质：

- 更理性
- 更设备化
- 更像银灰外壳 + 深色显示器

适合页面：

- `Lab`
- `Breakbeat Generator`
- `Music Theory Keyboard`

---

## 7. Page Structure

## 7.1 Home

目标：

- 品牌入口
- 模块导航

模块建议：

- 顶部系统条
- Hero
- 简短 manifesto / intro
- 3 至 4 个入口区块
- 底部状态条

不要做：

- 复杂营销长页

## 7.2 Music

目标：

- 作品档案页

模块建议：

- 顶部档案头部
- 作品目录区
- 每条作品展示：
  - catalog 编号
  - title
  - BPM
  - key
  - tags
  - cover / abstract artwork
- 状态面板

## 7.3 Lab Index

目标：

- 实验入口总览

模块建议：

- 顶部系统头部
- 标题下轻量灯带或 signal strip
- 3 个实验卡片入口
- 下方状态面板 / monitor

卡片不要只是普通博客卡片。
更像：

- 模块入口面板
- 工具封面
- 设备功能卡

## 7.4 Break Slicer

目标：

- 像一台样本切片工作站

结构建议：

- Header
- 主波形屏
- 音序区
- Slice Matrix
- Control Rack
- 底部状态条

## 7.5 Breakbeat Generator

目标：

- 像一台鼓机 / breakbeat 编排器

结构建议：

- Header
- 主控制台
- Sequencer
- Monitor / Meter
- Control Rack

## 7.6 Music Theory Keyboard

目标：

- 乐理学习与演奏工具

结构建议：

- Header
- 左侧和声控制台
- 右侧五度圈总线
- 底部键盘 dock

要求：

- 根音选择与播放模式要适合 sticky
- 键盘固定在底部

## 7.7 Archive

目标：

- 文章列表 / 时间档案

结构建议：

- 顶部档案头部
- 轻量侧栏
- 时间线式条目列表
- 底部结束条

它应该更像：

- 日志
- 记忆索引
- 文本档案

而不是博客卡片墙。

## 7.8 Store

目标：

- 商品目录与详情展示

列表页建议：

- 顶部头部
- 商品目录
- 商品卡信息：
  - title
  - type
  - price
  - tags
  - catalog

详情页建议按类型分化：

- sample pack
- preset pack
- tutorial

## 7.9 About

目标：

- 创作者档案 + 联系方式

结构建议：

- 顶部人物档案头部
- 正文阅读区
- 侧栏身份信息
- 联系账本

更像：

- 被编排过的阅读页

而不是功能面板。

---

## 8. Motion Direction

动效必须克制，但全站应有一致节奏。

建议：

- 页面进入：轻微上浮 + 淡入
- 信号条 / 灯带：轻微脉冲
- 卡片 hover：轻微上浮或亮度变化
- 文字型页面：更轻的文字淡入

不要：

- 过度弹跳
- 大幅旋转
- 强烈视差
- 花哨粒子背景

---

## 9. Component Tone

按钮：

- 像设备按钮、磁带标签、系统开关

标签：

- 像 catalog label、频道标签、采样标记

输入与滑杆：

- 像音频设备控制面板

卡片：

- 更像面板、壳体、档案封套
- 不要只是标准卡片

---

## 10. Prompt Template For Stitch

可以直接把下面这段交给设计工具：

```md
Design a bilingual-ready website UI for "binbox", a 90s digital nostalgia music creation and web-audio experiment project.

The site is not a SaaS dashboard and not a startup landing page. It is a personal creative studio, archive, and browser music lab.

Core narrative:
"A bedroom producer in 1995 receiving future signals through a damaged receiver."

Use the following top-level pages:
- Home
- Music
- Lab
- Archive
- Store
- About

Lab has 3 tools:
- Breakbeat Generator
- Break Slicer
- Music Theory Keyboard

Generate the same page structure in two skins:
1. VHS-Tape
   - emotional, nocturnal, private, vaporwave signal inside a cold room
   - VHS, CRT, damaged tape sleeve, hot signal through dark hardware
2. ROM-CD
   - rational, device-like, cold blue system, silver chassis, win95-inspired shell

Use restrained animation, strong hierarchy, content-first layout, and hardware-like UI layers.
Avoid generic SaaS cards, glossy startup layouts, and over-bright Aero nostalgia.
```

---

## 11. What Designers Should Return To Codex

设计工具返回稿件时，最好同时附带：

- 页面名
- 使用主题：`VHS-Tape` 或 `ROM-CD`
- 结构分区说明
- 关键配色
- hover / active / sticky 行为说明
- 哪些模块应该是 `shell / raised / dark / screen`

这样代码落地会快很多。
