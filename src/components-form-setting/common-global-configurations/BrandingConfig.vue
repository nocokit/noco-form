<template>
  <div class="branding-config">
    <!-- Branding Section Header -->
    <section class="branding-section">
      <div class="section-header">
        <div class="section-title-wrapper">
          <i class="ri-vip-crown-line crown-icon"></i>
          <span class="section-title">{{ t('formSettings.brandingPro') }}</span>
        </div>
        <span class="paid-badge">{{ t('formSettings.paidFeature') }}</span>
      </div>

      <!-- PRO Locked Card -->
      <div class="pro-card" @mouseenter="showUnlock = true" @mouseleave="showUnlock = false">
        <div class="pro-content">
          <div class="pro-header">
            <span class="pro-title">{{ t('formSettings.removePoweredBy') }}</span>
            <i class="ri-lock-line lock-icon"></i>
          </div>

          <!-- Badge Preview -->
          <div class="badge-preview">
            <div class="badge-icon-wrapper">
              <div class="badge-icon">N</div>
            </div>
            <div class="badge-text-wrapper">
              <p class="badge-text">{{ t('formSettings.builtWithNoco') }}</p>
              <i class="ri-heart-line heart-icon"></i>
            </div>
          </div>

          <p class="pro-support">{{ t('formSettings.brandingSupport') }}</p>
        </div>

        <!-- Hover Unlock Overlay -->
        <div class="unlock-overlay" :class="{ show: showUnlock }">
          <button class="unlock-button" @click="handleUpgradeClick">{{ t('formSettings.unlockNow') }}</button>
        </div>
      </div>
    </section>

    <!-- Upgrade Modal -->
    <div v-if="showUpgradeModal" class="upgrade-modal-overlay" @click="closeModal">
      <div class="upgrade-modal" @click.stop>
        <button class="modal-close" @click="closeModal">
          <i class="ri-close-line"></i>
        </button>

        <div class="modal-icon">
          <i class="ri-vip-crown-fill"></i>
        </div>

        <h3 class="modal-title">{{ t('formSettings.upgradeToPro') }}</h3>
        <p class="modal-description">
          {{ t('formSettings.upgradeDesc') }}
        </p>

        <div class="modal-features">
          <div class="feature-item">
            <i class="ri-check-line"></i>
            <span>{{ t('formSettings.removePoweredByBadge') }}</span>
          </div>
          <div class="feature-item">
            <i class="ri-check-line"></i>
            <span>{{ t('formSettings.uploadCustomLogo') }}</span>
          </div>
          <div class="feature-item">
            <i class="ri-check-line"></i>
            <span>{{ t('formSettings.fullWhiteLabeling') }}</span>
          </div>
          <div class="feature-item">
            <i class="ri-check-line"></i>
            <span>{{ t('formSettings.prioritySupport') }}</span>
          </div>
        </div>

        <button class="upgrade-button">
          <i class="ri-vip-crown-line"></i>
          {{ t('formSettings.upgradeToPro') }}
          <i class="ri-arrow-right-line"></i>
        </button>

        <p class="modal-footer">{{ t('formSettings.freeTrial') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  form?: any
}

const props = defineProps<Props>()

const showUpgradeModal = ref(false)
const showUnlock = ref(false)

const handleUpgradeClick = () => {
  showUpgradeModal.value = true
}

const closeModal = () => {
  showUpgradeModal.value = false
}
</script>

<style scoped>
.branding-config {
  padding-top: 16px;
  border-top: 1px solid #27272a;
}

.branding-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.crown-icon {
  font-size: 14px;
  color: rgba(245, 158, 11, 0.8);
}

.section-title {
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(245, 158, 11, 0.8);
}

.paid-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(245, 158, 11, 0.6);
}

/* PRO Card */
.pro-card {
  background: rgba(24, 24, 27, 0.3);
  border: 1px solid #27272a;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.pro-content {
  position: relative;
  z-index: 1;
}

.pro-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.pro-title {
  font-size: 12px;
  font-weight: 700;
  color: #a1a1aa;
}

.lock-icon {
  font-size: 16px;
  color: #f59e0b;
}

/* Badge Preview */
.badge-preview {
  background: rgba(9, 9, 11, 0.5);
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.badge-icon-wrapper {
  width: 24px;
  height: 24px;
  background: #27272a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-icon {
  font-size: 10px;
  font-weight: 900;
  font-style: italic;
  color: #71717a;
}

.badge-text-wrapper {
  text-align: center;
}

.badge-text {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #52525b;
  margin: 0 0 4px 0;
}

.heart-icon {
  font-size: 10px;
  color: #3f3f46;
}

/* Support Message */
.pro-support {
  font-size: 10px;
  text-align: center;
  color: #52525b;
  line-height: 1.6;
  margin: 0;
  padding: 0 8px;
}

/* Unlock Overlay */
.unlock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(245, 158, 11, 0.05);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 2;
}

.unlock-overlay.show {
  opacity: 1;
}

.unlock-button {
  background: #f59e0b;
  color: #09090b;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
  transition: transform 0.2s;
}

.unlock-button:active {
  transform: scale(0.95);
}

/* Upgrade Modal */
.upgrade-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.upgrade-modal {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 24px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: #71717a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #27272a;
  color: #a1a1aa;
}

.modal-close i {
  font-size: 20px;
}

.modal-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.modal-icon i {
  font-size: 32px;
  color: white;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-align: center;
  margin: 0 0 12px 0;
}

.modal-description {
  font-size: 14px;
  color: #a1a1aa;
  text-align: center;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.modal-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.1);
  border-radius: 12px;
}

.feature-item i {
  font-size: 16px;
  color: #f59e0b;
  flex-shrink: 0;
}

.feature-item span {
  font-size: 13px;
  color: #e4e4e7;
  font-weight: 500;
}

.upgrade-button {
  width: 100%;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
  transition: all 0.2s;
}

.upgrade-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
}

.upgrade-button:active {
  transform: translateY(0);
}

.upgrade-button i {
  font-size: 16px;
}

.modal-footer {
  font-size: 12px;
  color: #71717a;
  text-align: center;
  margin: 16px 0 0 0;
}
</style>
