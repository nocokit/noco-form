<template>
  <div class="relative w-full">
    <img class="icon absolute left-3 top-1/2 transform -translate-y-1/2 h-[18px]" :src="PhoneIcon" alt="">
    <input
      type="tel"
      class="w-full pl-10 pr-3 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      v-model="value"
      :placeholder="placeholder"
      :disabled="isDev"
      @input="handleInput"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import PhoneIcon from '/src/assets/form/phone.svg'

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
