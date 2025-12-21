

<template>
  <div class="item flex items-center gap-1">
    <button
      v-for="index in props.rateCount"
      :key="index"
      type="button"
      @click="handleStarClick(index)"
      @mouseenter="handleStarHover(index)"
      @mouseleave="handleStarLeave"
      class="text-2xl focus:outline-none transition-colors duration-150 cursor-pointer border-0 bg-transparent p-0"
      :class="getStarClass(index)"
    >
      <span v-if="props.rateAllowHalf && shouldShowHalfStar(index)">
        <span class="relative inline-block">
          <span class="text-gray-300">{{ getStarCharacter() }}</span>
          <span class="absolute top-0 left-0 overflow-hidden text-yellow-400" style="width: 50%;">
            {{ getStarCharacter() }}
          </span>
        </span>
      </span>
      <span v-else :class="getStarColor(index)">
        {{ getStarCharacter() }}
      </span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, inject, watch } from 'vue'
interface Props{
  id: string
  value: number
  rateCharacter: number | string
  rateCount: number
  rateAllowHalf: boolean
  isPreviewRender?: boolean
}

const props = defineProps<Props>()
const rateValue = ref(props.value || 0)
const hoverValue = ref(0)

// Inject preview form data context
const previewContext = inject<any>('previewFormData', null)

// Get star character (default to star emoji if not provided)
const getStarCharacter = () => {
  return props.rateCharacter || '★'
}

// Handle star click
const handleStarClick = (index: number) => {
  if (props.rateAllowHalf) {
    // Check if clicking on same star - toggle between full and half
    if (Math.floor(rateValue.value) === index && rateValue.value !== index) {
      rateValue.value = index
    } else if (rateValue.value === index) {
      rateValue.value = index - 0.5
    } else {
      rateValue.value = index
    }
  } else {
    rateValue.value = index
  }
  handleChange(rateValue.value)
}

// Handle star hover
const handleStarHover = (index: number) => {
  hoverValue.value = index
}

// Handle star leave
const handleStarLeave = () => {
  hoverValue.value = 0
}

// Get star color based on value
const getStarColor = (index: number) => {
  const currentValue = hoverValue.value || rateValue.value
  return index <= currentValue ? 'text-yellow-400' : 'text-gray-300'
}

// Get star class
const getStarClass = (index: number) => {
  return ''
}

// Check if should show half star
const shouldShowHalfStar = (index: number) => {
  const currentValue = hoverValue.value || rateValue.value
  return props.rateAllowHalf && index === Math.ceil(currentValue) && currentValue % 1 !== 0
}

// Handle change
const handleChange = (value: number) => {
  if (props.isPreviewRender && previewContext) {
    previewContext.updateFormData(props.id, value)
  }
}

// Watch for value changes from parent
watch(() => props.value, (newVal) => {
  rateValue.value = newVal || 0
})
</script>
