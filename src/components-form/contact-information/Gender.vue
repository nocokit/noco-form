<template>
  <a-checkbox-group :value="_genderValue" :options="useOtherDataList ? [...dataList,...dataOtherList]: dataList"
    :disabled="isDev"
    :style="layoutType === 'vertical' || isSelected ? radioVerticalStyle : radioStyle"
    :class="{
      'group-item': true,
      'group-item-select': isSelected
    }"
    :key="isSelected + _updateKey"
    @change="onGenderChange">
    <template #label="{ label, subType, value, _index }" class="item list-item ">
      <div class="editor-item" contenteditable="true" @blur="changeValue($event, _index)">{{ label }}</div>
    </template>
  </a-checkbox-group>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4  } from 'uuid'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  dataList: Array<any>
  useOtherDataList: boolean
  dataOtherList:  Array<any>
  dataValue: string
  layoutType: string
  isDev: boolean
  isSelected: boolean
}

const props = defineProps<Props>()
const formValues = useFormValues()
const _updateKey = ref('')
const _genderValue = ref(props.dataValue ?? [])

const onGenderChange = (val: any[]) => {
  _genderValue.value = val
  if (formValues && props.id) formValues[props.id] = val?.[0] ?? ''
}

const updateKey = () => {
  _updateKey.value = uuidv4()
}

const deleteSubItem = (index: number) => {
  props.dataList.splice(index, 1)
  updateKey()
}

const changeValue = (event: any, index: number) => {
  const { innerHTML, innerText } = event.target
  const hasDataBool = innerText !== null &&  innerText !== '\n'
  const isOtherBool = index === 2
  const value = !hasDataBool  ? (isOtherBool ? '其他': '选项') : innerText

  if(isOtherBool) {
    const _val = value && value.length > 20 ? value.slice(0, 20) : value
    props.dataOtherList[0].label = _val
    props.dataOtherList[0].value = _val
  } else {
    props.dataList[index].label = value
    props.dataList[index].value = value
  }

  updateKey()

}

const radioVerticalStyle = ref({
  display: 'flex',
  lineHeight: '40px',
});

const radioStyle = ref({
  display: 'inline-block',
  minHeight: '40px',
  lineHeight: '40px'
});

</script>
<style lang="scss" scoped>
::v-deep {
  .ant-checkbox-group-item {
    position: relative;
    min-height: 40px;
    line-height: 40px;
    width: 100%;

    .delete  {
    display: none;
  }

  &:hover, &:active, &:focus {
    .delete {
      position: absolute;
      display: block;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
  }

  span.ant-checkbox {
    position: absolute;
    top:12px;
  }
}

.other-val {
  display: block;
}



::v-deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-checkbox-disabled+span) {
  color: #000;
}


::v-deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-checkbox .ant-checkbox-input) {
  display: inline;
}

.editor-item {
  outline: none;
  margin-left: 15px;
  &:active,&:focus {
    border:1px solid #e0e0e0;
    padding: 0px 12px 0px 10px;
    border-radius: 6px;
  }
}


</style>