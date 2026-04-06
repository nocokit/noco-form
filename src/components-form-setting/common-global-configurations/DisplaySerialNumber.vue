<template>
  <SettingSwitch :comp="form" field="displayNumberSort" label="组件序号" tooltip="批量操作：编号的显示隐藏" global />
</template>

<script lang="ts" setup>
import SettingSwitch from '../base/SettingSwitch.vue'

interface Props {
  form: Record<string, any>
}
const props = defineProps<Props>()
const form = props.form
</script>
