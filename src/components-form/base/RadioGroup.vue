<template>
  <div
    :class="[
      'group-item flex flex-col space-y-1.5',
      { 'component-hidden': hidden }
    ]"
    :key="isSelected + _updateKey"
  >
    <label
      v-for="(item, _index) in dataList"
      :key="item.value"
      class="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-all cursor-pointer group/item"
    >
      <div class="flex items-center gap-4">
        <div class="relative flex items-center">
          <input
            type="radio"
            :name="field || id"
            :disabled="isDev || disabled || readonly"
            :value="item.value"
            :checked="dataValue === item.value"
            @change="handleRadioChange(item.value)"
            class="radio-input absolute opacity-0 w-0 h-0"
          />
          <div class="radio-box w-5 h-5 border-2 border-zinc-700 bg-zinc-800/50 rounded-full flex items-center justify-center transition-all duration-200">
            <div class="w-2.5 h-2.5 bg-blue-500 rounded-full transform scale-0 opacity-0 transition-all duration-200"></div>
          </div>
        </div>
        <div class="editor-item outline-none text-sm font-medium group-hover/item:text-zinc-100" :class="dataValue === item.value ? 'text-zinc-300' : 'text-zinc-400'" :contenteditable="!isPreviewRender" @blur="changeValue($event, _index)">
          {{ item.label }}
        </div>
        <span v-if="item.subType === 'other'" class="other-val ml-2">
          <input
            :disabled="isDev"
            class="item-comp px-3 py-1.5 border border-zinc-700/60 rounded-lg bg-zinc-900/40 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-blue-500/50 focus:bg-zinc-900/60 focus:outline-none transition-all"
            :value="item.value"
            placeholder="待填表者更新"
          />
        </span>
      </div>
      <button
        v-if="dataList.length > 1 && !isPreviewRender"
        @click.prevent="deleteSubItem(_index)"
        :title="item.label"
        class="delete w-4 h-4 text-zinc-700 opacity-0 group-hover/item:opacity-100 hover:text-rose-500 transition-all flex-shrink-0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { type DisplayMode } from '@/views/FormEditor/comp-config-data'

interface Props {
  // 基础字段
  id?: string
  field?: string
  dataList: Array<any>
  dataValue: string
  isDev: boolean
  isSelected: boolean
  isPreviewRender?: boolean

  // 新增：响应式控制字段
  display?: DisplayMode
  hidden?: boolean
  disabled?: boolean
  readonly?: boolean

  // 新增：数据源
  dataSource?: any
}

const props = defineProps<Props>()
const emit = defineEmits<{
  change: [value: any]
  update: [field: string, value: any]
}>()

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
  const hasDataBool = innerText !== null && innerText !== '\n'
  const isOtherBool = props.dataList[index].subType === 'other'
  const value = !hasDataBool ? (isOtherBool ? '其他' : '选项') : innerText
  const isChangeBool = props.dataList[index].label !== value
  if (!isChangeBool) {
    return
  }
  if (isOtherBool) {
    props.dataList[index].label = value
  } else {
    props.dataList[index].label = value
    props.dataList[index].value = value
  }

  updateKey()
}

// 处理单选框变化
const handleRadioChange = (value: any) => {
  handleChange(value)
}

// 新增：处理值变化，触发 Store 更新
const handleChange = (value: any) => {
  emit('change', value)
  if (props.field) {
    emit('update', props.field, value)
  }
}

const radioVerticalStyle = ref({
  display: 'flex',
  flexDirection: 'column',
  lineHeight: '40px',
})

const radioStyle = ref({
  display: 'inline-block',
  minHeight: '40px',
  lineHeight: '40px'
})
</script>

