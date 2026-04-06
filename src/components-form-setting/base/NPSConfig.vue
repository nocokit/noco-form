<template>
  <div class="setting-item">
    <a-typography-text type="secondary" class="block-title2">
      取值范围
      <a-tooltip placement="top">
        <template #title><span>开始值可以选择0，结束值最小值是3</span></template>
        <QuestionCircleOutlined />
      </a-tooltip>
    </a-typography-text>
  </div>
  <div class="g-2">
    <a-select v-model:value="comp.startValue" @change="updateField('startValue', $event)">
      <a-select-option v-for="item in comp.startValueList" :key="item" :value="item">
        {{ item }}
      </a-select-option>
    </a-select>
    <a-select v-model:value="comp.rateCount" @change="updateField('rateCount', $event)">
      <a-select-option v-for="item in END_OPTIONS" :key="item.value" :value="item.value">
        {{ item.label }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts" setup>
import { useSettingField } from '@/composables/useSettingField'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp
const { updateField } = useSettingField()

// NPS 结束值范围 3~10，静态常量，无需 onMounted 生成
const END_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  label: i + 3,
  value: i + 3,
}))
</script>

<style lang="scss" scoped>
.g-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
</style>
