<template>
  <div class="setting-item h-80 p-t-10">
    <a-typography-text type="secondary" class="secondary">布局方式</a-typography-text>
    <a-space direction="vertical" class="abs-r">
      <a-radio-group v-model:value="comp.layoutType" @change="onChange">
        <a-radio-button v-for="item in OPTIONS" :key="item.value" :value="item.value">
          {{ item.label }}
        </a-radio-button>
      </a-radio-group>
    </a-space>
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

const OPTIONS = [
  { label: '横向', value: 'horizontal' },
  { label: '纵向', value: 'vertical' },
]

const onChange = (event: Event) => {
  updateField('layoutType', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.secondary { margin: 10px 0; }
</style>
