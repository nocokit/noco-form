# lemon-form 项目记忆

## 项目概述
低代码表单编辑器，Vue 3 + TypeScript + Ant Design Vue + Pinia + Vite

## 核心架构

### 目录结构
- `src/views/FormEditor/` — 编辑器主视图（index.vue, form-setting.vue, form-sidebar.vue）
- `src/components-form/` — 表单渲染组件（base/, contact-information/, advanced/, show/）
- `src/components-form-setting/` — 右侧配置面板组件（base/, form-validation/, data/, common-global-configurations/, show/）
- `src/components-config/*.json` — 组件配置 JSON（registry.ts 自动注册）
- `src/composables/` — 复用逻辑（重构后新增）
- `src/stores/selectCompStore.ts` — Pinia 全局状态

### 数据流
1. 左侧拖拽/点击 → `pageCompList`（FormEditor/index.vue）
2. 点击组件 → `selectCompStore.initCurrentComp()` → 右侧 SettingComp 展示配置
3. 右侧修改 → `selectCompStore.updateCurrentComp()` → watch 同步到 pageCompList
4. pageCompList 变化 → IndexedDB 自动保存

## 重构后的关键文件

### Composables（2024年重构新增）
- `src/composables/useSettingField.ts` — 配置面板字段操作（updateField/updateGlobalField）
- `src/composables/useFormPersistence.ts` — IndexedDB 持久化逻辑
- `src/composables/useCompList.ts` — 组件增删改查和行号更新

### 通用配置面板组件（重构新增）
- `src/components-form-setting/base/SettingInput.vue` — 通用输入字段（label + input/textarea）
- `src/components-form-setting/base/SettingSwitch.vue` — 通用开关行（支持 global 属性更新全局配置）

### 已简化的配置面板组件（现在用 SettingInput/SettingSwitch）
- Title.vue, Description.vue, Placeholder.vue, DividerText.vue, PageSubTitle.vue, PageSubDescription.vue, ButtonText.vue
- Required.vue
- DisplayBtn.vue, DisplaySerialNumber.vue, DisplayDescription.vue, DisplayWaterMark.vue

## 组件注册方式
`components-form/index.vue` 使用静态 `COMP_MAP` 对象（模块初始化时构建一次），不在渲染时重建。

## 配置体系
- JSON 优先：`components-config/*.json` → `registry.ts` 自动注册
- `comp-config-data.ts` 的 `getDefaultConfig()` 优先读 JSON，fallback 到代码内联
- `getFallbackConfig()` 作为安全网保留，新组件应添加 JSON 配置

### 通用配置面板组件（第二轮重构新增）
- `SettingSelect.vue` — 通用下拉选择行（label + a-select），支持 global 属性

### 已简化的配置面板组件（第二轮）
- Position.vue, Size.vue — 用 SettingSelect 替代
- LayoutType.vue — 清理死代码，用 useSettingField
- RateConfig.vue — 移除 onMounted 生成静态数组，改为 Array.from 常量
- NPSConfig.vue — 同上，移除 onMounted
- ValidationCustom.vue — 用 SettingSwitch 替代
- NumberConfig.vue — 修复 a-input-number @change 直接返回数值（非 Event）的 bug
- ValidationFormat.vue — 用 SettingSelect/SettingInput 替代，清理死变量
- AddressPlaceholder.vue — 用 SettingInput 替代
- DividerBorderType.vue — 修复错误调用 updateGlobalFormConfig（应为 updateCurrentComp）
- show/FormTitle.vue — 完全用三个通用组件替代

## 已修复的 Bug（第二轮）
- Preview/index.vue: getSize/getLineheight 错误访问 props.pageFooter?.value → 改为计算属性直接访问
- DividerBorderType: 错误调用全局配置更新 → 修复为组件配置更新
- NumberConfig: a-input-number @input 用 event.target.value → 改为 @change 直接拿数值
- comp-icon.ts: 用 as const + IconKey 类型替换消费侧 (Icon as any)[key]

### 通用联系信息组件（第三轮重构新增）
- `ContactInput.vue` — 带 icon 的通用 a-input（`src/components-form/contact-information/`）
- Name/Phone/Email/WX/IdCard/TelePhone 均改为封装 ContactInput，仅传不同 icon

### 可编辑列表 Composable（第三轮重构新增）
- `src/composables/useEditableList.ts` — `deleteSubItem/changeValue/_updateKey`
- Radio.vue 和 Checkout.vue 均使用此 composable，消除重复逻辑和直接 props 变异

### Store 简化（第三轮）
- 删除 `getCurrentCompConfig()` 和 `getGlobalFormConfig()` — 只是返回已公开的 computed ref，纯冗余

## 构建
`npm run build` — 构建产物到 dist/（目前零 TS 错误）
