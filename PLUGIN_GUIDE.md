# 插件系统使用指南

## 概述

Lemon-Form 插件系统允许你动态注册自定义组件，无需修改核心代码。支持：

- ✅ 自定义渲染组件（懒加载）
- ✅ 自定义设置面板
- ✅ 自定义图标（URL/内置 key）
- ✅ 复用内置通用设置项（Title、Placeholder、Required 等）
- ✅ 自定义默认配置
- ✅ 元信息控制编辑器行为

## 快速开始

### 1. 创建自定义组件

```vue
<!-- src/plugins/my-custom/MyRating.vue -->
<template>
  <div class="my-rating">
    <div v-for="n in 5" :key="n" 
         @click="handleClick(n)"
         class="star"
         :class="{ active: n <= value }">
      ⭐
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  // 组件实例数据（从 defaultConfig 合并而来）
  dataValue?: number
  isPreviewRender?: boolean
  isDev?: boolean
}

const props = defineProps<Props>()
const value = ref(props.dataValue || 0)

const handleClick = (n: number) => {
  if (props.isPreviewRender) {
    value.value = n
    // 触发表单值更新
    emit('update:dataValue', n)
  }
}

const emit = defineEmits(['update:dataValue'])
</script>

<style scoped>
.my-rating { display: flex; gap: 8px; }
.star { cursor: pointer; opacity: 0.3; }
.star.active { opacity: 1; }
</style>
```

### 2. 创建自定义设置面板（可选）

```vue
<!-- src/plugins/my-custom/MyRatingSetting.vue -->
<template>
  <div class="setting-item">
    <label>评分上限</label>
    <a-input-number 
      v-model:value="comp.maxStars" 
      :min="3" 
      :max="10" 
    />
  </div>
  <div class="setting-item">
    <label>星星颜色</label>
    <a-input v-model:value="comp.starColor" type="color" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  comp: any  // 当前选中的组件实例
}
defineProps<Props>()
</script>
```

### 3. 注册插件

```ts
// src/plugins/my-custom/index.ts
import type { LemonFormPlugin } from '@/plugins'

export const myCustomPlugin: LemonFormPlugin = {
  name: 'my-custom-plugin',
  components: [
    {
      type: 'MyRating',
      name: '自定义评分',
      label: '自定义评分',
      icon: '/icons/my-rating.svg',  // 或使用内置 key: 'Rate'
      category: 'advanced',
      component: () => import('./MyRating.vue'),
      settingComponent: () => import('./MyRatingSetting.vue'),
      defaultConfig: {
        maxStars: 5,
        starColor: '#FFD700',
        isRequired: true,
        description: '请为我们评分',
      },
      meta: {
        hasPlaceholder: false,
        hasValidationFormat: false,
      },
    },
  ],
}
```

### 4. 在 main.ts 中安装

```ts
// src/main.ts
import { createLemonForm, builtinPlugin } from './plugins'
import { myCustomPlugin } from './plugins/my-custom'

const lemonForm = createLemonForm()
lemonForm.use(builtinPlugin)
lemonForm.use(myCustomPlugin)  // 👈 注册自定义插件

app.use(lemonForm)
```

## 高级用法

### 复用内置通用设置项

如果你的组件不需要完全自定义设置面板，可以复用内置的通用设置项（Title、Placeholder、Required 等）。

**方法：不提供 `settingComponent`，在 `defaultConfig` 中声明需要的字段**

```ts
{
  type: 'MyInput',
  name: '自定义输入框',
  component: () => import('./MyInput.vue'),
  // 不提供 settingComponent，自动使用内置通用设置项
  defaultConfig: {
    placeholder: '请输入',      // 👈 会自动显示 Placeholder 设置项
    isRequired: true,           // 👈 会自动显示 Required 设置项
    description: '描述文本',     // 👈 会自动显示 Description 设置项
  },
  meta: {
    hasPlaceholder: true,       // 标记支持 placeholder
    hasValidationFormat: true,  // 标记支持正则验证
  },
}
```

内置通用设置项包括：
- `Title` — 组件标题（`name` 字段）
- `Description` — 描述文本（`description` 字段）
- `Placeholder` — 占位符（`placeholder` 字段）
- `RangePlaceholder` — 范围占位符（`placeholderRange` 字段）
- `LayoutType` — 布局方式（`layoutType` 字段）
- `Position` — 位置（`position` 字段）
- `Size` — 尺寸（`size` 字段）
- `Required` — 必填（`isRequired` 字段）
- `ValidationSystem` — 正则验证（需要 `meta.hasValidationFormat: true`）
- `DataList` — 选项列表（`dataList` 字段，需要 `meta.hasDataList: true`）

