<template>
  <div class="video-wrapper relative group cursor-pointer border border-zinc-800 rounded-3xl overflow-hidden bg-[#121214] hover:border-zinc-700 transition-all p-4">
    <!-- Video Header -->
    <div class="mb-4 flex items-center justify-between px-2">
      <div class="flex items-center gap-2">
        <i class="ri-play-circle-line text-rose-500"></i>
        <span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          {{ videoLabel || 'Video' }}
        </span>
      </div>
      <i class="ri-fullscreen-line text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors"></i>
    </div>

    <!-- Video Player -->
    <div class="aspect-video bg-black rounded-xl relative overflow-hidden flex items-center justify-center">
      <!-- Video Element or Poster -->
      <div v-if="!isPlaying" class="absolute inset-0 bg-cover bg-center opacity-40 blur-[2px]"
           :style="{ backgroundImage: `url(${videoPoster || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2344'})` }">
      </div>

      <video
        v-if="videoUrl"
        ref="videoRef"
        :src="videoUrl"
        :poster="videoPoster"
        :autoplay="autoplay"
        :controls="controls && isPlaying"
        :loop="loop"
        class="w-full h-full object-cover"
        :class="{ 'hidden': !isPlaying }"
        @play="isPlaying = true"
        @pause="handlePause"
      ></video>

      <!-- Play Button Overlay -->
      <div
        v-if="!isPlaying"
        @click="playVideo"
        class="relative z-10 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform shadow-2xl cursor-pointer"
      >
        <i class="ri-play-fill text-white text-2xl ml-1"></i>
      </div>

      <!-- Progress Bar (when playing) -->
      <div v-if="isPlaying && controls" class="absolute bottom-4 left-4 right-4 flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-lg rounded-full border border-white/5">
        <div class="text-[10px] font-mono text-zinc-400">{{ formattedTime }}</div>
        <div class="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div class="h-full bg-blue-600" :style="{ width: progress + '%' }"></div>
        </div>
        <i class="ri-volume-2-line text-zinc-400 cursor-pointer"></i>
      </div>
    </div>

    <!-- Video Info -->
    <div class="p-4">
      <h3 class="text-sm font-semibold text-zinc-200">
        {{ videoTitle || 'Video Title' }}
      </h3>
      <p v-if="videoDescription" class="text-xs text-zinc-500 mt-1">
        {{ videoDescription }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  id?: string
  videoUrl?: string
  videoTitle?: string
  videoDescription?: string
  videoPoster?: string
  videoLabel?: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  isDev?: boolean
  isSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  controls: true,
  loop: false,
  isDev: false,
  isSelected: false
})

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const playVideo = () => {
  if (videoRef.value) {
    videoRef.value.play()
    isPlaying.value = true
  }
}

const handlePause = () => {
  if (!videoRef.value?.ended) {
    isPlaying.value = false
  }
}

const progress = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

const formattedTime = computed(() => {
  const minutes = Math.floor(currentTime.value / 60)
  const seconds = Math.floor(currentTime.value % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})
</script>

<style scoped>
.video-wrapper {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
