<template>
 <a-input-number
  :disabled="isDev"
  :title="isDev ? disableInputByDev : placeholder"
  class="item-comp"
  v-model:value="value"
  :placeholder="placeholder || '提示信息'"
  :min="minValue ?? 0"
  :max="maxValue ?? 100" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
  minValue?: number
  maxValue?: number
}

const props = defineProps<Props>()
const formValues = useFormValues()
const value = ref(props.value ?? null)

watch(() => props.value, (val) => {
  value.value = val ?? null
})

watch(value, (val) => {
  if (formValues && props.id) formValues[props.id] = val ?? ''
})

</script>
<style lang="scss">
</style>