### 混合使用：自定义设置 + 内置设置

如果你想在自定义设置面板中**同时使用**内置设置组件：

```vue
<!-- MyWidgetSetting.vue -->
<template>
  <!-- 自定义设置 -->
  <div class="setting-item">
    <label>特殊配置</label>
    <a-input v-model:value="comp.specialConfig" />
  </div>

  <!-- 复用内置设置组件 -->
  <Title :comp="comp" />
  <Placeholder :comp="comp" />
  <Required :comp="comp" />
</template>

<script setup lang="ts">
import Title from '@/components-form-setting/base/Title.vue'
import Placeholder from '@/components-form-setting/base/Placeholder.vue'
import Required from '@/components-form-setting/form-validation/Required.vue'

interface Props {
  comp: any
}
defineProps<Props>()
</script>
```

### 元信息 (meta) 说明

`meta` 字段控制编辑器对组件的行为：

```ts
meta: {
  // 是否为布局组件（分割线、分页等），布局组件不显示标题/描述
  isLayoutComp: boolean

  // 纯展示组件，无编辑交互（如图片、视频、标题）
  justShow: boolean

  // 是否有选项列表（Radio、Checkout、Select 等）
  // 设为 true 会在编辑器底部显示"添加单项"/"批量操作"按钮
  hasDataList: boolean

  // 是否有 placeholder
  hasPlaceholder: boolean

  // 是否有范围 placeholder（DateRange、TimeRange）
  hasRangePlaceholder: boolean

  // 是否忽略必填设置（布局组件通常设为 true）
  ignoreRequired: boolean

  // 支持正则验证（Input、Textarea、Email 等）
  hasValidationFormat: boolean

  // 是否为个人信息分类（用于数据统计）
  isPersonalClassify: boolean
}
```

### 自定义图标

支持三种图标形式：

```ts
// 1. 内置图标 key（参考 src/views/FormEditor/comp-icon.ts）
icon: 'Radio'

// 2. 相对路径
icon: '/icons/my-widget.svg'

// 3. 绝对 URL
icon: 'https://example.com/icon.png'

// 4. Data URL
icon: 'data:image/svg+xml;base64,...'
```

### 动态注册（运行时）

除了在 `main.ts` 中静态注册，也可以在运行时动态注册：

```ts
import { registerComponent } from '@/plugins'

// 在某个业务逻辑中动态注册
registerComponent({
  type: 'DynamicWidget',
  name: '动态组件',
  label: '动态组件',
  category: 'advanced',
  component: () => import('./DynamicWidget.vue'),
  defaultConfig: {},
})
```

### install 钩子

如果需要更复杂的初始化逻辑，可以使用 `install` 钩子：

```ts
export const myPlugin: LemonFormPlugin = {
  name: 'my-plugin',
  install(ctx) {
    // 批量注册
    const widgets = ['WidgetA', 'WidgetB', 'WidgetC']
    widgets.forEach(name => {
      ctx.registerComponent({
        type: name,
        name: name,
        label: name,
        category: 'advanced',
        component: () => import(`./${name}.vue`),
        defaultConfig: {},
      })
    })

    // 或者根据环境条件注册
    if (import.meta.env.VITE_ENABLE_BETA_FEATURES) {
      ctx.registerComponent({
        type: 'BetaWidget',
        // ...
      })
    }
  },
}
```

## 组件 Props 约定

你的自定义组件会接收以下 props：

```ts
interface ComponentProps {
  // 组件实例的所有配置（defaultConfig + 用户修改）
  [key: string]: any

  // 标准字段
  id: string                    // 组件实例 ID
  type: string                  // 组件类型
  name: string                  // 组件名称
  title: string                 // 标题
  description: string | null    // 描述
  dataValue: any                // 当前值
  isRequired: boolean           // 是否必填

  // 编辑器状态
  isSelected: boolean           // 是否被选中
  isPreviewRender: boolean      // 是否在预览模式
  isDev: boolean                // 是否在开发模式
  previewType: 'Phone' | 'PC'   // 预览设备类型
}
```

