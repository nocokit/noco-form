<template>
  <ContactInput v-bind="props" :icon="WXIcon" />
</template>

<script setup lang="ts">
import ContactInput from './ContactInput.vue'
import WXIcon from '/src/assets/form/wx.svg'

interface Props {
  id: string
  placeholder: string
  value: string | null
  isDev: boolean
}

const props = defineProps<Props>()
</script>
