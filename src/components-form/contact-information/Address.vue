<template>
  <a-cascader v-model:value="localAddress" style="margin-bottom: 10px;width:100%" :options="options"
    :placeholder="props.address_placeholder"
    :disabled="isDev"
    @change="onAddressChange">
    <template #prefix>
      <!-- <StepBackwardOutlined /> -->
    </template>
  </a-cascader>
  <a-input v-model:value="localDetail"
    :placeholder="props.address_detail_placeholder"
    :disabled="isDev"
    @change="onDetailChange">
    <template #prefix>
      <!-- <user-outlined />  -->
    </template>
  </a-input>
</template>
<script setup lang="ts">
import { addressData } from '@/views/FormEditor/comp-address-data';
import { ref } from 'vue'
import { useFormValues } from '@/composables/useFormValues'


interface Props {
  id: string
  address_placeholder: string
  address_detail_placeholder: string
  value: string
  isDev: boolean
}

const props = defineProps<Props>()
const formValues = useFormValues()

const options = ref([...addressData])
const localAddress = ref<any>(null)
const localDetail = ref('')

const writeBack = () => {
  if (formValues && props.id) {
    const parts = Array.isArray(localAddress.value) ? localAddress.value.join('') : ''
    formValues[props.id] = parts + (localDetail.value ? ' ' + localDetail.value : '')
  }
}

const onAddressChange = () => writeBack()
const onDetailChange = () => writeBack()

</script>
<style lang="scss" scoped>

</style>