## 表单值绑定

在预览/提交模式下，组件需要通过 `v-model` 或 `emit` 更新 `dataValue`：

```vue
<script setup lang="ts">
const props = defineProps<{ dataValue?: any }>()
const emit = defineEmits(['update:dataValue'])

const handleChange = (newValue: any) => {
  emit('update:dataValue', newValue)
}
</script>
```

## 完整示例：集成第三方组件库

假设你想集成 `vue-color` 颜色选择器：

```bash
npm install @ckpack/vue-color
```

```ts
// src/plugins/color-picker/index.ts
import type { LemonFormPlugin } from '@/plugins'

export const colorPickerPlugin: LemonFormPlugin = {
  name: 'color-picker',
  components: [
    {
      type: 'ColorPicker',
      name: '颜色选择器',
      label: '颜色选择器',
      icon: '/icons/color.svg',
      category: 'advanced',
      component: () => import('./ColorPicker.vue'),
      settingComponent: () => import('./ColorPickerSetting.vue'),
      defaultConfig: {
        defaultColor: '#1890ff',
        showAlpha: true,
        isRequired: false,
        description: '请选择颜色',
      },
      meta: {
        hasPlaceholder: false,
      },
    },
  ],
}
```

```vue
<!-- src/plugins/color-picker/ColorPicker.vue -->
<template>
  <div class="color-picker-wrapper">
    <Sketch 
      v-if="isPreviewRender"
      v-model="color" 
      @update:modelValue="handleChange"
    />
    <div v-else class="preview" :style="{ background: color }">
      {{ color }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Sketch } from '@ckpack/vue-color'

interface Props {
  dataValue?: string
  defaultColor?: string
  isPreviewRender?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:dataValue'])

const color = ref(props.dataValue || props.defaultColor || '#1890ff')

watch(() => props.dataValue, (val) => {
  if (val) color.value = val
})

const handleChange = (val: any) => {
  const hex = val.hex || val
  color.value = hex
  emit('update:dataValue', hex)
}
</script>
```

然后在 `main.ts` 中注册：

```ts
import { colorPickerPlugin } from './plugins/color-picker'

lemonForm.use(colorPickerPlugin)
```

## 调试技巧

1. **查看已注册组件**

```ts
import { getAllComponentDefs } from '@/plugins'

console.log('已注册组件:', getAllComponentDefs())
```

2. **检查组件是否注册成功**

```ts
import { isRegisteredType, getComponentDef } from '@/plugins'

console.log('MyWidget 已注册:', isRegisteredType('MyWidget'))
console.log('MyWidget 定义:', getComponentDef('MyWidget'))
```

3. **查看图标解析结果**

```ts
import { getResolvedIcon } from '@/plugins'

console.log('图标 URL:', getResolvedIcon('MyWidget'))
```

## 常见问题

### Q: 我的组件注册了，但侧边栏看不到？

A: 检查 `category` 是否正确，支持的分类：`show`、`basic`、`rate`、`time`、`layout`、`personal`、`advanced`。

### Q: 自定义设置面板不显示？

A: 确保 `settingComponent` 返回的是 `() => import('./xxx.vue')` 格式，并且组件导出正确。

### Q: 如何让我的组件支持"必填"验证？

A: 在 `defaultConfig` 中添加 `isRequired: true`，并在组件中处理验证逻辑（参考内置组件）。

### Q: 图标不显示？

A: 检查图标路径是否正确，或者使用内置图标 key（参考 `src/views/FormEditor/comp-icon.ts`）。

### Q: 如何访问全局表单配置？

A: 通过 `useSelectCompStore()` 访问：

```ts
import { useSelectCompStore } from '@/stores/selectCompStore'

const store = useSelectCompStore()
console.log('全局配置:', store.formConfig)
```

## 最佳实践

1. **使用懒加载** — 所有组件都应该用 `() => import()` 懒加载，避免打包体积过大
2. **明确 meta 信息** — 正确设置 `meta` 可以让编辑器自动处理很多行为
3. **复用内置设置项** — 优先复用内置通用设置项，减少重复代码
4. **遵循命名约定** — 组件 `type` 使用 PascalCase（如 `MyWidget`）
5. **提供默认值** — `defaultConfig` 应该包含所有必要字段的默认值
6. **处理预览模式** — 组件需要区分编辑模式和预览模式（通过 `isPreviewRender` prop）
