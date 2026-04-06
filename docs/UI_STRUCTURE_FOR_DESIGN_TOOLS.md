# binbox UI 结构说明

本文件用于与 Stitch、Figma AI、Galileo、Uizard 等 UI 设计工具协作。

目标不是让工具自由发挥出一个“通用 SaaS 页面”，而是让它基于 `binbox` 的真实产品结构，产出可以回流到代码实现的界面设计稿。

---

## 1. 项目定位

- 项目名：`binbox`
- 类型：音乐创作与 Web Audio 交互实验网站
- 关键词：90s digital nostalgia / VHS / CRT / PS1 / jungle / breakbeat / web audio
- 站点角色：内容站 + 作品展示 + 可玩的音乐实验室 + 商店视觉展示

### 艺术人格补充

这个项目不是泛化的 “Y2K 潮流站”，而是一个复古电子音乐人的个人作品与实验展示站。

它的核心魅力来自一组同时成立的矛盾：

- 技术乐观主义
- 末世疏离感
- 冷清卧室
- 发烫舞池
- 社恐气质
- 肉体与连接的渴望

一句话总结这个人格：

> 一个在 1995 年的卧室里，通过一台损坏的接收器，接收未来信号的观察者。

这句话应该成为 UI 设计的核心叙事母题。

### 核心气质

- 极简
- 克制
- 内容优先
- 有明确的 90 年代数字怀旧氛围
- 冷与热并存
- 技术感与肉身感并存
- 像“虚拟避难所”而不是普通主页
- 不是商业 SaaS 后台
- 不是过度卡片化的设计展示站

### 不希望出现的方向

- 过强的 dashboard 感
- 大量玻璃拟态卡片堆叠
- 过于通用的创业官网风格
- 紫色默认渐变、通用 AI landing page 套路
- 复杂多栏导致阅读负担过高
- 纯粹明快、无阴影的商业未来感
- 只有冷感、没有身体性和欲望投射
- 只有热感、没有孤独和技术废墟感

---

## 2. 全站信息架构

顶层导航只有 6 个栏目：

1. `Home`
2. `Music`
3. `Lab`
4. `Archive`
5. `Store`
6. `About`

### 路由结构

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

### 国际化

- 中英双语
- 顶部导航、按钮、页面标题、说明文案都要考虑 i18n
- 设计稿中可以先用英文占位，但要预留中文长度

---

## 3. 全站通用 UI 框架

### 3.1 Header

必须包含：

- 左侧品牌名 `binbox`
- 中间或主体区域导航
- 当前路由高亮
- 语言切换入口
- 主题切换入口

### 3.2 Header 风格建议

- 细边框
- 半透明或轻微毛玻璃可接受，但不能喧宾夺主
- 更像“内容站导航”而不是“产品控制台顶栏”

### 3.3 页面容器

分两类：

#### A. 内容页容器

用于：

- Home
- Archive 列表
- Archive 详情
- About
- Music

建议：

- 最大宽度约 `760-860px`
- 单列阅读体验
- 垂直节奏宽松

#### B. 宽布局页面

用于：

- Lab 列表
- 各个 Lab 工具页
- Store 列表 / 商品页

建议：

- 最大宽度约 `1100-1280px`
- 允许左右分区
- 允许更明显的功能面板布局

### 3.4 Footer

可以简洁，建议包含：

- 品牌名
- Email / GitHub / Social
- 一句简短站点说明

---

## 4. 视觉方向

### 4.0 核心叙事概念：虚拟避难所

设计上不要试图消灭矛盾，而要让矛盾共存。

建议把站点理解成一个“虚拟避难所”：

- 现实层是冷的：卧室、线缆、旧数码设备、示波器、损坏接收器、低像素界面
- 幻象层是热的：舞池、秀场、海岛、Soul/Funk 的体温、90s 流行文化的饱和光泽
- binbox 的音乐与 UI 就是连接两端的“线缆”与“信号”

这意味着页面不应该只有单一情绪，而应该在版面中制造：

