
<template>
  <div class="setting-row inline">
    <label>Required</label>
    <TwSwitch v-model="comp.isRequired" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

interface Props {
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)
const compStore = useSelectCompStore()

const handleChange = (value: boolean) => {
  compStore.updateCurrentComp({
    isRequired: value
  })
}
</script>

