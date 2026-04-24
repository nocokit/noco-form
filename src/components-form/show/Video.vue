<template>
  <video :src="videoUrl" :alt="altText" controls style="width: 100%; height: auto;"></video>
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

const videoUrl = computed(() => props.url || props.titleImageUrl || props.value || '')
const altText = computed(() => props.alt || props.titleValue || 'Video')
</script>
<style lang="scss">
</style>