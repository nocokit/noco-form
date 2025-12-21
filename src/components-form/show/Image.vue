<template>
  <div class="image-wrapper relative group cursor-pointer rounded-3xl overflow-hidden">
    <!-- Image Display -->
    <div class="aspect-video relative bg-zinc-900">
      <img
        :src="imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426'"
        :alt="imageAlt || 'Image'"
        class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      />

      <!-- Overlay with Title and Description -->
      <div v-if="showOverlay" class="glass-overlay absolute inset-0 flex flex-col justify-end p-8">
        <div v-if="showBadge" class="flex items-center gap-3 mb-2">
          <span class="px-2 py-0.5 bg-blue-600 text-[10px] font-black rounded uppercase">
            {{ imageBadge || 'Feature' }}
          </span>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">
          {{ imageTitle || 'Image Title' }}
        </h2>
        <p v-if="imageDescription" class="text-zinc-300 text-sm mt-2 max-w-md leading-relaxed">
          {{ imageDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  imageUrl?: string
  imageTitle?: string
  imageDescription?: string
  imageBadge?: string
  imageAlt?: string
  showOverlay?: boolean
  showBadge?: boolean
  isDev?: boolean
  isSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showOverlay: true,
  showBadge: true,
  isDev: false,
  isSelected: false
})
</script>

<style scoped>
.image-wrapper {
  max-width: 100%;
  box-sizing: border-box;
}

.glass-overlay {
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
}
</style>
