<template>
  <SettingSwitch :comp="comp" field="titleImageShow" label="显示标题图片" />

  <SettingInput
    :comp="comp"
    field="titleImageUrl"
    label="标题图片"
    placeholder="请输入图片URL"
    :maxlength="400"
  />

  <SettingInput
    :comp="comp"
    field="titleValue"
    label="表单标题"
    placeholder="请输入标题文字（最多30个字）"
    :maxlength="30"
  />

  <SettingSelect :comp="comp" field="titleSize" label="标题大小" :options="SIZE_OPTIONS" />

  <SettingSwitch :comp="comp" field="titleDescriptionShow" label="显示标题描述" />

  <SettingInput
    :comp="comp"
    field="titleDescription"
    label="标题描述"
    placeholder="请输入描述"
    textarea
    :maxlength="200"
    show-count
  />

  <SettingSelect :comp="comp" field="titleDescriptionPosition" label="位置(标题+描述)" :options="POSITION_OPTIONS" />
</template>

<script lang="ts" setup>
import SettingInput from '../base/SettingInput.vue'
import SettingSwitch from '../base/SettingSwitch.vue'
import SettingSelect from '../base/SettingSelect.vue'
import { optionData, textOrButtonSizeData } from '../setting-config-data'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp

const SIZE_OPTIONS     = textOrButtonSizeData.map(o => ({ label: o.name, value: o.value }))
const POSITION_OPTIONS = optionData.map(o => ({ label: o.name, value: o.value }))
</script>
