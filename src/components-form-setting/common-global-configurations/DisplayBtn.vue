<template>
  <SettingSwitch :comp="form" field="displayBtn" label="表单按钮" tooltip="是否启动表单按钮" global />
</template>

<script lang="ts" setup>
import SettingSwitch from '../base/SettingSwitch.vue'

interface Props {
  form: Record<string, any>
}
const props = defineProps<Props>()
const form = props.form
</script>