- 冷背景 + 热点缀
- 技术框架 + 肉身影像
- 低分辨率媒介感 + 高饱和情绪碎片

### 4.1 推荐氛围

可以围绕以下元素做设计：

- CRT 光晕
- VHS 扫描线
- 旧数码设备的荧光色点缀
- 深灰、黑、钝蓝、暗红、冷青等低饱和色系
- 类硬件铭牌的标题感
- Bryce3D 式几何体或地平线
- Windows 95 / SNES / 老式设备 UI 语言
- 示波器、监视器、接收器、信号损坏、频道切换感
- 热带广告、秀场瞬间、海岛录像等被重新采样后的热素材

### 4.1.1 冷热关系

建议把视觉分为两层：

#### 冷层

- 房间
- 夜晚
- 屏幕余光
- 旧设备塑料壳
- 低像素图形
- 雾状合成器氛围

关键词：

- dusty
- lonely
- technical
- distant
- receiver noise

#### 热层

- 肉身
- 秀场
- 海岛
- 90s commercial glamour
- disco / soul / funk 的体温

关键词：

- saturated
- sensual
- sunburnt
- sweaty
- ecstatic

#### 设计整合方法

- 用冷框架包裹热内容
- 用旧媒介重新采样热素材
- 在克制页面里放入高能量局部色块
- 让暖色像“被接收到的信号”，不要满屏铺开

### 4.1.2 媒介滤镜

这是本项目最关键的视觉统合手段。

不要直接使用“热烈素材”的原始商业质感，建议通过以下媒介进行二次处理：

- CRT 屏幕显示
- VHS 转录噪点
- 示波器扫描线
- 低分辨率缩放
- 旧电视 OSD / Win95 风格窗口
- 断裂频道 / 错频 / 信号漂移

一句话原则：

> 热素材要经过冷媒介；冷界面里允许偶尔溢出热信号。

### 4.1.3 视觉隐喻

可以高频使用以下隐喻：

- damaged receiver
- bedroom console
- signal scanner
- archive terminal
- low-pixel dancefloor
- private broadcast
- future memory

这些比单纯写 “retro” 或 “Y2K” 更接近 binbox 的人格。

### 4.1.4 配色建议

建议采用“冷底 + 热点”的双系统配色。

#### 主基底色

- charcoal black
- graphite
- blue-gray
- cold navy
- oxidized teal
- muted steel

#### 热信号色

- coral red
- sunset orange
- magenta-pink 但只做局部信号色
- tropical cyan
- chrome yellow 少量点缀

#### 使用原则

- 页面 70% 使用冷色系统
- 20% 使用中性色与金属灰过渡
- 10% 使用高饱和热色做“信号出现”

热色应该像：

- 接收到的频道亮点
- 跳动的 transport 状态
- 某个按钮被激活
- 某张图像突然有温度

而不是整页大面积霓虹铺陈

### 4.1.5 双皮肤设计规范

Stitch 需要基于同一套页面结构，生成两套不同配色与气质的 UI。

这两套皮肤不是两套完全不同的信息架构，而是：

- 相同结构
- 相同页面模块
- 相同品牌人格
- 不同色彩系统
- 不同媒介气质

建议让设计工具输出：

- 同一页面的 `VHS-Tape` 版本
- 同一页面的 `ROM-CD` 版本

#### Skin A: VHS-Tape

中文名：

- VHS-Tape

关键词：

- vaporwave
- chinese retrocore
- damaged tape
- damaged receiver
- tropical memory
- warm signal inside a cold room

气质总结：

- 更情绪化
- 更私密
- 更像“深夜卧室里截获到的热信号”
- 带一点做旧、褪色、情绪颗粒感

建议主色关系：

- 深紫黑 / 葡萄酒黑 / 暗梅色作为底
- 霓虹粉、热珊瑚、冷青、金黄作为信号色
- 可以混入一点旧瓷砖米白、旧红布条、潮湿青绿

建议色彩印象：

- 冷底：`deep plum`, `wine black`, `night purple`, `oxidized teal`
- 热点：`vapor pink`, `coral red`, `sunset orange`, `signal cyan`, `warm gold`

