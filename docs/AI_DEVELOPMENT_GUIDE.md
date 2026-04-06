# binbox AI 协作开发说明书

本说明书用于让 Copilot、Codex、Claude、Cursor 等 AI 工具更快理解 `binbox` 项目，并在修改代码时遵守当前工程边界。

## 1. 项目定位

- 项目名：`binbox`
- 形态：monorepo
- 前端：Next.js App Router + TypeScript + TailwindCSS
- 后端：FastAPI
- 共享类型：TypeScript contract package
- 风格方向：90s 数字怀旧语境下的音乐创作与 Web Audio 交互实验网站

当前阶段目标不是把所有需求一次性做完，而是持续完善：

- 品牌型内容站点
- 浏览器内声音实验模块
- 文章内容中枢
- 无支付的商店展示
- 为音频分析与 AI 辅助预留后端能力

## 2. 仓库结构

```text
binbox-project/
├─ apps/
│  ├─ web/              # Next.js 前端
│  └─ api/              # FastAPI 后端
├─ packages/
│  └─ contract/         # 前后端共享 TS 契约
├─ docs/
│  └─ AI_DEVELOPMENT_GUIDE.md
├─ package.json
└─ README.md
```

## 3. AI 修改代码时的总原则

### 3.1 优先维护现有信息架构

前端正式顶层结构只有：

- `Home`
- `Music`
- `Lab`
- `Archive`
- `Store`
- `About`

对应路由：

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

不要重新引入或恢复为顶层正式路由：

- `samples`
- `tutorials`

它们当前不属于正式 IA。

### 3.2 优先在“活跃目录”里改代码

当前活跃目录：

- `apps/web/src/app/[locale]`
- `apps/web/src/components`
- `apps/web/src/lib`
- `apps/web/src/messages`
- `apps/web/content/archive`
- `apps/api/app/api`
- `apps/api/app/services`
- `apps/api/app/schemas`
- `apps/api/app/repositories`
- `packages/contract/src`

历史或非主路径目录：

- `apps/web/src/_legacy`
- `apps/web/src/app-binbox`
- `apps/api/app/api/auth`
- `apps/api/app/api/orders`
- `apps/api/app/api/posts`
- `apps/api/app/api/products`
- `apps/api/app/api/remix`
- `apps/api/app/api/samples`
- `apps/api/app/api/users`

这些目录当前不是主开发入口。除非是专门整理遗留结构，否则不要把新功能继续加进去。

### 3.3 优先保持“前端内容站 + 后端引擎层”的边界

- `apps/web` 负责页面、交互、内容、i18n、浏览器端音频体验
- `apps/api` 负责音频分析、AI 辅助、推荐、轻量内容接口
- `packages/contract` 负责共享接口结构

不要把复杂业务逻辑塞进：

- Next.js page 文件
- FastAPI route 文件

推荐结构：

- 页面只负责展示和页面级数据组织
- React 组件负责 UI 和交互
- 前端音频逻辑放 `apps/web/src/lib/audio`
- FastAPI route 只负责入参与出参
- 核心处理逻辑放 `apps/api/app/services`

## 4. 前端说明

### 4.1 前端主目录

- `apps/web/src/app/[locale]`: 页面路由
- `apps/web/src/components`: 组件
- `apps/web/src/components/lab`: Lab 实验模块
- `apps/web/src/lib/audio`: Tone.js、WaveSurfer.js 等音频逻辑
- `apps/web/src/lib/api`: 前端 API 调用封装
- `apps/web/src/messages`: 中英文本
- `apps/web/content/archive`: MDX 文章内容
- `apps/web/public`: 图片、音频等静态资源

### 4.2 国际化要求

使用 `next-intl`，所有新增页面和公共文案都要同时维护：

- `apps/web/src/messages/en.json`
- `apps/web/src/messages/zh.json`

新增文案时：

1. 同时补英文和中文
2. 保持 key 结构一致
3. 不要在页面里硬编码 Header、按钮、说明文字

### 4.3 页面风格要求

整体风格：

- 极简
- 克制
- 内容优先
- 避免过度卡片化
- 内容页容器偏窄，阅读优先

AI 生成 UI 时不要：

- 引入复杂 dashboard 风格
- 过多分栏和重卡片布局
- 为了“炫”而破坏可读性

### 4.4 Archive 内容规则

目录：

- `apps/web/content/archive/*.mdx`

Frontmatter 关注字段：

- `title`
- `date`
- `tags`
- `description`

新增文章时：

- 文件名建议 `YYYY-topic-keyword.mdx`
- 内容结构优先采用：背景 / 方法 / 示例 / 反思

## 5. 后端说明

### 5.1 后端定位

`apps/api` 不是传统业务后台，当前主要是“引擎层”：

- 音频分析
- AI 创作辅助
- 推荐和标签分析
- 内容数据接口

### 5.2 后端主目录

- `apps/api/app/api`: 路由层
- `apps/api/app/services`: 功能逻辑层
- `apps/api/app/schemas`: Pydantic 输入输出结构
- `apps/api/app/repositories`: 数据源适配层
- `apps/api/app/core`: 配置和日志
- `apps/api/app/db`: DB 基础设施

### 5.3 当前活跃 API 入口

根据 `apps/api/app/api/router.py`，当前正式接入的路由是：

