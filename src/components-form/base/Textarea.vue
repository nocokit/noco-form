<template>
    <a-textarea 
    :disabled="isDev" :title="isDev ? disableInputByDev : placeholder"
    v-model:value="value" :placeholder="placeholder || '提示信息'" allow-clear />
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
const value = ref(props.value ?? '')

watch(() => props.value, (val) => {
  value.value = val ?? ''
})

</script>
<style lang="scss">
</style>

<style lang="scss">
</style>