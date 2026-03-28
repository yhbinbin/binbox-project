# binbox monorepo

这是一个前后端同仓库的 monorepo，分成 3 个部分：

- `apps/web`: Next.js 前端，负责页面、i18n、MDX 内容、Web Audio 交互
- `apps/api`: FastAPI 后端，负责音频分析、AI 辅助、内容接口
- `packages/contract`: 前后端共享的 TypeScript 契约类型

## 你可以怎么理解这个仓库

如果你之前主要做前端，可以把它理解成：

- `apps/web` = 你熟悉的站点工程
- `apps/api` = 给前端提供 JSON 数据和计算能力的 Python 服务
- `packages/contract` = 前后端共用的数据类型定义，避免接口字段各写各的

monorepo 的好处是：页面、接口、共享类型都在一个仓库里，改功能时不需要在多个 repo 之间来回切换。

## 当前目录结构

```text
binbox-project/
├─ apps/
│  ├─ web/
│  └─ api/
├─ packages/
│  └─ contract/
├─ package.json
└─ README.md
```

## 第一次运行前要做什么

### 1. 前端依赖

在仓库根目录执行：

```bash
npm install
```

这会安装 `apps/web` 和 `packages/contract` 需要的 Node 依赖。

### 2. 后端依赖

建议先创建 Python 虚拟环境：

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

以后每次启动后端前，先进入 `apps/api` 并激活虚拟环境：

```bash
cd apps/api
source .venv/bin/activate
```

## 如何运行项目

### 只跑前端

在仓库根目录执行：

```bash
npm run dev:web
```

默认会启动在 `http://localhost:3000`。

### 只跑后端

在仓库根目录执行：

```bash
npm run dev:api
```

默认会启动 FastAPI 开发服务，接口文档通常在：

```text
http://localhost:8000/docs
```

### 前后端一起开发

开两个终端窗口：

终端 1：

```bash
cd /Users/yanghongbin/binbox-project
npm run dev:web
```

终端 2：

```bash
cd /Users/yanghongbin/binbox-project/apps/api
source .venv/bin/activate
cd /Users/yanghongbin/binbox-project
npm run dev:api
```

你也可以不用根脚本，直接进入各自目录运行原生命令：

- 前端：`cd apps/web && npm run dev`
- 后端：`cd apps/api && uvicorn app.main:app --reload`

## 常用命令

在仓库根目录执行：

```bash
npm run dev:web
npm run build:web
npm run lint:web
npm run dev:api
```

含义：

- `dev:web`: 启动 Next.js 前端开发环境
- `build:web`: 构建前端生产包
- `lint:web`: 检查前端代码规范和常见问题
- `dev:api`: 启动 FastAPI 开发服务

## 后续加功能时怎么做

你可以按“功能属于哪一层”来判断放哪里。

### 1. 只改页面展示

放在 `apps/web`：

- 页面路由：`apps/web/src/app/[locale]`
- 组件：`apps/web/src/components`
- 文案：`apps/web/src/messages`
- 样式和主题：`apps/web/src/styles`、`apps/web/src/lib/theme`

例子：

- 新增 `/zh/music` 页面展示结构
- 调整 Header
- 新增 Store 卡片样式

### 2. 只改内容

还是放在 `apps/web`：

- Archive 内容：`apps/web/content/archive/*.mdx`
- 商品静态数据：目前在 `apps/web/src/lib/store.ts`

例子：

- 新增文章
- 修改商品描述
- 调整首页文案

### 3. 需要前端交互，但不需要后端

放在 `apps/web` 的实验模块里：

- `apps/web/src/components/lab`
- `apps/web/src/lib/audio`
- `apps/web/src/store`

例子：

- 调整 Break Slicer 的前端交互
- 增加 Tone.js 参数控制
- 新增纯浏览器端的小实验

### 4. 需要 Python 计算能力

放在 `apps/api`：

- 路由：`apps/api/app/api`
- 逻辑：`apps/api/app/services`
- 数据结构：`apps/api/app/schemas`

例子：

- `/api/audio/analyze`
- `/api/audio/slice`
- `/api/ai/describe`

推荐流程：

1. 先在 `schemas` 定义输入输出。
2. 再在 `services` 写核心逻辑。
3. 最后在 `api/.../routes.py` 暴露接口。

### 5. 前后端都要改

推荐顺序：

1. 先定义接口返回什么数据。
2. 如果前后端都要引用这个结构，就补到 `packages/contract`。
3. 后端先把接口跑通。
4. 前端再调用接口并渲染。

这样不会出现前端先乱写字段、后端再追着改的情况。

## 一个典型新功能该怎么加

以“新增 Audio Analyzer 页面”为例：

1. 前端先加页面路由  
   `apps/web/src/app/[locale]/lab/audio-analyzer/page.tsx`
2. 前端加组件  
   `apps/web/src/components/lab/audio-analyzer`
3. 后端加接口  
   `apps/api/app/api/audio/routes.py`
4. 后端加分析逻辑  
   `apps/api/app/services/audio`
5. 如果接口结构会被前端复用，就补到  
   `packages/contract`

## 内容和资源放哪

- Archive 文章：`apps/web/content/archive/*.mdx`
- 前端静态资源：`apps/web/public`
- 前端页面：`apps/web/src/app/[locale]`
- 前端组件：`apps/web/src/components`
- 后端代码：`apps/api/app`

## 当前约定

- 顶层正式信息架构是：`Home / Music / Lab / Archive / Store / About`
- `samples`、`tutorials` 目前不作为顶层路由
- 后端对外 Store 接口使用 `/api/store`，与前端 `/store` 语义保持一致

## Git 远程

当前仓库 `origin` 使用的是 SSH：

```text
git@github.com:yhbinbin/binbox-project.git
```
