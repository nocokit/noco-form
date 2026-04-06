<template>
  <div class="setting-item h-50">
    <a-typography-text type="secondary" class="block-title2">{{ label }}</a-typography-text>
    <a-select
      v-model:value="comp[field]"
      :style="{ width: '120px' }"
      class="abs-r"
      @change="onChange"
    >
      <a-select-option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts" setup>
import { useSettingField } from '@/composables/useSettingField'

interface Option {
  label: string
  value: string | number
}

interface Props {
  comp: Record<string, any>
  field: string
  label: string
  options: Option[]
  global?: boolean
}

const props = withDefaults(defineProps<Props>(), { global: false })
const comp = props.comp
const { updateField, updateGlobalField } = useSettingField()

const onChange = (value: string | number) => {
  if (props.global) {
    updateGlobalField(props.field, value)
  } else {
    updateField(props.field, value)
  }
}
</script>
