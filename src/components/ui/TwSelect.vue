<template>
  <div class="tw-select-wrapper">
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'item-comp w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-600',
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
/* Select options styling */
select option {
  background: #18181b;
  color: #d4d4d8;
  padding: 0.5rem;
}

select option:checked {
  background: #27272a;
}
</style>
