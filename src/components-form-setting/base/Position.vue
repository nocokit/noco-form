<template>
  <SettingSelect :comp="comp" field="position" label="位置" :options="OPTIONS" />
</template>

<script lang="ts" setup>
import SettingSelect from './SettingSelect.vue'
import { optionData } from '../setting-config-data'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp

const OPTIONS = optionData.map(o => ({ label: o.name, value: o.value }))
</script>
