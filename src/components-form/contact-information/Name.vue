<template>
  <ContactInput v-bind="props" :icon="NameIcon" />
</template>

<script setup lang="ts">
import ContactInput from './ContactInput.vue'
import NameIcon from '/src/assets/form/name.svg'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
}

const props = defineProps<Props>()
</script>
