<template>
  <SettingInput
    :comp="comp"
    field="buttonText"
    label="按钮文字"
    placeholder="请输入按钮文字（最多30个字）"
    :maxlength="30"
  />
  <SettingSwitch :comp="comp" field="buttonIconShowBool" label="显示图标" />
</template>

<script lang="ts" setup>
import SettingInput from './SettingInput.vue'
import SettingSwitch from './SettingSwitch.vue'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp
</script>
