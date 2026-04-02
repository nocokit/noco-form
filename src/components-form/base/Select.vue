<template>

  <a-space direction="vertical">
    <a-select
    class="item-comp"
    v-model:value="_dataValue"
    style="width: 100%"
    :disabled="isDev && isSelected"
    :placeholder="isDev && isSelected ? (placeholder || '请选择') + ' - 编辑状态无法选则': (placeholder || '请选择')" 
    :options="dataList"
  ></a-select>

    <a-radio-group v-if="isDev && isSelected" :value="dataValue"  :disabled="isDev" size="large">
    <a-radio  :key="isSelected + _updateKey" v-for="(item, _index) of dataList" :value="item" class="list-item" :style="layoutType === 'vertical' || isSelected ? radioVerticalStyle : radioStyle">
      <div class="editor-item"  @blur="changeValue($event, _index)" :contenteditable="!isPreviewRender" >{{ item.label }}</div>
      <span class="other-val" v-if="item.subType === 'other'">
        <a-input :disabled="isDev" class="item-comp" v-model="item.value" 
        placeholder="其他选项内容自定义" />
      </span>
      <span class="delete" v-if="dataList.length > 1 && !isPreviewRender" @click="deleteSubItem(_index)" :title="item.label">
        <CloseOutlined />
      </span>
    </a-radio>
  </a-radio-group>
  </a-space>
</template>
<script setup lang="ts">
import { Layout } from 'ant-design-vue';
import { ref, watch } from 'vue'
import { v4 as uuidv4  } from 'uuid'

interface Props {
  dataList: Array<any>
  dataValue: string
  layoutType: string
  placeholder: string
  isDev: boolean
  isSelected: boolean
  isPreviewRender?: boolean 
}


const radioVerticalStyle = ref({
  display: 'flex',
  // height: '40px',
  lineHeight: '40px',
});

const radioStyle = ref({
  height: '40px',
  lineHeight: '40px',
});
const props = defineProps<Props>()
const _dataValue = ref(props.dataValue ?? null)
const _updateKey = ref('')

watch(() => props.dataValue, (val) => {
  _dataValue.value = val ?? null
})


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
  const isOtherBool = props.dataList[index].subType === 'other'
  const value = !hasDataBool  ? (isOtherBool ? '其他': '选项') : innerText
  if(isOtherBool) {
    props.dataList[index].label = value
  } else {
    props.dataList[index].label = value
    props.dataList[index].value = value
  }

  updateKey()

}

</script>
<style lang="scss" scoped>
.item-comp {
  margin: 8px 0 20px;
}
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
  &:active,&:focus {
    border:1px solid #e0e0e0;
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
</style>