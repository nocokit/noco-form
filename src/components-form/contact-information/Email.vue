<template>
  <div class="relative bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-400 flex items-center transition-colors hover:border-zinc-600" style="width: 100%; max-width: 100%; box-sizing: border-box;">
    <input
      type="email"
      class="bg-transparent border-none outline-none text-zinc-400 w-full focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
      v-model="value"
      :placeholder="placeholder"
      :disabled="isDev"
      @input="handleInput"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  id: string
  placeholder: string
  value: string
  isDev: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:value'])

const value = ref(props.value || '')

watch(() => props.value, (newValue) => {
  value.value = newValue || ''
})

const handleInput = () => {
  emit('update:value', value.value)
}
</script>
