<template>
  <SettingSwitch :comp="comp" field="dividerBorderType" label="虚线" />
</template>

<script lang="ts" setup>
import SettingSwitch from './SettingSwitch.vue'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp
</script>
