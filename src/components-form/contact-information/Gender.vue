<template>
  <div
    class="group-item flex flex-col space-y-3"
    :key="isSelected + _updateKey"
  >
    <label
      v-for="(option, index) in useOtherDataList ? [...dataList,...dataOtherList]: dataList"
      :key="option.value"
      class="flex items-center gap-3 cursor-pointer group/item"
      :class="{'pointer-events-none': isDev}"
    >
      <input
        type="checkbox"
        :value="option.value"
        :checked="Array.isArray(dataValue) ? dataValue.includes(option.value) : false"
        :disabled="isDev"
        class="w-4 h-4 text-blue-600 border border-zinc-700 rounded bg-zinc-800/50 focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div
        class="editor-item outline-none text-sm text-zinc-400"
        contenteditable="true"
        @blur="changeValue($event, option._index !== undefined ? option._index : index)"
      >
        {{ option.label }}
      </div>
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4  } from 'uuid'

interface Props {
  dataList: Array<any>
  useOtherDataList: boolean
  dataOtherList:  Array<any>
  dataValue: string
  isDev: boolean
  isSelected: boolean
}

const props = defineProps<Props>()
const _updateKey = ref('')

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

</script>
