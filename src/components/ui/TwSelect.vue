<template>
  <div class="tw-select-wrapper">
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'tw-select',
        'w-full px-4 py-2.5 text-xs rounded-xl border outline-none transition-all cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        customClass
      ]"
      v-bind="$attrs"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled selected class="tw-select-placeholder">
        {{ placeholder }}
      </option>
      <option
        v-for="option in normalizedOptions"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        class="tw-select-option"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type OptionValue = string | number | boolean
type OptionItem = {
  value: OptionValue
  label: string
  disabled?: boolean
}

interface TwSelectProps {
  modelValue: OptionValue
  options: Array<OptionItem | OptionValue>
  placeholder?: string
  disabled?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<TwSelectProps>(), {
  placeholder: '',
  disabled: false,
  customClass: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: OptionValue]
  'change': [value: OptionValue]
}>()

// Normalize options to standard format
const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'object' && option !== null && 'value' in option) {
      return option as OptionItem
    }
    return {
      value: option as OptionValue,
      label: String(option),
      disabled: false
    }
  })
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  let value: OptionValue = target.value

  // Try to match the original value type
  const originalOption = props.options.find(opt => {
    if (typeof opt === 'object' && opt !== null && 'value' in opt) {
      return String(opt.value) === value
    }
    return String(opt) === value
  })

  if (originalOption && typeof originalOption === 'object' && 'value' in originalOption) {
    value = originalOption.value
  }

  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.tw-select {
  background: var(--bg-panel);
  border-color: var(--border-base);
  color: var(--text-primary);
}

.tw-select:hover:not(:disabled) {
  border-color: var(--border-medium);
  background: var(--bg-deep);
}

.tw-select:focus {
  border-color: var(--primary);
  background: var(--bg-deep);
}

.tw-select-placeholder {
  background: var(--bg-panel);
  color: var(--text-tertiary);
}

.tw-select-option {
  background: var(--bg-panel);
  color: var(--text-primary);
  padding: 0.5rem;
}
</style>
