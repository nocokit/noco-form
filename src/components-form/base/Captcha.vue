<template>
  <div class="captcha-wrapper" style="width: 100%; max-width: 100%; box-sizing: border-box;">
    <div class="flex gap-4 items-start p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
      <div class="w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
           :class="agreed ? 'bg-indigo-600' : 'bg-zinc-800 border border-zinc-700'"
           @click="toggleAgreement">
        <input
          v-model="agreed"
          type="checkbox"
          :id="checkboxId"
          class="hidden"
          :disabled="isDev"
        />
        <svg v-if="agreed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white">
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
      </div>
      <p class="text-xs text-zinc-400 leading-relaxed">
        I'm not a robot
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  type: string
  label?: string
  required?: boolean
  isDev: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Legal Terms',
  required: true
})

const agreed = ref(false)

const checkboxId = computed(() => `legal-terms-${Math.random().toString(36).substr(2, 9)}`)

const toggleAgreement = () => {
  if (!props.isDev) {
    agreed.value = !agreed.value
  }
}
</script>

