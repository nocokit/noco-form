<template>
  <a-checkbox-group
    :value="_checkedValue"
    :options="dataList"
    :disabled="isDev"
    :style="layoutType === 'vertical' || isSelected ? radioVerticalStyle : radioStyle"
    :class="{ 'group-item': true, 'group-item-select': isSelected }"
    :key="isSelected + _updateKey"
    @change="onCheckChange"
  >
    <template #label="{ label, subType, value, _index }" class="item list-item">
      <div class="editor-item" :contenteditable="!isPreviewRender" @blur="changeValue($event, _index)">{{ label }}</div>
      <span class="other-val" v-if="subType === 'other'">
        <a-input :disabled="isDev" class="item-comp" :value="value" placeholder="待填表者更新" />
      </span>
      <span class="delete" v-if="dataList.length > 1 && !isPreviewRender" @click="deleteSubItem(_index)" :title="label">
        <CloseOutlined />
      </span>
    </template>
  </a-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditableList } from '@/composables/useEditableList'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  dataList: Array<any>
  dataValue?: any[]
  layoutType: string
  isDev: boolean
  isSelected: boolean
  isPreviewRender?: boolean
}

const props = defineProps<Props>()
const { _updateKey, deleteSubItem, changeValue } = useEditableList(props.dataList)
const formValues = useFormValues()

const _checkedValue = ref(props.dataValue ?? [])

const onCheckChange = (val: any[]) => {
  _checkedValue.value = val
  if (formValues && props.id) formValues[props.id] = val
}

const radioVerticalStyle = { display: 'flex', lineHeight: '40px' }
const radioStyle = { display: 'inline-block', minHeight: '40px', lineHeight: '40px' }
</script>

<style lang="scss" scoped>
::v-deep {
  .ant-checkbox-group-item {
    position: relative;
    min-height: 40px;
    line-height: 40px;
    width: 100%;

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

  span.ant-checkbox {
    position: absolute;
    top: 12px;
  }
}

.other-val {
  display: block;
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

::v-deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-checkbox-disabled+span) {
  color: #000;
}

::v-deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-checkbox .ant-checkbox-input) {
  display: inline;
}
</style>
