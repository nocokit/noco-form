

<template>
    <a-space direction="vertical">
    <a-select
    class="item-comp"
    v-model:value="_dataValue"
    style="width: 100%"
    :disabled="isDev"
    :placeholder="(placeholder || '请选择分数')" 
    :options="list.map((item) => ({
      label: item + '分',
      value: item,
    }))"
    @change="onSelectChange"
  ></a-select>
  </a-space>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFormValues } from '@/composables/useFormValues'
interface Props {
  id?: string
  dataList: Array<any>
  dataValue: string
  layoutType: string
  placeholder: string
  isDev: boolean
  isSelected: boolean
  isPreviewRender?: boolean
  startValue: number
  rateCount: number
}
const props = defineProps<Props>()
const formValues = useFormValues()

const _dataValue = ref(null)

const list = computed(() => {
  let _val = []
  for (let i = props.startValue; i <= props.rateCount; i++) {
    _val.push(i)
  }
  return _val
})

const onSelectChange = (val: any) => {
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