页面表现建议：

- 背景更深
- 对比更戏剧化
- 允许更明显的热信号闪现
- 更适合 Home、Archive、Store、Break Slicer

材质建议：

- VHS
- CRT glow
- 旧磁带封套
- 磨损塑料
- 被重新采样的热带录像

不要做成：

- 单纯霓虹 synthwave 海报
- 纯紫粉赛博风
- 过于梦幻少女化的 vaporwave

#### Skin B: ROM-CD

中文名：

- ROM-CD

关键词：

- millennium
- win95
- cold blue interface
- silver desktop shell
- device panel
- clean signal system

气质总结：

- 更理性
- 更设备化
- 更像“未来感冷蓝桌面 + Win95 银灰面板”
- 是技术乐观主义这一面的显性表达

建议主色关系：

- 冷蓝底
- 深海军蓝到灰蓝的层次背景
- Win95 银灰作为卡片和面板主色
- 蓝、绿、橙作为主要功能高亮色

建议色彩印象：

- 冷底：`cold navy`, `digital blue`, `graphite blue`
- 面板：`win95 silver`, `steel gray`, `soft desktop gray`
- 高亮：`electric blue`, `system green`, `signal orange`

页面表现建议：

- 背景更冷、更硬
- 卡片像系统窗口或设备外壳
- 色彩更结构化，不要满屏霓虹
- 更适合 Lab、Breakbeat Generator、Music Theory Keyboard

材质建议：

- old operating system window chrome
- silver chassis
- desktop grid
- monitor glow
- simple plastic buttons

不要做成：

- 过亮的 Frutiger Aero 首页
- 过多泡泡、果冻玻璃、蓝天白云
- 纯企业科技官网

#### 两套皮肤的共同约束

- 都必须保留 `binbox` 的“卧室制作人 + 虚拟避难所”人格
- 都必须支持中英文
- 都必须避免 SaaS / dashboard 感
- 都必须保持内容优先
- 都必须让 Lab 页面看起来像工具，而不是营销模块

#### 两套皮肤的差异摘要

VHS-Tape 更偏：

- 夜晚
- 情绪
- 热信号
- 私人记忆
- 被重新采样的商业文化残影

ROM-CD 更偏：

- 冷蓝
- 系统界面
- 设备面板
- 千禧技术乐观主义
- Win95 银灰操作台

#### 输出要求

如果 UI 工具支持变体，请至少输出：

- Home x 2 皮肤
- Lab Index x 2 皮肤
- Break Slicer x 2 皮肤
- Store x 2 皮肤

这样可以最快看出两套皮肤是否真的成立，而不是只换背景色。

### 4.2 排版建议

- 标题要有个性，但不要难读
- 正文保持高可读性
- 英文可以偏窄体、工业感、电子感
- 正文不要使用过于装饰性的字体

### 4.2.1 字体气质建议

建议采用“双系统排版”：

- 标题系统：冷、硬、设备感、带一点未来工业气
- 正文系统：中性、清晰、适合长文阅读

如果 UI 工具支持风格指定，标题可以朝以下方向理解：

- hardware label
- receiver panel
- late 90s tech editorial
- club flyer meets operating manual

避免：

- 过于可爱的圆润科技字体
- 纯赛博朋克黑客字体
- 过于时装杂志化的高反差 serif

### 4.3 元素风格建议

- 边框可以多于阴影
- 线性结构优于厚重卡片
- 按钮可以像设备按钮或磁带标签
- 状态高亮应明确但克制

### 4.3.1 组件形态建议

#### 按钮

- 像 transport control、设备按钮、录音机按键
- 支持小写标签或机械感 uppercase
- hover 和 active 要像“信号被接通”

#### 卡片

- 更像仪器面板、档案盒标签或录像封套
- 不要厚重投影
- 可以有细边框、编号、小型 meta 信息

#### 输入与滑杆

- 类音频设备控制面板
- 滑杆、旋钮、数值显示要有仪器感

#### 标签

