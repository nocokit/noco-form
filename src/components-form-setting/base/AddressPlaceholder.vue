<template>
  <SettingInput
    :comp="comp"
    field="address_placeholder"
    label="选择框省/市/区提示"
    placeholder="输入框提示"
  />
  <SettingInput
    :comp="comp"
    field="address_detail_placeholder"
    label="详细地址输入框提示"
    placeholder="输入框提示"
  />
</template>

<script lang="ts" setup>
import SettingInput from './SettingInput.vue'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp
</script>
