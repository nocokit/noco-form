<template>
  <a-switch
  :disabled="isDev"
  :title="isDev ? disableInputByDev : placeholder"
  v-model:checked="checked"
  @change="onSwitchChange" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  placeholder: string
  value: boolean
  isDev: boolean
  dataList: Array<any>
}

const props = defineProps<Props>()
const formValues = useFormValues()
const checked = ref(props.value ?? false)

watch(() => props.value, (val) => {
  checked.value = val ?? false
})

const onSwitchChange = (val: boolean) => {
  if (formValues && props.id) formValues[props.id] = String(val)
}
</script>
<style lang="scss">
</style>