- 更像频道标签 / 文件夹标签 / 采样标记
- 不要做成标准博客 tag chip 套路

### 4.3.2 动效建议

动效不应是互联网产品常见的“轻盈漂浮感”，更适合：

- 微弱扫描
- 信号闪动
- 某一瞬间的频道切换
- 波形/频率相关的轻微运动
- 按钮触发时像机器接通

避免：

- 大面积弹簧感卡片动画
- 过多漂浮粒子
- 炫技式 3D 旋转

---

## 4.4 文案与人格语气

页面文案应符合“冷淡但有渴望”的人格。

建议语气：

- 简短
- 克制
- 第一人称或设备视角
- 像记录信号、频道、样本、夜间日志

可参考的语气方向：

- “今天在卧室收听到了 1995 年伊比萨岛的信号。”
- “A warm frequency passed through the room.”
- “Recovered from a damaged receiver.”
- “Built for the low-pixel dancefloor.”

不要写成：

- 热情过头的品牌口号
- 互联网产品营销文案
- 太自信、太成功学的自我介绍

---

## 4.5 Moodboard 结构建议

给 UI 工具或设计师时，可以建议按 3 列 moodboard 来理解：

### A 列：冷现实

- 卧室
- 旧屏幕
- 线缆
- Bryce3D 几何
- SNES / Win95 界面
- Boards of Canada 氛围图像

### B 列：媒介层

- VHS 颗粒
- CRT 扫描线
- 示波器
- 故障接收器
- 频道切换
- 模拟/数字噪声

### C 列：热幻象

- 90s 广告
- 海岛度假录像
- 秀场、舞池、肉身、太阳光泽
- Kylie / Janet Jackson 式华丽流行文化体温

中间的“媒介层”是最重要的，它决定项目不会滑向纯怀旧拼贴。

---

## 5. 各页面 UI 结构

## 5.1 Home

### 页面目标

- 作为品牌入口
- 快速传达 binbox 是什么
- 引导进入 Music / Lab / Archive / Store

### 建议结构

1. Hero 区
- 品牌 eyebrow
- 大标题
- 一段项目说明
- 两个主 CTA：
  - `Enter the Lab`
  - `Listen`

2. Mission 区
- 一段关于项目方法论/气质的说明
- 可以配合简洁 list 或 statement blocks

3. Featured Links 区
- 3 个入口即可：
  - Breakbeat Lab
  - Articles Archive
  - Store Preview

### 设计要求

- 内容优先
- 单列为主
- 可以有少量图形背景，但不要压过文字
- Hero 背后可以出现“损坏接收器接收到热带信号”的视觉暗示
- 首页整体应该是最能体现“卧室里的航海家 / 低像素舞池构建者”人格的一页

---

## 5.2 Music

### 页面目标

- 展示作品、发行、live session、mix 等内容

### 当前阶段

- 结构占位页
- 不需要复杂播放平台深度集成

### 建议结构

1. 页面标题区
- eyebrow
- title
- 简短介绍

2. Release List 区
- 以时间顺序或精选方式展示作品
- 每个 item 包含：
  - cover
  - title
  - short description
  - platform / status / year

3. Track Info 预留模块
- 为未来 AI 分析预留视觉版位
- 字段示意：
  - BPM
  - Key
  - Mood Tags

### 设计要求

- 更像艺术家作品目录，而不是音乐平台 UI
- 强调内容陈列和气质统一
- 作品封面与分析信息可以呈现“冷架构里突然出现热信号”的结构

---

## 5.3 Lab

### 页面目标

- 作为核心交互区入口
- 展示多个实验模块

### 建议结构

1. 标题区
- eyebrow
- title
- description

2. 实验模块入口区
- 3 个模块：
  - Breakbeat Generator
  - Break Slicer
  - Music Theory Keyboard

### 卡片建议

每个模块卡片包含：

- 名称
- 一句描述
- “Launch” 或类似 CTA

### 布局建议

- 可用双列或不规则布局
- 这是少数可以更“器材感”的页面
- 但仍需克制，不要变成游戏大厅
- 这个页面应该像“信号控制台”，而不是普通功能导航页

