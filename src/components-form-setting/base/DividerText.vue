<template>
  <SettingInput
    :comp="comp"
    field="dividerValue"
    label="分割线文本"
    placeholder="输入分割线文本"
    :maxlength="30"
    show-count
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
