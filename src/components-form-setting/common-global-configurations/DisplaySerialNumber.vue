
<template>
  <TwSwitch v-model="form.displayNumberSort" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

interface Props {
  form: any
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
})

const form = ref(props.form)
const compStore = useSelectCompStore()

const handleChange = (value: boolean) => {
  compStore.updateGlobalFormConfig({
    displayNumberSort: value
  })
}
</script>
