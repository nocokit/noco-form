<template>
  <a-switch
  :disabled="isDev"
  :title="isDev ? disableInputByDev : placeholder"
  v-model:checked="checked" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'

interface Props {
  id: string
  placeholder: string
  value: boolean
  isDev: boolean
  dataList: Array<any>
}

const props = defineProps<Props>()
const checked = ref(props.value ?? false)

watch(() => props.value, (val) => {
  checked.value = val ?? false
})
</script>
<style lang="scss">
</style>