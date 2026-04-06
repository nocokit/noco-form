<template>
  <ContactInput v-bind="props" :icon="EmailIcon" />
</template>

<script setup lang="ts">
import ContactInput from './ContactInput.vue'
import EmailIcon from '/src/assets/form/email.svg'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
}

const props = defineProps<Props>()
</script>
