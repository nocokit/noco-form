<template>
  <a-range-picker
  :disabled="isDev" :title="isDev ? disableInputByDev : ''"
   class="item-comp"
   v-model:value="localValue"
   @change="onRangeChange"
   :placeholder="placeholderRange"/>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  placeholderRange: [string, string]
  value: string
  isDev: boolean
}


const props = defineProps<Props>()
const formValues = useFormValues()
const localValue = ref(props.value ?? null)

watch(() => props.value, (val) => { localValue.value = val ?? null })

const onRangeChange = (_: any, dateStrings: [string, string]) => {
  if (formValues && props.id) formValues[props.id] = dateStrings.join(' ~ ')
}
</script>
<style lang="scss">
</style>