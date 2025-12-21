# NOCO FORM 国际化快速开始

## 🚀 5分钟上手

### 1. 在组件中使用翻译

```vue
<template>
  <div>
    <!-- 使用翻译 -->
    <h1>{{ t('components.title') }}</h1>
    <button>{{ t('common.save') }}</button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
```

### 2. 切换语言

```vue
<template>
  <select v-model="currentLocale" @change="switchLanguage">
    <option value="zh-CN">简体中文</option>
    <option value="en-US">English</option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { currentLocale, setLocale } = useLocale()

const switchLanguage = () => {
  setLocale(currentLocale.value)
}
</script>
```

### 3. 常用翻译键

```typescript
// 通用操作
t('common.save')      // 保存
t('common.cancel')    // 取消
t('common.delete')    // 删除

// 组件类型
t('componentTypes.Input')    // 单行文本
t('componentTypes.Select')   // 下拉选择

// 设置项
t('settings.title')          // 标题
t('settings.placeholder')    // 占位符

// 校验消息
t('validation.messages.required')  // 此项为必填项
```

## 📋 翻译文件位置

- 中文翻译：`src/i18n/locales/zh-CN.ts`
- 英文翻译：`src/i18n/locales/en-US.ts`

## 🔥 实战示例

### 示例 1: 带参数的翻译

```typescript
// 翻译文件
{
  greeting: '你好，{name}！'  // Hello, {name}!
}

// 使用
t('greeting', { name: 'John' })  // 你好，John！
```

### 示例 2: 多语言字段

```typescript
// 定义支持多语言的字段
const field = {
  title: {
    'zh-CN': '姓名',
    'en-US': 'Name'
  }
}

// 获取当前语言的值
const getCurrentTitle = () => {
  return field.title[currentLocale.value]
}
```

## 📚 完整文档

- [完整使用指南](./I18N_GUIDE.md)
- [实施方案](./I18N_IMPLEMENTATION.md)

---

**提示**: 所有 UI 文本都应该使用翻译，避免硬编码！
