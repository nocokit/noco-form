<template>
  <a-date-picker :disabled="isDev" :title="isDev ? disableInputByDev : placeholder"
  class="item-comp"
   :placeholder="placeholder"
  v-model:value="localValue" @change="onDateChange" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  placeholder: string
  value: string
  isDev: boolean
}

const props = defineProps<Props>()
const formValues = useFormValues()
const localValue = ref(props.value ?? null)

watch(() => props.value, (val) => { localValue.value = val ?? null })

const onDateChange = (_: any, dateStr: string) => {
  if (formValues && props.id) formValues[props.id] = dateStr
}
</script>
<style lang="scss">
</style>