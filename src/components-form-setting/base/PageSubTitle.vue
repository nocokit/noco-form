<template>
  <SettingInput
    :comp="comp"
    field="pageSubTitle"
    label="分页标题"
    placeholder="请输入分页标题"
    textarea
    :maxlength="50"
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
