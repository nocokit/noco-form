<template>
  <SettingSelect :comp="comp" field="size" label="大小" :options="OPTIONS" />
</template>

<script lang="ts" setup>
import SettingSelect from './SettingSelect.vue'
import { textOrButtonSizeData } from '../setting-config-data'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp

const OPTIONS = textOrButtonSizeData.map(o => ({ label: o.name, value: o.value }))
</script>
