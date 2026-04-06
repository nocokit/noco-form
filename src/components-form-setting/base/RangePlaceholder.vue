<template>
  <a-typography-text type="secondary" class="block-title">输入框提示（区间）</a-typography-text>
  <template v-if="comp.placeholderRange">
    <a-input
      placeholder="开始提示"
      allow-clear
      v-model:value="comp.placeholderRange[0]"
      @input="updateRange($event, 0)"
    />
    <a-input
      class="mt-8"
      placeholder="结束提示"
      allow-clear
      v-model:value="comp.placeholderRange[1]"
      @input="updateRange($event, 1)"
    />
  </template>
</template>

<script lang="ts" setup>
import { useSettingField } from '@/composables/useSettingField'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp
const { updateField } = useSettingField()

const updateRange = (event: Event, index: number) => {
  const val = [...comp.placeholderRange]
  val[index] = (event.target as HTMLInputElement).value
  updateField('placeholderRange', val)
}
</script>

<style lang="scss" scoped>
.block-title {
  display: block;
  margin-top: 10px;
  margin-bottom: 6px;
}
.mt-8 {
  margin-top: 8px;
}
</style>
