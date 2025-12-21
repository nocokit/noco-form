<template>
  <div :class="{ 'component-hidden': hidden }" class="relative">
    <input
      type="text"
      :disabled="isDev || disabled || readonly"
      :title="isDev ? disableInputByDev : placeholder"
      class="item-comp w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      v-model="value"
      :placeholder="placeholder || '请输入'"
      :maxlength="maxLength"
      @input="handleInput"
      @blur="handleBlur"
      @change="handleChange"
    />
    <span v-if="showCount && maxLength" class="absolute right-3 top-2 text-xs text-gray-400">
      {{ value.length }}/{{ maxLength }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { disableInputByDev, type DisplayMode } from '@/views/FormEditor/comp-config-data'

interface Props {
  // 基础字段
  id?: string
  field?: string
  placeholder?: string
  value?: string | null
  isDev?: boolean
  isPreviewRender?: boolean

  // 新增：响应式控制字段
  display?: DisplayMode
  hidden?: boolean
  disabled?: boolean
  readonly?: boolean

  // Input 特有配置
  minLength?: number
  maxLength?: number
  showCount?: boolean
  allowClear?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDev: false,
  isPreviewRender: false,
  maxLength: 200,
  showCount: false,
  allowClear: true
})

const emit = defineEmits<{
  change: [value: string]
  update: [field: string, value: string]
}>()

const value = ref(props.value || '')

// Inject preview form data context
const previewContext = inject<any>('previewFormData', null)

// Handle input changes
const handleInput = () => {
  if (props.isPreviewRender && previewContext) {
    previewContext.updateFormData(props.id, value.value)
  }
}

// Handle blur event
const handleBlur = () => {
  emitUpdate()
}

// Handle change event
const handleChange = () => {
  emitUpdate()
}

// Emit update events
const emitUpdate = () => {
  emit('change', value.value)
  if (props.field) {
    emit('update', props.field, value.value)
  }
}

// Watch for value changes from parent
watch(() => props.value, (newVal) => {
  value.value = newVal || ''
})
</script>
