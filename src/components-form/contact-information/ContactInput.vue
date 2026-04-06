<template>
  <a-input v-model:value="localValue" :placeholder="placeholder">
    <template #prefix>
      <img class="icon" :src="icon" alt="">
    </template>
  </a-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
  icon: string
}

const props = defineProps<Props>()
const formValues = useFormValues()
const localValue = ref(props.value || null)

watch(localValue, (val) => {
  if (formValues && props.id) formValues[props.id] = val ?? ''
})
</script>

<style lang="scss" scoped>
.icon {
  height: 18px;
}
</style>
