<template>
  <div class="cascader-wrapper" :class="{ 'component-hidden': hidden }">
    <label v-if="label" class="cascader-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <div class="cascader-container" @click="toggleDropdown">
      <div class="cascader-input" :class="{ disabled: isDev || disabled || readonly }">
        <span v-if="selectedPath.length" class="selected-value">
          {{ selectedPath.join(' / ') }}
        </span>
        <span v-else class="placeholder">{{ placeholder }}</span>
        <i class="ri-arrow-down-s-line dropdown-icon" :class="{ open: isOpen }"></i>
      </div>

      <div v-if="isOpen && !disabled && !readonly" class="cascader-dropdown">
        <div class="cascader-level" v-for="(level, levelIndex) in visibleLevels" :key="levelIndex">
          <div
            v-for="option in level"
            :key="option.value"
            class="cascader-option"
            :class="{ active: isOptionSelected(levelIndex, option.value) }"
            @click.stop="selectOption(levelIndex, option)"
          >
            <span>{{ option.label }}</span>
            <i v-if="option.children && option.children.length" class="ri-arrow-right-s-line"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { type DisplayMode } from '@/views/FormEditor/comp-config-data'
import { useSelectCompStore } from '@/stores/selectCompStore'

interface CascaderOption {
  label: string
  value: string
  children?: CascaderOption[]
  disabled?: boolean
}

interface Props {
  // 基础字段
  id?: string
  field?: string
  type?: string
  label?: string
  placeholder?: string
  required?: boolean
  options?: CascaderOption[]
  isDev?: boolean
  isSelected?: boolean
  isPreviewRender?: boolean
  dataValue?: string[]

  // 新增：响应式控制字段
  display?: DisplayMode
  hidden?: boolean
  disabled?: boolean
  readonly?: boolean

  // 新增：数据源
  dataSource?: any
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  required: false,
  isDev: false,
  isSelected: false,
  isPreviewRender: false,
  options: () => [
    {
      label: '中国',
      value: 'cn',
      children: [
        {
          label: '北京',
          value: 'bj',
          children: [
            { label: '海淀区', value: 'hd' },
            { label: '朝阳区', value: 'cy' }
          ]
        },
        {
          label: '上海',
          value: 'sh',
          children: [
            { label: '浦东新区', value: 'pd' },
            { label: '黄浦区', value: 'hp' }
          ]
        }
      ]
    }
  ]
})

const emit = defineEmits<{
  change: [value: string[]]
  update: [field: string, value: string[]]
}>()

const store = useSelectCompStore()

const isOpen = ref(false)
const selectedValues = ref<string[]>(props.dataValue || [])
const selectedPath = ref<string[]>([])

const visibleLevels = computed(() => {
  const levels: CascaderOption[][] = []
  let currentOptions = props.options || []

  levels.push(currentOptions)

  selectedValues.value.forEach((value, index) => {
    const selected = currentOptions.find(opt => opt.value === value)
    if (selected && selected.children) {
      currentOptions = selected.children
      levels.push(currentOptions)
    }
  })

  return levels
})

const toggleDropdown = () => {
  if (props.isDev || props.disabled || props.readonly) {
    return
  }
  isOpen.value = !isOpen.value
}

const isOptionSelected = (levelIndex: number, value: string) => {
  return selectedValues.value[levelIndex] === value
}

const selectOption = (levelIndex: number, option: CascaderOption) => {
  selectedValues.value = selectedValues.value.slice(0, levelIndex)
  selectedValues.value.push(option.value)

  selectedPath.value = selectedPath.value.slice(0, levelIndex)
  selectedPath.value.push(option.label)

  if (!option.children || option.children.length === 0) {
    isOpen.value = false
    // 触发 change 事件
    emit('change', selectedValues.value)
    if (props.field) {
      emit('update', props.field, selectedValues.value)
    }
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
    //   console.log('Cascader options loaded:', result.data)
    // }
    console.log('Data source loading not implemented yet:', props.dataSource)
  } catch (error) {
    console.error('Failed to load cascader options:', error)
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

watch(() => props.dataValue, (newVal) => {
  if (newVal) {
    selectedValues.value = newVal
  }
}, { immediate: true })
</script>

