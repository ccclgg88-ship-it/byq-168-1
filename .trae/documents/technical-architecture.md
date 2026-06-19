## 1. 架构设计

```mermaid
flowchart TB
    "Frontend[Vue3 前端应用]" --> "FilePreview[File Preview API]"
    "Frontend" --> "CSSAnimation[CSS 动画引擎]"
    "Frontend" --> "TagCloud[标签云组件]"
```

纯前端架构，无后端服务依赖。

## 2. 技术说明

- **前端**：Vue3 + TypeScript + Tailwind CSS + Vite
- **初始化工具**：vite-init (vue-ts 模板)
- **后端**：无
- **数据库**：无

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| / | 测评入口主页，包含头像上传、昵称输入、标签云加载态 |

## 4. API定义

不适用（纯前端，无后端API）

## 5. 服务端架构图

不适用

## 6. 数据模型

不适用（纯前端，无持久化数据）

### 核心组件结构

| 组件 | 职责 |
|------|------|
| `App.vue` | 根组件，挂载主页 |
| `AssessmentEntry.vue` | 测评入口页主组件，管理整体状态和流程 |
| `AvatarUpload.vue` | 头像上传组件，处理拖拽/点击上传、圆形预览、大小校验 |
| `NicknameInput.vue` | 昵称输入组件，2-12字符限制，联动按钮状态 |
| `TagCloudLoading.vue` | 标签云加载态组件，全屏遮罩+随机飘动标签 |
| `ToastMessage.vue` | Toast提示组件，自动消失 |

### 状态管理

使用 Vue3 Composition API 的 `ref` / `reactive` 管理组件状态，无需额外状态管理库：

- `avatarUrl`: 头像预览地址
- `avatarFile`: 上传的文件对象
- `nickname`: 昵称文本
- `isLoading`: 是否加载中
- `toastMessage`: Toast提示内容
- `toastVisible`: Toast是否可见
