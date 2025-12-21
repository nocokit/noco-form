<template>
  <div :title="isDev ? disableInputByDev : placeholder">
    <TwSwitch
      v-model="checked"
      :disabled="isDev"
      @change="updateValue"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { TwSwitch } from '@/components/ui'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'

interface Props {
  id: string
  placeholder: string
  value: boolean
  isDev: boolean
  dataList: Array<any>
}

const props = defineProps<Props>()
const emit = defineEmits(['update:value'])

const checked = ref(props.value || false)

watch(() => props.value, (newValue) => {
  checked.value = newValue
})

const updateValue = () => {
  emit('update:value', checked.value)
}

</script>
