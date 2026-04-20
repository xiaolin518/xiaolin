## 1. Architecture Design
纯前端架构，使用 React + TypeScript + Vite 构建，通过 Pyodide 在浏览器端运行 Python 代码，无需后端服务器，直接部署到 Cloudflare Pages。

```mermaid
flowchart LR
  A[用户浏览器] --> B[React 前端]
  B --> C[Pyodide 运行时]
  C --> D[Python 代码执行]
```

## 2. Technology Description
- 前端：React@18 + TypeScript + Vite
- 初始化工具：vite-init
- Python 运行时：Pyodide (WebAssembly)
- 代码编辑器：Monaco Editor (VS Code 同款)
- 部署：Cloudflare Pages
- UI 框架：Tailwind CSS
- 状态管理：Zustand
- 路由：React Router

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 首页 - 项目列表 |
| /project/:id | 项目详情页 |

## 4. Data Model
### 4.1 项目数据结构
```typescript
interface Project {
  id: number;
  name: string;
  description: string;
  coreTasks: string[];
  techStack: string[];
  expectedOutput: string[];
  initialCode: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
```

### 4.2 项目分类
- 基础数据处理
- 核心分析方法
- 高级建模与可视化
- 全流程综合
