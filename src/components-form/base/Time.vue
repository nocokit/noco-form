<template>
  <div class="relative bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-400 flex justify-between items-center transition-colors hover:border-zinc-600" style="width: 100%; max-width: 100%; box-sizing: border-box;">
    <input
      type="time"
      class="bg-transparent border-none outline-none text-zinc-400 w-full focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed time-input"
      :disabled="isDev"
      :title="isDev ? disableInputByDev : placeholder"
      :placeholder="placeholder"
      v-model="inputValue"
      @change="handleChange"
    />
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-500 flex-shrink-0">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'

interface Props {
  id: string
  isDev: boolean
  placeholder: string
  value: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:value'])

const inputValue = ref(props.value || '')

watch(() => props.value, (newValue) => {
  inputValue.value = newValue
})

const handleChange = () => {
  emit('update:value', inputValue.value)
}
</script>
