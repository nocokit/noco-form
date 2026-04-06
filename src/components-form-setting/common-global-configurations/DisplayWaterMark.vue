<template>
  <SettingSwitch
    :comp="form"
    field="displayWaterMark"
    label="水印"
    tooltip="可根据需求灵活使用水印，需要注意平衡品牌宣传，专业形象，版权所有权声明和用户体验"
    global
  />
  <a-input
    v-if="form.displayWaterMark"
    placeholder="请输入水印（最多15个字）"
    v-model:value="form.waterMarkText"
    @input="updateGlobalField('waterMarkText', ($event.target as HTMLInputElement).value)"
    :maxlength="15"
  />
</template>

<script lang="ts" setup>
import SettingSwitch from '../base/SettingSwitch.vue'
import { useSettingField } from '@/composables/useSettingField'

interface Props {
  form: Record<string, any>
}
const props = defineProps<Props>()
const form = props.form
const { updateGlobalField } = useSettingField()
</script>
