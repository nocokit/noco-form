<template>
  <ContactInput v-bind="props" :icon="IDIcon" />
</template>

<script setup lang="ts">
import ContactInput from './ContactInput.vue'
import IDIcon from '/src/assets/form/id.svg'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
}

const props = defineProps<Props>()
</script>