---

## 5.4 Lab 子页面：Breakbeat Generator

### 页面目标

- 呈现一个可玩的节奏生成器

### 主要 UI 模块

1. 顶部说明区
- eyebrow
- title
- description
- groove note / usage hint

2. 控制区
- Play / Stop
- Generate Pattern
- Export MIDI
- Humanize
- Tempo
- Swing
- Drum Kit

3. 核心序列器区
- 16-step sequencer grid
- 强调节奏格子的可编辑性

### 设计要求

- 看起来像一个浏览器里的鼓机
- 强调 step grid 的可读性与触发反馈
- 控件应像“创作工具”而不是表单
- 页面情绪偏“冷”，热感主要通过激活状态和节奏反馈出现

---

## 5.5 Lab 子页面：Break Slicer

### 页面目标

- 呈现 break sample 的切片与重排工具

### 主要 UI 模块

1. 顶部说明区
- eyebrow
- title
- description
- 当前 slice order 摘要

2. Waveform 区
- 大波形区域
- 显示切片分段
- 当前激活切片有明显高亮

3. 操作区
- Play / Stop
- Randomize Pattern
- Jungle Chop
- Break Select
- Tempo

4. Slice Grid 区
- 16 格重排区
- 每格可以调整 slice index / pitch

### 设计要求

- 波形区是主视觉焦点
- 页面要有工具台感
- 重点突出“分析-切片-重排”的流程感
- 可以把它设计成整站最强的“媒介层”页面：像在一台旧设备上重新采样舞池记忆

---

## 5.6 Lab 子页面：Music Theory Keyboard

### 页面目标

- 以更直观的方式展示键盘、和弦、调式与五度圈

### 主要 UI 模块

1. 说明区
- title
- description

2. 可视化区
- Circle of Fifths
- Piano Keyboard

3. 控制区
- play mode
- chord/mode selection
- interaction hint

### 设计要求

- 视觉上比前两个实验更“学习工具”
- 保持音乐理论可视化的清晰度

---

## 5.7 Archive 列表页

### 页面目标

- 作为文章内容中枢
- 承载教程、制作思考、创意写作

### 建议结构

1. 标题区
- eyebrow
- title
- description

2. 文章列表区
- 单列文章列表
- 每个条目包含：
  - title
  - date
  - description
  - tags（可选）

### 设计要求

- 更像独立出版物 / journal / archive
- 不要做成博客平台模板感太重的列表
- 文章列表应有“私人档案馆 / 信号日志”的感觉

---

## 5.8 Archive 详情页

### 页面目标

- 提供高可读性的长文阅读体验

### 建议结构

1. 文章头部
- title
- date
- tags
- description

2. 正文区
- MDX 文章主体
- 预留内嵌 React 组件位置

3. 相关文章区（可选）
- 2-3 个相关文章链接

### 设计要求

- 单列排版
- 优先阅读体验
- 正文容器宽度控制良好
- 文章页允许少量“仪器注释”式装饰，但不要破坏阅读

---

## 5.9 Store 列表页

### 页面目标

- 展示 sample pack / preset pack / tutorial 等商品
- 当前不接支付

### 建议结构

1. 标题区
- eyebrow
- title
- description

2. 商品列表区
- 2 列或自适应卡片布局
- 每个商品卡片包含：
  - cover image
  - type
  - price
  - title
  - description
  - Buy button（非功能）

### 设计要求

- 更像艺术型数字商品展示
- 不要过度电商化
- 视觉上可以更接近“采样档案封套”而不是标准电商卡片

---

## 5.10 Store 详情页

### 页面目标

- 展示单个商品详情与视觉氛围

### 建议结构

1. Hero 区
- product image
- title
- type
- price
- short description
- Buy button

2. Detail 区
- longer description
- feature list
- future data insights placeholder

### 未来增强预留

- BPM 分布
- key 分布
- 风格标签

---

## 5.11 About

### 页面目标

- 呈现创作者身份
- 提供联系入口

### 建议结构

1. 标题区
- eyebrow
- title
- description

