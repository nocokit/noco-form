<template>
  <div class="tw-textarea-wrapper">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :rows="rows"
      :class="[
        'tw-textarea',
        'w-full px-4 py-2.5 text-xs rounded-xl border outline-none transition-all leading-relaxed',
        resizeClass,
        'disabled:opacity-50 disabled:cursor-not-allowed',
        error ? 'tw-textarea-error' : '',
        customClass
      ]"
      :style="minHeightStyle"
      v-bind="$attrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    ></textarea>

    <!-- Character Count -->
    <div
      v-if="showCount && maxlength"
      class="text-right text-[10px] text-zinc-600 mt-1"
    >
      {{ currentLength }} / {{ maxlength }}
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="text-[10px] text-red-500 mt-1"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TwTextareaProps {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  rows?: number
  minHeight?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  showCount?: boolean
  error?: string
  customClass?: string
}

const props = withDefaults(defineProps<TwTextareaProps>(), {
  placeholder: '',
  disabled: false,
  readonly: false,
  rows: 3,
  minHeight: '80px',
  resize: 'vertical',
  showCount: false,
  customClass: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'input': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'change': [value: string]
}>()

const resizeClass = computed(() => {
  const resizeMap = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  }
  return resizeMap[props.resize]
})

const minHeightStyle = computed(() => {
  return {
    minHeight: props.minHeight
  }
})

const currentLength = computed(() => {
  return props.modelValue?.length || 0
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const value = target.value

  emit('update:modelValue', value)
  emit('input', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  emit('change', (event.target as HTMLTextAreaElement).value)
}
</script>

<style scoped>
.tw-textarea {
  background: var(--bg-panel);
  border-color: var(--border-base);
  color: var(--text-primary);
}

.tw-textarea::placeholder {
  color: var(--text-dim);
}

.tw-textarea:hover:not(:disabled) {
  border-color: var(--border-medium);
  background: var(--bg-deep);
}

.tw-textarea:focus {
  border-color: var(--primary);
  background: var(--bg-deep);
}

.tw-textarea-error {
  border-color: var(--error) !important;
}
</style>
