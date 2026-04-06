<template>
  <ContactInput v-bind="props" :icon="TelePhoneIcon" />
</template>

<script setup lang="ts">
import ContactInput from './ContactInput.vue'
import TelePhoneIcon from '/src/assets/form/telePhone.svg'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
}

const props = defineProps<Props>()
</script>
