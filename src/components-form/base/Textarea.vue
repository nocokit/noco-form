<template>
  <textarea
    :disabled="isDev"
    :title="isDev ? disableInputByDev : placeholder"
    v-model="value"
    :placeholder="placeholder || '请输入'"
    class="w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-y min-h-[80px] hover:border-zinc-600"
    style="max-width: 100%;"
  />
</template>
<script setup lang="ts">
import { ref,watch, reactive } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'
interface Props {
  id: string
  placeholder: string
  value: string | undefined
  isDev: boolean
}

const props = defineProps<Props>()
const value = ref(props.value || '')

</script>

