<template>
  <SettingSwitch
    :comp="form"
    field="displayDescription"
    label="组件描述"
    tooltip="批量操作：针对有值的描述字段显示隐藏操作，没有赋值预览页面会自动隐藏"
    global
  />
</template>

<script lang="ts" setup>
import SettingSwitch from '../base/SettingSwitch.vue'

interface Props {
  form: Record<string, any>
}
const props = defineProps<Props>()
const form = props.form
</script>
