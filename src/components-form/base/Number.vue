<template>
  <input
    type="number"
    :disabled="isDev || disabled || readonly"
    :title="isDev ? disableInputByDev : placeholder"
    :class="[
      'item-comp w-full px-3 py-2 border-none rounded-md',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'disabled:bg-gray-100 disabled:cursor-not-allowed',
      { 'component-hidden': hidden }
    ]"
    v-model="value"
    :placeholder="placeholder || '请输入数字'"
    :min="minValue"
    :max="maxValue"
    :step="step"
    @change="handleChange"
  />
</template>
<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { disableInputByDev, type DisplayMode } from '@/views/FormEditor/comp-config-data'

interface Props {
  // 基础字段
  id?: string
  field?: string
  placeholder?: string
  value?: number | null
  isDev?: boolean
  isPreviewRender?: boolean

  // 新增：响应式控制字段
  display?: DisplayMode
  hidden?: boolean
  disabled?: boolean
  readonly?: boolean

  // Number 特有配置
  minValue?: number
  maxValue?: number
  step?: number
  precision?: number
}

const props = withDefaults(defineProps<Props>(), {
  isDev: false,
  isPreviewRender: false,
  minValue: 0,
  maxValue: 100,
  step: 1,
  precision: 0
})

const emit = defineEmits<{
  change: [value: number]
  update: [field: string, value: number]
}>()

const value = ref(props.value || 0)

// Inject preview form data context
const previewContext = inject<any>('previewFormData', null)

// Handle change
const handleChange = () => {
  if (props.isPreviewRender && previewContext) {
    previewContext.updateFormData(props.id, value.value)
  }

  // Emit events
  emit('change', value.value)
  if (props.field) {
    emit('update', props.field, value.value)
  }
}

// Watch for value changes from parent
watch(() => props.value, (newVal) => {
  value.value = newVal || 0
})
</script>
