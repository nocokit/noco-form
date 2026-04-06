<template>
    <a-time-picker
    :disabled="isDev" :title="isDev ? disableInputByDev : placeholder"
    class="item-comp" v-model:value="inputValue" :placeholder="placeholder"
    valueFormat="HH:mm:ss" @change="onTimeChange"/>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  isDev: boolean
  placeholder: string
  value: string
}

const props = defineProps<Props>()
const formValues = useFormValues()
const inputValue = ref(props.value)

watch(() => props.value, (newValue) => inputValue.value = newValue)

const onTimeChange = (_: any, timeStr: string) => {
  if (formValues && props.id) formValues[props.id] = timeStr ?? ''
}
</script>
<style lang="scss">
</style>