- `archive`
- `store`
- `audio`
- `ai`
- `recommendations`
- `tags`
- `health`

如果 AI 要新增一个后端能力，优先加到这些现有模块，或者按同样模式新增新模块。

### 5.4 后端编码规则

新增接口推荐顺序：

1. 在 `schemas` 里先定义输入输出结构
2. 在 `services` 里实现核心逻辑
3. 在 `api/.../routes.py` 里暴露 HTTP 接口
4. 如果前端也要共享这个结构，再补到 `packages/contract`

不要直接在 route 文件里写大段业务逻辑。

## 6. 共享契约包说明

目录：

- `packages/contract/src`

用途：

- 定义前后端共享的 TypeScript 类型
- 让前端请求和后端返回的数据结构更一致

适合放这里的内容：

- `AudioAnalyzeResponse`
- 文章摘要结构
- Store Item DTO
- 推荐结果 DTO

不适合放这里的内容：

- React 组件
- FastAPI schema
- 依赖具体框架运行时的代码

## 7. 新功能应该放哪里

### 7.1 纯展示型功能

放 `apps/web`

例子：

- 首页改版
- 新增文章页样式
- Store 页面视觉优化

### 7.2 前端交互型功能

放 `apps/web`

例子：

- Break Slicer 前端操作增强
- Music Theory Keyboard UI 调整
- 浏览器内纯前端声音实验

### 7.3 Python 计算型功能

放 `apps/api`

例子：

- BPM 检测
- key 检测
- onset / slice 检测
- AI 生成描述

### 7.4 前后端联动功能

需要同时改：

- `apps/api`
- `apps/web`
- 必要时 `packages/contract`

推荐顺序：

1. 先想清楚接口结构
2. 后端先实现返回
3. 前端再接入和渲染
4. 如果多个页面都用，抽到 `contract`

## 8. AI 处理常见任务时的建议流程

### 8.1 新增一个 Lab 实验页面

建议步骤：

1. 在 `apps/web/src/app/[locale]/lab/...` 下建新页面
2. 在 `apps/web/src/components/lab/...` 下建对应组件
3. 在 `apps/web/src/messages/en.json` 和 `zh.json` 增加文案
4. 在 `apps/web/src/app/[locale]/lab/page.tsx` 增加入口
5. 如果需要后端能力，再补 `apps/api`

### 8.2 新增一个音频分析接口

建议步骤：

1. 在 `apps/api/app/schemas/audio.py` 定义 schema
2. 在 `apps/api/app/services/audio` 里写逻辑
3. 在 `apps/api/app/api/audio/routes.py` 暴露接口
4. 如果前端要复用响应结构，在 `packages/contract/src/audio` 补 TS 类型
5. 前端在 `apps/web/src/lib/api` 增加调用封装

### 8.3 新增一篇 Archive 文章

建议步骤：

1. 在 `apps/web/content/archive` 新建 `.mdx`
2. 写 frontmatter
3. 确认 `/archive` 和 `/archive/[slug]` 能读到内容

## 9. 本项目的运行方式

在仓库根目录：

```bash
npm install
npm run dev:web
npm run lint:web
npm run build:web
```

后端：

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

根目录也提供了：

```bash
npm run dev:api
```

默认前端：

- `http://localhost:3000`

默认后端文档：

- `http://localhost:8000/docs`

## 10. AI 在提交代码前应做的检查

前端改动后至少检查：

```bash
npm run lint:web
```

如果改了 TS 结构，最好同时确认：

- 页面导入路径是否仍正确
- i18n key 是否中英文都补齐
- 是否误把新代码写进 `_legacy` 或历史目录

后端改动后至少检查：

```bash
cd apps/api
python3 -m compileall app
```

如果改了 API：

- 路由是否已挂到 `apps/api/app/api/router.py`
- schema 是否和返回结构一致
- 前端调用路径是否对应更新

## 11. AI 不应做的事情

- 不要恢复 `samples`、`tutorials` 为顶层正式路由
- 不要把新代码继续写入 `_legacy` 或 `app-binbox`
- 不要把大段业务逻辑塞进 page 或 route 文件
- 不要只改一种语言文案
- 不要新增账户、订单、支付等当前阶段明确非目标的系统
- 不要擅自把项目改造成“后台管理系统”风格

## 12. 给 AI 的简短上下文模板

当你把本项目交给其他 AI 时，可以先提供这段上下文：

```md
这是一个 monorepo：
- apps/web: Next.js App Router 前端
- apps/api: FastAPI 后端
- packages/contract: 前后端共享 TS 类型

正式前端 IA 只有：
Home / Music / Lab / Archive / Store / About

当前活跃前端目录：
- apps/web/src/app/[locale]
- apps/web/src/components
- apps/web/src/lib
- apps/web/src/messages
- apps/web/content/archive

当前活跃后端目录：
- apps/api/app/api
- apps/api/app/services
- apps/api/app/schemas
- apps/api/app/repositories

不要把新代码写进：
- apps/web/src/_legacy
- apps/web/src/app-binbox
- apps/api/app/api/products 等历史残留目录

新增功能时优先保持：
- 前端负责页面与交互
- 后端负责音频分析和 AI 能力
- 共享结构放 packages/contract
```

---

如果后续仓库结构再调整，这份文档也应同步更新，否则 AI 很容易根据过期目录继续往错误位置写代码。