2. 正文区
- 个人背景
- 创作方向
- binbox 的由来 / 方法

3. 联系区
- Email
- GitHub
- Social

### 设计要求

- 更像作者页 / manifesto
- 不要太“简历页”
- 应该让人感受到“社恐者的内心狂欢”这一人格张力

---

## 6. 响应式要求

### 移动端

- Header 仍然要可用
- 导航可以横向滚动，不强制 burger menu
- 内容页保持单列
- Lab 工具页的控制区允许垂直堆叠

### 桌面端

- 内容页优先阅读舒适度
- 实验页可以更宽
- 保证波形、grid、控制面板有足够空间

---

## 7. 组件级设计优先级

如果 UI 工具只输出部分页面，请优先：

1. `Home`
2. `Lab`
3. `Break Slicer`
4. `Store`
5. `Archive Article`

因为这些页面最能定义整体设计语言。

---

## 8. 交给 UI 工具的建议提示词

可以把下面这段直接交给 Stitch 一类工具：

```md
Design a bilingual-ready website UI for "binbox", a 90s digital nostalgia themed music creation and web audio experiment project.

The website structure is:
- Home
- Music
- Lab
- Archive
- Store
- About

Visual direction:
- minimal
- restrained
- content-first
- 90s digital memory
- VHS / CRT / PS1 atmosphere
- techno-optimism mixed with apocalyptic distance
- cold bedroom producer reality + hot dancefloor fantasy
- a damaged receiver picking up future signals
- artist website + experimental music lab
- not SaaS
- not dashboard
- not startup landing page

Emotional contrast:
- cold: lonely room, old devices, oscilloscope, Bryce3D geometry, low-pixel interfaces
- hot: 90s catwalk, disco body heat, tropical vacation tapes, saturated pop glamour
- the UI should connect those two worlds instead of choosing one

Media treatment:
- hot imagery should be filtered through cold media
- use broken receiver, CRT, VHS, scanline, waveform, channel-switching aesthetics
- make warm colors feel like intercepted signals, not full-page neon

Create two visual skins using the same structure:

Skin A: VHS-Tape
- dark plum / wine black background
- vaporwave + chinese retrocore + damaged tape atmosphere
- signal colors: pink, coral, cyan, warm gold
- emotional, intimate, nocturnal, memory-heavy
- feels like a damaged receiver picking up hot tropical signals in a bedroom

Skin B: ROM-CD
- cold blue / dark monitor background
- win95 silver-gray panels and device shells
- highlight colors: blue, green, orange
- more rational, device-like, millennial, system-oriented
- feels like a futuristic control desktop with early operating system language

Important:
- both skins must keep the same site structure
- do not generate a generic SaaS redesign
- do not make the skins differ only by background color
- the component shapes, color balance, and mood should also shift between skins

Need page structures for:
- Home
- Lab index
- Breakbeat Generator tool page
- Break Slicer tool page
- Archive list
- Archive article detail
- Store list
- Store product detail
- About

Constraints:
- reading pages should feel narrow and editorial
- tool pages can be wider and more instrument-like
- navigation should include locale switcher and theme switcher
- preserve strong typography and clear hierarchy
- avoid excessive card stacking
- avoid purple default AI style
- avoid generic cyberpunk and generic startup Y2K
- make it feel like a virtual shelter built by a bedroom producer in 1995
```

---

## 9. UI 设计稿返回给 Codex 时，请附带这些信息

为了让设计稿更容易落地实现，请在把 Stitch/Figma 结果交回开发时，一并提供：

1. 哪些页面已完成设计
2. 每个页面的主要模块划分
3. 色板
4. 字体建议
5. 按钮 / 卡片 / 边框 / 输入控件风格
6. 移动端与桌面端各一版关键页面
7. 如果有设计链接，附 Figma / Stitch 链接

如果设计工具能导出组件说明，建议同时提供：

- Header
- Footer
- Section heading
- CTA button
- Product card
- Archive list item
- Lab tool panel

这样 Codex 可以更快把设计图还原成真实代码。
