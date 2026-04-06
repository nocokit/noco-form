<template>
  <a-space direction="vertical">
    <a-radio-group :value="_selected" :disabled="isDev" size="large" @change="onRadioChange">
      <a-radio
        :key="isSelected + _updateKey"
        v-for="(item, _index) of dataList"
        :value="item"
        class="list-item"
        :style="layoutType === 'vertical' || isSelected ? radioVerticalStyle : radioStyle"
      >
        <div class="editor-item" @blur="changeValue($event, _index)" :contenteditable="!isPreviewRender">{{ item.label }}</div>
        <span class="other-val" v-if="item.subType === 'other'">
          <a-input :disabled="isDev" class="item-comp" v-model="item.value" placeholder="其他选项内容自定义" />
        </span>
        <span class="delete" v-if="dataList.length > 1 && !isPreviewRender" @click="deleteSubItem(_index)" :title="item.label">
          <CloseOutlined />
        </span>
      </a-radio>
    </a-radio-group>
  </a-space>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEditableList } from '@/composables/useEditableList'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  dataList: Array<any>
  dataValue: string
  layoutType: string
  isDev: boolean
  isSelected: boolean
  isPreviewRender?: boolean
}

const props = defineProps<Props>()
const { _updateKey, deleteSubItem, changeValue } = useEditableList(props.dataList)
const formValues = useFormValues()

const _selected = ref(props.dataValue ?? null)

watch(() => props.dataValue, val => { _selected.value = val ?? null })

const onRadioChange = (e: any) => {
  _selected.value = e.target.value
  // e.target.value 是整个 dataList item 对象，写入 formValues 时只取 .value 字符串
  const item = e.target.value
  if (formValues && props.id) formValues[props.id] = item?.value ?? item
}

const radioVerticalStyle = { display: 'flex', lineHeight: '40px' }
const radioStyle = { height: '40px', lineHeight: '40px' }
</script>

<style lang="scss" scoped>
::v-deep {
  .ant-radio-group {
    .ant-radio {
      position: absolute;
      top: 12px;
    }
  }
}

.editor-item {
  outline: none;
  margin-left: 15px;
  &:active, &:focus {
    border: 1px solid #e0e0e0;
    padding: 0px 12px 0px 10px;
    border-radius: 6px;
  }
}

::v-deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-radio-group) {
  width: 100%;
  display: block;
}

::v-deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-radio-wrapper span.ant-radio+*) {
  color: #000;
}

::v-deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-radio-wrapper .ant-radio-input) {
  display: inline;
}

.list-item {
  position: relative;
  .delete {
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
</style>
