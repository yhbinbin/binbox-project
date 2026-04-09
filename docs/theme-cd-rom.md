# ROM-CD Theme Reference

本文件只描述 `ROM-CD` 主题本身，不重复站点业务和页面 IA。

配套文档：

- 业务需求：`docs/BUSINESS_REQUIREMENTS.md`
- 开发说明：`docs/AI_DEVELOPMENT_GUIDE.md`
- UI 结构：`docs/UI_STRUCTURE_FOR_DESIGN_TOOLS.md`

---

## 1. Theme Position

`ROM-CD` 代表 `binbox` 里更理性、更设备化、更系统界面的一面。

一句话：

> 冷蓝系统底上的银灰设备壳体。

它应该让人联想到：

- 千禧年前后的系统桌面
- Win95 / 早期数字硬件
- 银灰机壳
- 深色内容屏
- 控制台与工作站

---

## 2. Core Mood

关键词：

- cold blue
- silver chassis
- digital terminal
- millennium control room
- win95 shell
- restored workstation

它不是：

- 过亮的 Frutiger Aero 首页
- 云朵泡泡式 nostalgia
- 企业科技官网

---

## 3. Surface Logic

`ROM-CD` 的核心不是“冷蓝色”，而是“壳体与屏幕”的层次。

采用五层结构：

1. `Backdrop`
2. `Shell`
3. `Raised Silver`
4. `Dark Button`
5. `Content Screen`

## 3.1 Text Rules

银灰底：

- `Shell`
- `Raised Silver`

只允许：

- 黑
- 深蓝
- 深绿

深色底：

- `Backdrop`
- `Dark Button`
- `Content Screen`

只允许：

- 白
- 亮绿
- 亮橙
- 银灰
- 亮蓝

禁止：

- 银灰底灰字
- 银灰底亮绿字
- 银灰底亮橙字
- 深色底深蓝字

---

## 4. Material Direction

## 4.1 Shell

- 银灰外壳
- 有机身壳体感
- 可有轻微 bevel
- 不要太锋利到割手

## 4.2 Raised Silver

- 壳体上更突起的金属/塑料银色件
- 比 `Shell` 更亮一点
- 适合按钮、条块、切换块

## 4.3 Dark Button

- 壳体上的黑色或深灰凸起按钮
- 像橡胶按键或深色功能键

## 4.4 Content Screen

- 凹陷进去的深色显示区
- 像小 CRT / LCD / 设备读数窗

---

## 5. Color Direction

主关系：

- 冷蓝底
- 银灰壳体
- 深色屏幕
- 蓝、绿、橙做信号高亮

使用原则：

- 大面积用冷底和银灰
- 亮蓝用于系统强调
- 亮绿用于状态/激活
- 亮橙用于提示/参数变化

---

## 6. Shape And Texture

- 可有小圆角，但不要过软
- 不走玻璃感
- 优先机壳、窗口、嵌入式面板
- 可以有微弱网格、微弱显示器辉光

适合：

- `Lab`
- `Breakbeat Generator`
- `Music Theory Keyboard`
- 一部分 `Lab Index`

---

## 7. Motion

- 反应应短、直接、机械
- hover 以轻微亮度变化和边框变化为主
- active 像设备被按下
- 避免漂浮感太强的动画

---

## 8. Quick Checklist

在 `ROM-CD` 下检查：

- 有没有银灰底灰字
- 有没有银灰底亮绿/亮橙字
- 有没有深色屏里混入深色字
- 有没有字号低于 `12px`
- 有没有壳体和屏幕看起来像同一层
