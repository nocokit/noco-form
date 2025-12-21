<template>
  <div
    class="inline-flex items-center cursor-pointer"
    :class="{ 'opacity-50 cursor-not-allowed': disabled, 'cursor-wait': loading }"
    @click="handleClick"
  >
    <div
      class="rounded-full relative transition-colors duration-200"
      :class="[
        sizeClasses.track,
        modelValue ? 'bg-indigo-600' : 'bg-zinc-800'
      ]"
      :style="customColors"
    >
      <div
        class="absolute bg-white rounded-full transition-all duration-200"
        :class="[
          sizeClasses.thumb,
          modelValue ? sizeClasses.thumbChecked : sizeClasses.thumbUnchecked
        ]"
      >
        <span v-if="loading" class="absolute inset-0 flex items-center justify-center text-[6px] text-zinc-400">⋯</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TwSwitchProps {
  modelValue: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  activeColor?: string
  inactiveColor?: string
}

const props = withDefaults(defineProps<TwSwitchProps>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const sizeClasses = computed(() => {
  const sizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-2.5 h-2.5',
      thumbUnchecked: 'top-[3px] left-[3px]',
      thumbChecked: 'top-[3px] right-[3px]'
    },
    md: {
      track: 'w-10 h-5',
      thumb: 'w-3 h-3',
      thumbUnchecked: 'top-1 left-1',
      thumbChecked: 'top-1 right-1'
    },
    lg: {
      track: 'w-12 h-6',
      thumb: 'w-4 h-4',
      thumbUnchecked: 'top-1 left-1',
      thumbChecked: 'top-1 right-1'
    }
  }
  return sizes[props.size]
})

const customColors = computed(() => {
  if (!props.activeColor && !props.inactiveColor) return {}

  return {
    backgroundColor: props.modelValue
      ? (props.activeColor || '#4f46e5')
      : (props.inactiveColor || '#27272a')
  }
})

const handleClick = () => {
  if (props.disabled || props.loading) return

  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>
