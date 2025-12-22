<template>
  <div class="image-component">
    <div class="image-container" :style="containerStyle">
      <img
        :src="imageUrl || defaultImageUrl"
        :alt="imageAlt || 'Image'"
        class="image-element"
      />

      <div v-if="showOverlay" class="image-overlay">
        <div v-if="showBadge && imageBadge" class="badge-wrapper">
          <span class="badge">{{ imageBadge }}</span>
          <div class="divider"></div>
        </div>
        <h2 v-if="imageTitle" class="image-title">{{ imageTitle }}</h2>
        <p v-if="imageDescription" class="image-description">{{ imageDescription }}</p>
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
  imageAspectRatio?: string
  showOverlay?: boolean
  showBadge?: boolean
  isDev?: boolean
  isSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  imageAspectRatio: '16/9',
  showOverlay: true,
  showBadge: true,
  isDev: false,
  isSelected: false
})

const defaultImageUrl = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426'

const containerStyle = computed(() => {
  return {
    aspectRatio: props.imageAspectRatio || '16/9'
  }
})
</script>

<style scoped>
.image-component {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.image-container {
  position: relative;
  width: 100%;
  background-color: #18181b;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
}

.image-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.8;
  transition: opacity 0.7s ease;
}

.image-container:hover .image-element {
  opacity: 1;
}

.image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
  pointer-events: none;
}

.badge-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.badge {
  padding: 0.125rem 0.5rem;
  background-color: #2563eb;
  color: white;
  font-size: 10px;
  font-weight: 900;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.divider {
  flex: 1;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

.image-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  letter-spacing: -0.025em;
  margin: 0;
}

.image-description {
  color: #d4d4d8;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  max-width: 28rem;
  line-height: 1.625;
}
</style>
