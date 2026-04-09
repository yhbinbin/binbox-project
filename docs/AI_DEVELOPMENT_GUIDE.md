# binbox AI Development Guide

本文件给 Copilot、Codex、Claude、Cursor 等 AI 协作工具使用。

它不负责讲完整业务背景，而是负责回答三件事：

- 这个仓库现在的真实边界是什么
- 新代码应该写到哪里
- 改 UI 和 Lab 时要遵守哪些约束

配套阅读：

- 业务需求：`docs/BUSINESS_REQUIREMENTS.md`
- UI 设计结构：`docs/UI_STRUCTURE_FOR_DESIGN_TOOLS.md`
- 主题参考：`docs/theme-vhs-tap.md`、`docs/theme-cd-rom.md`

---

## 1. Project Snapshot

- 项目名：`binbox`
- 仓库形态：monorepo
- 前端：Next.js App Router + TypeScript + TailwindCSS
- 后端：FastAPI
- 共享类型：`packages/contract`
- 项目定位：90s 数字怀旧语境下的音乐创作、内容展示与 Web Audio 实验站点

当前阶段不是做“完整商业系统”，而是持续完善：

- 品牌与作品展示
- Lab 交互实验
- Archive 内容中枢
- 无支付的 Store 展示
- 音频分析 / AI 辅助的后端引擎层

---

## 2. Source Of Truth

AI 在改代码前，先以这三份文档为准：

1. `docs/BUSINESS_REQUIREMENTS.md`
   说明项目想做什么、当前非目标是什么
2. `docs/UI_STRUCTURE_FOR_DESIGN_TOOLS.md`
   说明页面结构、视觉人格、主题关系
3. 本文档
   说明代码边界、落点和修改约束

如果三者冲突，优先顺序：

1. 代码当前真实结构
2. `BUSINESS_REQUIREMENTS.md`
3. `UI_STRUCTURE_FOR_DESIGN_TOOLS.md`
4. 本文档中的实现建议

---

## 3. Current IA And Routes

当前正式顶层 IA 只有：

- `Home`
- `Music`
- `Lab`
- `Archive`
- `Store`
- `About`

对应正式路由：

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

不要恢复为正式顶层入口：

- `samples`
- `tutorials`
- 账户、支付、订单、CMS 后台

---

## 4. Monorepo Boundaries

```text
binbox-project/
├─ apps/
│  ├─ web/              # Next.js 前端
│  └─ api/              # FastAPI 后端
├─ packages/
│  └─ contract/         # 共享 TS 类型
├─ docs/
└─ README.md
```

### 4.1 apps/web

负责：

- 页面路由
- 组件
- UI / 主题 / 动效
- i18n
- MDX 内容
- 浏览器内音频交互

### 4.2 apps/api

负责：

- 音频分析
- AI 辅助
- 推荐与标签分析
- 轻量 JSON 接口

### 4.3 packages/contract

负责：

- 前后端共享 TypeScript 数据结构

不要放：

- React 组件
- FastAPI schema
- 依赖具体框架运行时的逻辑

---

## 5. Active Directories

优先修改这些目录：

- `apps/web/src/app/[locale]`
- `apps/web/src/components`
- `apps/web/src/lib`
- `apps/web/src/styles`
- `apps/web/src/messages`
- `apps/web/content/archive`
- `apps/api/app/api`
- `apps/api/app/services`
- `apps/api/app/schemas`
- `apps/api/app/repositories`
- `packages/contract/src`

当前不是新功能主入口的历史/遗留目录：

- `apps/web/src/_legacy`
- `apps/web/src/app-binbox`
- `apps/api/app/api/auth`
- `apps/api/app/api/orders`
- `apps/api/app/api/posts`
- `apps/api/app/api/products`
- `apps/api/app/api/remix`
- `apps/api/app/api/samples`
- `apps/api/app/api/users`

除非用户明确要求清理遗留结构，否则不要继续往这些目录加新东西。

---

## 6. Frontend Rules

### 6.1 i18n

使用 `next-intl`。

新增页面和公共文案时，必须同步维护：

- `apps/web/src/messages/en.json`
- `apps/web/src/messages/zh.json`

不要在页面里硬编码：

- Header 文案
- 按钮文案
- 页面说明文字

### 6.2 Styling

样式目录：

- `apps/web/src/styles/base`
- `apps/web/src/styles/pages`
- `apps/web/src/styles/theme.css`

原则：

- 不要把大量页面样式重新塞回 `globals.css`
- 页面样式优先放入对应 `pages/*.css`
- 共享基础规则放 `base/*.css`
- 主题 token 只放 `theme.css`

### 6.3 Theme Model

当前运行时主题只有两套：

- `VHS-Tape`
- `ROM-CD`

前端 UI 尤其是 Lab 页面，遵守五层语义模型：

1. `Backdrop`
2. `Shell`
3. `Raised Silver`
4. `Dark Button`
5. `Content Screen`

