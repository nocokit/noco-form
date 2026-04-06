

<template>
  <a-rate class='item' v-model:value="localValue" :character="rateCharacter" :count="props.rateCount" :allowHalf="props.rateAllowHalf" @change="onRateChange" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFormValues } from '@/composables/useFormValues'
interface Props{
  id?: string
  value: string,
  rateCharacter: number | string
  rateCount: number
  rateAllowHalf: boolean
}

const props = defineProps<Props>()
const formValues = useFormValues()
const localValue = ref(props.value ?? 0)

watch(() => props.value, (val) => { localValue.value = val ?? 0 })

const onRateChange = (val: number) => {
  if (formValues && props.id) formValues[props.id] = val
}

</script>
<style lang="scss" scoped>

.item {
  text-align: left;
  margin-left: -10px;
}

.ant-rate-star-zero{
  color: rgba(0,0,0,1) !important;
  filter:grayscale(0);
}




::v-deep(  .ant-rate-star-first) {
  color: rgba(0,0,0,1);
  filter:grayscale(0);
}

::v-deep(.ant-rate-star-second) {
  color: rgba(0,0,0,1);
  filter:grayscale(1);
}

::v-deep(.ant-rate-star-full .ant-rate-star-second,  .ant-rate-star-full  .ant-rate-star-first) {
  color: rgba(0,0,0,1) !important;
  filter:grayscale(0);
}

</style>
