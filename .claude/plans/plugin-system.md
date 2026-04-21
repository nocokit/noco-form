# 插件系统设计方案

## 现状分析

当前项目存在三个硬编码瓶颈：
1. `COMP_MAP`（components-form/index.vue）— 组件渲染映射是静态 import
2. `CompType` enum（comp-data.ts）— 组件类型是编译时固定的
3. `form-setting.vue` — 右侧设置面板通过 `v-if` 硬编码每种设置组件

已有的 `registry.ts` 用 `import.meta.glob` 自动加载 JSON 配置，这是个好的起点，但只覆盖了元数据，没有覆盖 Vue 组件和设置面板。

## 设计目标

- 第三方/业务方可以通过一个 `registerPlugin()` 调用注册新组件
- 注册内容包括：渲染组件、配置元数据、设置面板组件、默认配置
- 内置组件也走插件注册流程（统一路径）
- 支持运行时动态加载（`import()` lazy load）

## 实现方案

### 1. 创建核心插件管理器 `src/plugins/pluginManager.ts`

```ts
interface PluginComponentDef {
  type: string                          // 唯一标识，如 'MyWidget'
  name: string                          // 显示名
  label: string
  icon?: string
  category: string                      // 'basic' | 'advanced' | 'show' | ...
  component: Component | (() => Promise<Component>)  // 渲染组件，支持懒加载
  settingComponent?: Component | (() => Promise<Component>)  // 设置面板组件
  defaultConfig: Record<string, any>    // 默认配置
  meta?: {                              // 可选元信息
    isLayoutComp?: boolean
    justShow?: boolean                  // 纯展示，无编辑器
    hasDataList?: boolean               // 是否有选项列表
    hasPlaceholder?: boolean
    validationFormats?: string[]        // 支持的验证格式
  }
}

interface LemonFormPlugin {
  name: string
  components?: PluginComponentDef[]
  install?: (ctx: PluginContext) => void
}
```

核心 API：
- `registerPlugin(plugin: LemonFormPlugin)` — 注册插件
- `registerComponent(def: PluginComponentDef)` — 注册单个组件
- `getComponent(type: string)` — 获取渲染组件（支持 async resolve）
- `getSettingComponent(type: string)` — 获取设置面板组件
- `getComponentDef(type: string)` — 获取完整定义
- `getAllRegisteredComponents()` — 获取所有已注册组件
- `getComponentsByCategory(category: string)` — 按分类获取

### 2. 改造 `registry.ts` — 内置组件走插件注册

将现有的 JSON 配置 + 静态 import 统一迁移为插件注册：
- 创建 `src/plugins/builtinPlugin.ts`，把所有内置组件注册为一个内置插件
- `registry.ts` 改为从 pluginManager 读取，保持 API 兼容

### 3. 改造 `components-form/index.vue` — 动态组件解析

- 移除 `COMP_MAP` 硬编码映射
- `resolvedComp` 改为从 `pluginManager.getComponent(type)` 获取
- 支持异步组件（`defineAsyncComponent`）

### 4. 改造 `form-setting.vue` — 动态设置面板

- 插件注册的 `settingComponent` 会被渲染到设置面板
- 对于没有自定义设置面板的组件，根据 `meta` 自动渲染通用设置项（保持现有逻辑）

### 5. 改造 `comp-data.ts` — 动态组件类型

- `CompType` 保留作为内置类型的枚举
- 新增 `isRegisteredType(type: string)` 判断是否为已注册类型
- `CompListData` 改为从 pluginManager 动态生成

### 6. 改造 `main.ts` — 插件安装入口

```ts
import { createLemonForm } from './plugins/pluginManager'

const lemonForm = createLemonForm()
lemonForm.use(builtinPlugin)       // 内置组件
lemonForm.use(myCustomPlugin)      // 第三方插件
app.use(lemonForm)
```

## 文件变更清单

| 操作 | 文件 | 说明 |
|------|------|------|
| 新建 | `src/plugins/pluginManager.ts` | 插件管理器核心 |
| 新建 | `src/plugins/builtinPlugin.ts` | 内置组件注册 |
| 新建 | `src/plugins/types.ts` | 类型定义 |
| 修改 | `src/components-config/registry.ts` | 代理到 pluginManager |
| 修改 | `src/components-form/index.vue` | 动态组件解析 |
| 修改 | `src/views/FormEditor/form-setting.vue` | 动态设置面板 |
| 修改 | `src/views/FormEditor/comp-data.ts` | 动态类型支持 |
| 修改 | `src/views/FormEditor/comp-config-data.ts` | 从 pluginManager 读取 |
| 修改 | `src/views/FormEditor/comp-list-generator.ts` | 从 pluginManager 生成 |
| 修改 | `src/main.ts` | 插件安装入口 |

## 兼容性策略

- 内置组件全部通过 builtinPlugin 注册，行为不变
- `CompType` enum 保留，内置组件类型不变
- `getDefaultConfig`、`getComponentConfig` 等现有 API 保持兼容
- 渐进式迁移：现有代码可以逐步切换到插件 API
