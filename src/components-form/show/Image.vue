<template>
  <img :src="imageUrl" :alt="altText" style="max-width: 100%; height: auto;">
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  value?: string
  titleImageUrl?: string
  url?: string
  alt?: string
  titleValue?: string
  isDev: boolean
}

const props = defineProps<Props>()

const imageUrl = computed(() => props.url || props.titleImageUrl || props.value || '')
const altText = computed(() => props.alt || props.titleValue || 'Image')
</script>
<style lang="scss">
</style>