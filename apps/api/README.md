# binbox api

`apps/api` 是 `binbox` 的 Python engine layer。它不是传统账户、订单后台，而是给前端站点提供音频分析、AI 辅助、内容数据和轻量推荐能力。

## 目录定位

- `app/api`: HTTP 路由层，只做入参解析、响应组织和路由编排
- `app/services`: 具体能力实现，按 `audio`、`ai`、`content`、`recommendations`、`tags` 分组
- `app/schemas`: 对外 JSON 契约
- `app/repositories`: 数据读取和适配层
- `app/core`: 配置、日志等基础设施
- `app/db`, `alembic`: 数据库基础设施与迁移

当前保留了少量数据库和产品模型目录，但仓库的主设计目标仍然是“计算与内容引擎”，不是业务系统。

## 当前项目分层

项目主目录下最关键的是 `app/`，这里放的是实际运行的后端代码。

### `app/api`

这一层负责“对外暴露接口”。

你可以把它理解成网站后端的门面层：

- 接收 HTTP 请求
- 读取路径参数、查询参数、上传文件、JSON 请求体
- 调用下一层的 service
- 把结果按统一格式返回给前端

例如：

- `/api/audio/analyze`
- `/api/store`
- `/api/archive`

这层一般不应该写复杂业务逻辑。它主要负责“接请求”和“回响应”。

### `app/services`

这一层负责“真正的功能逻辑”。

它是这个项目最核心的一层，尤其适合 `binbox` 这种“计算引擎型”后端。

比如：

- `services/audio/`
  负责音频分析、切片点建议、波形数据生成
- `services/ai/`
  负责 chord、描述文案、灵感草案生成
- `services/content/`
  负责文章、商品这些内容服务
- `services/recommendations/`
  负责基于 tag、mood、bpm 做轻量推荐
- `services/tags/`
  负责文本 tag 分析

一句话理解：

`api` 不直接做复杂处理，而是把事情交给 `services`。

### `app/repositories`

这一层负责“拿数据”。

它的职责是把数据来源封装起来，不让 `services` 直接依赖底层细节。

当前仓库里：

- `repositories/content_repository.py`

先用的是内置假数据，方便把接口骨架搭起来。

以后这里可以切换成：

- 读 PostgreSQL
- 读 MDX 生成后的索引
- 读对象存储里的元数据
- 调其他内部服务

一句话理解：

`repository` 负责“从哪里拿数据”，`service` 负责“怎么处理这些数据”。

### `app/models`

这一层是数据库模型定义。

这里用的是 SQLAlchemy model，用来描述数据库表结构，比如：

- `User`
- `Product`
- `Order`

虽然需求文档说当前阶段不重点做传统业务后端，但这些模型保留下来是为了以后扩展数据库能力、迁移和管理内容结构。

一句话理解：

`models` 面向数据库，是“表长什么样”的定义。

### `app/schemas`

这一层是接口数据结构定义。

这里用的是 Pydantic schema，负责：

- 校验请求参数
- 约束返回 JSON 的结构
- 让接口文档更清晰

例如：

- `schemas/audio.py`
  定义音频分析接口返回什么字段
- `schemas/ai.py`
  定义 AI 接口的请求体和响应体
- `schemas/content.py`
  定义文章、商品这些内容对象的返回格式

一句话理解：

`models` 是数据库结构，`schemas` 是 API 结构，这两个不要混在一起。

## 其他关键目录

### `app/core`

放全局基础能力：

- 配置读取
- 日志配置

这里一般不放具体业务逻辑。

### `app/db`

放数据库基础设施：

- SQLAlchemy Base
- 数据库 Session

它是数据库访问的底层支撑。

### `alembic`

放数据库迁移配置。

以后如果你修改了 `models`，就可以通过 Alembic 生成和执行迁移脚本，保证数据库结构和代码一致。

## 一次请求会怎么流动

以前端请求 `POST /api/audio/analyze` 为例：

1. `app/api/audio/routes.py`
   接收上传文件
2. `app/services/audio/engine.py`
   做音频分析逻辑
3. `app/schemas/audio.py`
   把返回值整理成标准 JSON 结构
4. FastAPI
   返回给前端

如果以后这个接口要把分析结果存库，那么流程会变成：

1. `api`
2. `service`
3. `repository`
4. `model/db`
5. 返回 `schema`

## 为什么这样分层

这样拆分的好处是：

- 前端接口不会和底层实现绑死
- 音频算法可以单独替换成 `librosa`
- AI 能力可以从模板逻辑切换到真实 OpenAI API
- 内容数据可以从假数据切换到 PostgreSQL 或 MDX 索引
- 后续加测试时，每一层都更容易单独验证

对 `binbox-api` 来说，最重要的是这个思路：

不要把所有逻辑都写进路由文件里。

路由只负责接请求，核心能力放在 `services`，数据访问放在 `repositories`，数据库结构放在 `models`，接口结构放在 `schemas`。
