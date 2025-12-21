
<template>
  <div class="setting-row inline">
    <label>Display Description</label>
    <TwSwitch v-model="form.displayDescription" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

interface Props {
  form: any
}

const props = defineProps<Props>()
const form = ref(props.form)
const compStore = useSelectCompStore()

const handleChange = (value: boolean) => {
  compStore.updateGlobalFormConfig({
    displayDescription: value
  })
}
</script>
