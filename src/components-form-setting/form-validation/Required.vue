<template>
  <SettingSwitch :comp="comp" field="isRequired" label="必填" />
</template>

<script lang="ts" setup>
import SettingSwitch from '../base/SettingSwitch.vue'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp
</script>
