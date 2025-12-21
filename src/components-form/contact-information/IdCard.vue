<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <img class="icon" :src="ID" alt="">
    </div>
    <input
      type="text"
      v-model="value"
      :placeholder="placeholder"
      class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
 </template>
 <script setup lang="ts">
 import { ref } from 'vue'
 import ID from '/src/assets/form/id.svg'

 interface Props {
  id: string
  placeholder: string
  value: string
  isDev: boolean
}
const props = defineProps<Props>()
const value = ref(props.value || null)
 </script>
