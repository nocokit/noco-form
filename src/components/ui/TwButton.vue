<template>
  <button
    :disabled="disabled || loading || success"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading State -->
    <template v-if="loading">
      <div class="btn-spinner"
        :class="spinnerSizeClass"
      ></div>
      <span class="opacity-80">{{ loadingText }}</span>
    </template>

    <!-- Success State -->
    <template v-else-if="success">
      <svg xmlns="http://www.w3.org/2000/svg" :width="iconSize" :height="iconSize" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
      <span>{{ successText }}</span>
    </template>

    <!-- Normal State -->
    <template v-else>
      <span>{{ text }}</span>
      <svg
        v-if="showIcon"
        xmlns="http://www.w3.org/2000/svg"
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="btn-icon"
      >
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
        <path d="m21.854 2.147-10.94 10.939"></path>
      </svg>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface TwButtonProps {
  text?: string
  size?: 'small' | 'default' | 'large'
  loading?: boolean
  success?: boolean
  disabled?: boolean
  showIcon?: boolean
  loadingText?: string
  successText?: string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<TwButtonProps>(), {
  text: '提交',
  size: 'default',
  loading: false,
  success: false,
  disabled: false,
  showIcon: true,
  loadingText: '提交中...',
  successText: '提交成功',
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading && !props.success) {
    emit('click', event)
  }
}

// Size configurations
const sizeConfig = computed(() => {
  switch (props.size) {
    case 'small':
      return {
        padding: 'px-6 py-2',
        text: 'text-sm',
        height: 'h-10'
      }
    case 'large':
      return {
        padding: 'px-12 py-4',
        text: 'text-lg',
        height: 'h-14'
      }
    default:
      return {
        padding: 'px-10 py-3',
        text: 'text-sm',
        height: 'h-12'
      }
  }
})

const spinnerSizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'h-3 w-3'
    case 'large':
      return 'h-4 w-4'
    default:
      return 'h-3.5 w-3.5'
  }
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 14
    case 'large':
      return 18
    default:
      return 16
  }
})

const buttonClasses = computed(() => {
  const base = [
    'tw-button',
    'group relative flex items-center justify-center gap-2',
    'rounded-xl font-semibold tracking-wide transition-all duration-200',
    sizeConfig.value.padding,
    sizeConfig.value.text,
    sizeConfig.value.height,
    props.fullWidth ? 'w-full' : ''
  ]

  if (props.loading) {
    return [...base, 'tw-button-loading'].join(' ')
  }

  if (props.success) {
    return [...base, 'tw-button-success'].join(' ')
  }

  if (props.disabled) {
    return [...base, 'tw-button-disabled'].join(' ')
  }

  return [...base, 'tw-button-normal'].join(' ')
})
</script>

<style scoped>
/* Base Button Styles */
.tw-button {
  color: white;
  border: none;
  outline: none;
}

/* Normal State */
.tw-button-normal {
  background: linear-gradient(to bottom, var(--primary), #1d4ed8);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
              0 4px 14px 0 var(--primary-glow);
}

.tw-button-normal:hover {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
              0 6px 20px rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
}

.tw-button-normal:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

/* Loading State */
.tw-button-loading {
  background: linear-gradient(to bottom, var(--primary), #1d4ed8);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
  cursor: wait;
  opacity: 0.9;
}

/* Success State */
.tw-button-success {
  background: var(--success);
  box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.3);
}

.tw-button-success:hover {
  background: #10b981;
}

/* Disabled State */
.tw-button-disabled {
  background: linear-gradient(to bottom, var(--primary), #1d4ed8);
  opacity: 0.5;
  cursor: not-allowed;
}

/* Spinner Animation */
.btn-spinner {
  animation: spin 1s linear infinite;
  border-radius: 9999px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.3);
  border-top-color: white;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Icon Styles */
.btn-icon {
  color: white;
  opacity: 0.7;
  transition: transform 0.3s;
}

.group:hover .btn-icon {
  transform: translate(0.25rem, -0.25rem);
}
</style>
