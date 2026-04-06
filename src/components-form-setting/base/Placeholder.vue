<template>
  <SettingInput
    :comp="comp"
    field="placeholder"
    label="输入框提示"
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
