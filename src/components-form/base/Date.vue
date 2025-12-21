<template>
  <div
    :class="[
      'relative bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-400 flex justify-between items-center transition-colors hover:border-zinc-600',
      { 'component-hidden': hidden }
    ]"
    style="width: 100%; max-width: 100%; box-sizing: border-box;"
  >
    <input
      :type="showTime ? 'datetime-local' : 'date'"
      :disabled="isDev || disabled || readonly"
      :title="isDev ? disableInputByDev : placeholder"
      class="bg-transparent border-none outline-none text-zinc-400 w-full focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed date-input"
      :placeholder="placeholder || '年 / 月 / 日'"
      v-model="dateValue"
      @change="handleChange"
    />
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-500 flex-shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { disableInputByDev, type DisplayMode, type DateType } from '@/views/FormEditor/comp-config-data'

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

  // Date 特有配置
  dateType?: DateType
  format?: string
  valueFormat?: string
  showTime?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDev: false,
  isPreviewRender: false,
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  showTime: false
})

const emit = defineEmits<{
  change: [value: string]
  update: [field: string, value: string]
}>()

const dateValue = ref(props.value || '')

// Inject preview form data context
const previewContext = inject<any>('previewFormData', null)

// Handle change
const handleChange = () => {
  if (props.isPreviewRender && previewContext) {
    previewContext.updateFormData(props.id, dateValue.value)
  }

  // Emit events
  emit('change', dateValue.value)
  if (props.field) {
    emit('update', props.field, dateValue.value)
  }
}

// Watch for value changes from parent
watch(() => props.value, (newVal) => {
  dateValue.value = newVal || ''
})
</script>
