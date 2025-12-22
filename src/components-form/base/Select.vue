<template>
  <div :class="{ 'component-hidden': hidden }" class="flex flex-col gap-2">
    <div class="relative" v-if="!mode || mode === 'multiple'">
      <select
        class="item-comp w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-600"
        v-model="_dataValue"
        :disabled="isDev && isSelected || disabled || readonly"
        :multiple="mode === 'multiple'"
        @change="handleChange"
      >
        <option value="" disabled class="text-zinc-500">{{ isDev && isSelected ? (placeholder || '请选择') + ' - 编辑状态无法选择' : (placeholder || '请选择') }}</option>
        <option v-for="item in dataList" :key="item.value" :value="item.value" class="text-zinc-300">
          {{ item.label }}
        </option>
      </select>
      <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <div v-if="isDev && isSelected" class="flex flex-col gap-2">
      <div
        v-for="(item, _index) of dataList"
        :key="isSelected + _updateKey + _index"
        class="list-item flex items-center gap-2 relative"
        :class="layoutType === 'vertical' || isSelected ? 'flex-col items-start' : ''"
      >
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" :disabled="isDev" :value="item" class="w-4 h-4" />
          <div class="editor-item outline-none" @blur="changeValue($event, _index)" :contenteditable="!isPreviewRender">
            {{ item.label }}
          </div>
        </label>
        <span v-if="item.subType === 'other'" class="other-val flex-1">
          <input
            :disabled="isDev"
            class="item-comp w-full px-2 py-1 border-none rounded"
            v-model="item.value"
            placeholder="其他选项内容自定义"
          />
        </span>
        <span
          v-if="dataList.length > 1 && !isPreviewRender"
          @click="deleteSubItem(_index)"
          :title="item.label"
          class="delete cursor-pointer text-gray-400 hover:text-red-500"
        >
          ✕
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { type DisplayMode } from '@/views/FormEditor/comp-config-data'
import { useSelectCompStore } from '@/stores/selectCompStore'

interface Props {
  // 基础字段
  id?: string
  field?: string
  dataList?: Array<any>
  dataValue?: string
  layoutType?: string
  placeholder?: string
  isDev?: boolean
  isSelected?: boolean
  isPreviewRender?: boolean

  // 新增：响应式控制字段
  display?: DisplayMode
  hidden?: boolean
  disabled?: boolean
  readonly?: boolean

  // Select 特有配置
  mode?: 'multiple' | 'tags'
  showSearch?: boolean
  allowClear?: boolean
  dataSource?: any
}


const radioVerticalStyle = ref({
  display: 'flex',
  lineHeight: '40px',
})

const radioStyle = ref({
  height: '40px',
  lineHeight: '40px',
})

const props = withDefaults(defineProps<Props>(), {
  isDev: false,
  isSelected: false,
  isPreviewRender: false,
  layoutType: 'vertical',
  placeholder: '请选择',
  dataList: () => [],
  showSearch: false,
  allowClear: true
})

const emit = defineEmits<{
  change: [value: any]
  update: [field: string, value: any]
}>()

const store = useSelectCompStore()

const _dataValue = ref(null)
const _updateKey = ref('')

const updateKey = () => {
  _updateKey.value = uuidv4()
}

const deleteSubItem = (index: number) => {
  if (props.dataList) {
    props.dataList.splice(index, 1)
    updateKey()
  }
}

const changeValue = (event: any, index: number) => {
  if (!props.dataList) return

  const { innerHTML, innerText } = event.target
  const hasDataBool = innerText !== null && innerText !== '\n'
  const isOtherBool = props.dataList[index].subType === 'other'
  const value = !hasDataBool ? (isOtherBool ? '其他' : '选项') : innerText
  if (isOtherBool) {
    props.dataList[index].label = value
  } else {
    props.dataList[index].label = value
    props.dataList[index].value = value
  }

  updateKey()
}

// 处理选择变化
const handleChange = (value: any) => {
  emit('change', value)
  if (props.field) {
    emit('update', props.field, value)
  }
}

// 从数据源加载选项
const loadOptions = async () => {
  if (!props.dataSource || !props.id) {
    return
  }

  try {
    // TODO: Implement data source loading
    // const result = await store.loadComponentDataSource(props.id, props.dataSource)
    // if (result.success && result.data) {
    //   console.log('Select options loaded:', result.data)
    // }
    console.log('Data source loading not implemented yet:', props.dataSource)
  } catch (error) {
    console.error('Failed to load select options:', error)
  }
}

onMounted(() => {
  if (props.dataSource) {
    loadOptions()
  }
})

watch(() => props.dataSource, () => {
  if (props.dataSource) {
    loadOptions()
  }
}, { deep: true })

</script>
