<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <img class="icon" :src="TelePhone" alt="">
    </div>
    <input
      type="tel"
      v-model="value"
      :placeholder="placeholder"
      class="w-full pl-10 pr-3 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TelePhone from '/src/assets/form/telePhone.svg'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
}

const props = defineProps<Props>()
const value = ref(props.value || null)
</script>
