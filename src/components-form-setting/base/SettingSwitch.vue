<template>
  <div class="setting-item h-42">
    <a-typography-text type="secondary" class="secondary">
      {{ label }}
      <a-tooltip v-if="tooltip" placement="top">
        <template #title><span>{{ tooltip }}</span></template>
        <QuestionCircleOutlined />
      </a-tooltip>
    </a-typography-text>
    <a-space direction="vertical" class="abs-r switch-r">
      <a-switch v-model:checked="comp[field]" @change="onChange" />
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { useSettingField } from '@/composables/useSettingField'

interface Props {
  comp: Record<string, any>
  field: string
  label: string
  tooltip?: string
  /** 是否更新全局表单配置（而非当前组件配置） */
  global?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  global: false,
})

const { updateField, updateGlobalField } = useSettingField()
const comp = props.comp

const onChange = (value: boolean) => {
  if (props.global) {
    updateGlobalField(props.field, value)
  } else {
    updateField(props.field, value)
  }
}
</script>
