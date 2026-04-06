<template>
  <ContactInput v-bind="props" :icon="PhoneIcon" />
</template>

<script setup lang="ts">
import ContactInput from './ContactInput.vue'
import PhoneIcon from '/src/assets/form/phone.svg'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
}

const props = defineProps<Props>()
</script>
