<template>
 <a-input 
 :disabled="isDev" :title="isDev ? disableInputByDev : placeholder" class="item-comp" 
 v-model:value="value" 
 :placeholder="placeholder || '提示信息'" />
</template>
<script setup lang="ts">
import { ref,watch, reactive } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
}

const props = defineProps<Props>()
const value = ref(props.value ?? null)

watch(() => props.value, (val) => {
  value.value = val ?? null
})
</script>
<style lang="scss">
</style>