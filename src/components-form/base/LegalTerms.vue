<template>
  <div class="legal-terms-wrapper">
    <div class="legal-container" :class="{ error: showError }">
      <div class="checkbox-wrapper">
        <input
          v-model="accepted"
          type="checkbox"
          :id="checkboxId"
          class="legal-checkbox"
        />
        <label :for="checkboxId" class="checkbox-label">
          <div class="checkbox-box" :class="{ checked: accepted }">
            <i v-if="accepted" class="ri-check-line"></i>
          </div>
        </label>
      </div>

      <div class="legal-text">
        <p class="legal-content">
          {{ text }}
          <a
            v-if="privacyUrl"
            :href="privacyUrl"
            target="_blank"
            class="legal-link"
          >
            Privacy Policy
          </a>
          <span v-if="privacyUrl && termsUrl"> and </span>
          <a
            v-if="termsUrl"
            :href="termsUrl"
            target="_blank"
            class="legal-link"
          >
            Terms of Service
          </a>.
          <span v-if="gdprCompliant" class="gdpr-badge">
            <i class="ri-shield-check-line"></i>
            GDPR
          </span>
        </p>
      </div>
    </div>

    <div v-if="showError && !accepted" class="error-message">
      <i class="ri-error-warning-line"></i>
      <span>You must accept the terms to continue</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  type: string
  text?: string
  privacyUrl?: string
  termsUrl?: string
  gdprCompliant?: boolean
  required?: boolean
  isDev: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: 'I agree to the',
  privacyUrl: '#',
  termsUrl: '#',
  gdprCompliant: true,
  required: true
})

const accepted = ref(false)
const showError = ref(false)

const checkboxId = computed(() => `legal-checkbox-${Math.random().toString(36).substr(2, 9)}`)

const validate = () => {
  showError.value = props.required && !accepted.value
  return accepted.value || !props.required
}

defineExpose({
  validate
})
</script>

