<template>
  <!-- 图标选择 -->
  <div class="setting-item h-50">
    <a-typography-text type="secondary" class="block-title2">图标</a-typography-text>
  </div>
  <a-radio-group class="rate-character-icon" v-model:value="comp.rateCharacter" @change="onChange('rateCharacter', $event)">
    <a-radio-button v-for="icon in ICONS" :key="icon" :value="icon" @click="updateField('rateCharacter', icon)">
      {{ icon }}
    </a-radio-button>
  </a-radio-group>

  <!-- 数量 -->
  <SettingSelect :comp="comp" field="rateCount" label="数量" :options="COUNT_OPTIONS" />

  <!-- 允许半选 -->
  <SettingSwitch :comp="comp" field="rateAllowHalf" label="允许半选" />
</template>

<script lang="ts" setup>
import SettingSelect from './SettingSelect.vue'
import SettingSwitch from './SettingSwitch.vue'
import { useSettingField } from '@/composables/useSettingField'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp
const { updateField } = useSettingField()

const ICONS = ['⭐️', '❤️', '😊', '🔥', '🌩']

const COUNT_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1} 个`,
  value: i + 1,
}))

const onChange = (field: string, event: Event) => {
  updateField(field, (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.rate-character-icon {
  display: flex;
  flex: 0 0 auto;
}
</style>
