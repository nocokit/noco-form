<template>
  <SettingInput
    :comp="comp"
    field="description"
    label="描述/备注"
    placeholder="请输入描述"
    textarea
    :maxlength="200"
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