`ROM-CD` 的硬规则：

- 银灰底（`Shell`、`Raised Silver`）只允许深色字
- 深色底（`Backdrop`、`Dark Button`、`Content Screen`）只允许亮色字
- 字号不要小于 `12px`

详细约束见：

- `~/.codex/skills/binbox-theme-guardrails/SKILL.md`
- `docs/theme-vhs-tap.md`
- `docs/theme-cd-rom.md`

### 6.4 Archive Content

文章位置：

- `apps/web/content/archive/*.mdx`

frontmatter 重点字段：

- `title`
- `date`
- `tags`
- `description`

命名建议：

- `YYYY-topic-keyword.mdx`

---

## 7. Backend Rules

### 7.1 API Positioning

`apps/api` 不是传统业务后台，而是引擎层。

重点能力：

- 音频分析
- AI 创作辅助
- 标签 / 推荐
- 内容数据接口

### 7.2 Current Active API Modules

根据当前路由组织，优先使用或扩展：

- `archive`
- `store`
- `audio`
- `ai`
- `recommendations`
- `tags`
- `health`

### 7.3 Recommended API Flow

新增后端能力时：

1. 在 `schemas` 定义输入输出
2. 在 `services` 实现核心逻辑
3. 在 `api/.../routes.py` 暴露接口
4. 如需共享前端类型，再补到 `packages/contract`

不要在 route 文件里堆业务逻辑。

---

## 8. Where New Work Should Go

### 8.1 纯展示改动

放 `apps/web`

例子：

- 首页改版
- Store 视觉优化
- Music 页布局调整

### 8.2 纯前端交互

放 `apps/web`

例子：

- Break Slicer 前端操作优化
- 鼓机交互改造
- 乐理键盘页面 UI / 交互优化

### 8.3 Python 计算能力

放 `apps/api`

例子：

- BPM 检测
- key 检测
- onset / slice 检测
- AI 描述生成

### 8.4 前后端联动

同时改：

- `apps/api`
- `apps/web`
- 必要时 `packages/contract`

推荐顺序：

1. 先想清接口结构
2. 后端先跑通
3. 前端再接入
4. 多处复用的结构再抽到 `contract`

---

## 9. Practical Workflows

### 9.1 新增一个 Lab 子页面

1. 在 `apps/web/src/app/[locale]/lab/...` 建页面
2. 在 `apps/web/src/components/lab/...` 建组件
3. 在 `messages/en.json` 与 `zh.json` 加文案
4. 在 `lab/page.tsx` 增加入口
5. 如需后端能力，再补 `apps/api`

### 9.2 新增一个音频分析接口

1. `apps/api/app/schemas`
2. `apps/api/app/services`
3. `apps/api/app/api/.../routes.py`
4. 需要时补 `packages/contract`
5. 前端在 `apps/web/src/lib/api` 增加调用

### 9.3 新增一篇 Archive 文章

1. 在 `apps/web/content/archive` 新建 `.mdx`
2. 写 frontmatter
3. 确认 `/archive` 与 `/archive/[slug]` 可读取

---

## 10. Pre-Ship Checks

前端改动后至少执行：

```bash
npm run lint:web
npx tsc --noEmit -p /Users/yanghongbin/binbox-project/apps/web/tsconfig.json
```

后端改动后至少执行：

```bash
cd apps/api
python3 -m compileall app
```

并手动检查：

- i18n key 是否中英文都补齐
- 是否误写进遗留目录
- 是否破坏现有 IA
- 是否违背主题规则

---

## 11. Things AI Should Not Do

- 不要恢复 `samples`、`tutorials` 为正式顶层路由
- 不要引入支付、订单、账户系统
- 不要把站点改成 SaaS 仪表盘
- 不要把大段业务逻辑塞进 page 或 route
- 不要只改一种语言文案
- 不要在 Lab 页面随意破坏当前的主题结构语言

---

## 12. Short Context Template For Other AI

```md
This is the `binbox` monorepo.

- apps/web: Next.js App Router frontend
- apps/api: FastAPI backend engine layer
- packages/contract: shared TS contracts

Official IA:
Home / Music / Lab / Archive / Store / About

Official lab routes:
- /{locale}/lab/breakbeat-generator
- /{locale}/lab/break-slicer
- /{locale}/lab/music-theory-keyboard

Do not reintroduce:
- samples
- tutorials
- auth / payment / orders / admin systems

Active frontend directories:
- apps/web/src/app/[locale]
- apps/web/src/components
- apps/web/src/lib
- apps/web/src/styles
- apps/web/src/messages
- apps/web/content/archive

Active backend directories:
- apps/api/app/api
- apps/api/app/services
- apps/api/app/schemas
- apps/api/app/repositories

Theme runtime:
- VHS-Tape
- ROM-CD

UI edits should follow the five-layer model:
Backdrop / Shell / Raised Silver / Dark Button / Content Screen
```
