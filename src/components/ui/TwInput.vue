<template>
  <div class="tw-input-wrapper">
    <div class="relative">
      <!-- Prefix Icon/Text -->
      <span
        v-if="prefix"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs pointer-events-none z-10"
      >
        {{ prefix }}
      </span>

      <input
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :class="[
          'tw-input',
          'w-full py-2.5 text-xs rounded-xl border outline-none transition-all',
          prefix ? 'pl-8 pr-4' : suffix || clearable ? 'pl-4 pr-8' : 'px-4',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'tw-input-error' : '',
          customClass
        ]"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />

      <!-- Suffix Icon/Text or Clear Button -->
      <span
        v-if="suffix && !showClearIcon"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs pointer-events-none z-10"
      >
        {{ suffix }}
      </span>

      <button
        v-if="showClearIcon"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs transition-colors z-10"
        @click="handleClear"
      >
        ✕
      </button>
    </div>

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
import { computed, ref } from 'vue'

interface TwInputProps {
  modelValue: string | number
  type?: 'text' | 'email' | 'url' | 'tel' | 'number' | 'password'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  showCount?: boolean
  clearable?: boolean
  prefix?: string
  suffix?: string
  error?: string
  customClass?: string
}

const props = withDefaults(defineProps<TwInputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  showCount: false,
  clearable: false,
  customClass: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'input': [value: string | number]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'change': [value: string | number]
  'clear': []
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const currentLength = computed(() => {
  return String(props.modelValue)?.length || 0
})

const showClearIcon = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && props.modelValue
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value

  if (props.type === 'number' && value !== '') {
    value = Number(value)
  }

  emit('update:modelValue', value)
  emit('input', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value

  if (props.type === 'number' && value !== '') {
    value = Number(value)
  }

  emit('change', value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

// Expose methods for parent component
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>

<style scoped>
.tw-input {
  background: var(--bg-panel);
  border-color: var(--border-base);
  color: var(--text-primary);
}

.tw-input::placeholder {
  color: var(--text-dim);
}

.tw-input:hover:not(:disabled) {
  border-color: var(--border-medium);
  background: var(--bg-deep);
}

.tw-input:focus {
  border-color: var(--primary);
  background: var(--bg-deep);
}

.tw-input-error {
  border-color: var(--error) !important;
}
</style>
