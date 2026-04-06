<template>
  <div class="setting-item h-42">
    <a-typography-text type="secondary" class="secondary">最小值</a-typography-text>
    <a-input-number
      class="abs-r"
      v-model:value="comp.minValue"
      placeholder="最小值"
      @change="updateField('minValue', $event)"
    />
  </div>
  <div class="setting-item h-42">
    <a-typography-text type="secondary" class="secondary">最大值</a-typography-text>
    <a-input-number
      class="abs-r"
      v-model:value="comp.maxValue"
      placeholder="最大值"
      @change="updateField('maxValue', $event)"
    />
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
</script>
