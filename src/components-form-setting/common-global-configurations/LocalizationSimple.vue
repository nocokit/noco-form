<template>
  <div class="localization-simple">
    <!-- 表单呈现语言 -->
    <section class="locale-section">
      <div class="section-header">
        <div class="header-left">
          <i class="ri-global-line"></i>
          <h3 class="section-title">表单呈现语言</h3>
        </div>
        <span class="user-badge">FOR USER</span>
      </div>

      <div class="locale-controls">
        <div class="select-wrapper group">
          <select v-model="runtimeLocale" @change="handleRuntimeLocaleChange" class="locale-select">
            <option value="zh-CN">简体中文 (Simplified Chinese)</option>
            <option value="en-US">English (US)</option>
            <option value="ja-JP">日本語 (Japanese)</option>
          </select>
          <i class="ri-arrow-down-s-line select-arrow"></i>
        </div>

        <p class="locale-description">设置填表人看到的语言（包括按钮、验证提示和系统默认文本）。</p>
      </div>

      <!-- AI 智能翻译 -->
      <div class="ai-translate-card" @click="handleAILocalize">
        <div class="ai-card-header">
          <div class="ai-icon-badge">
            <i class="ri-sparkling-line ai-sparkle"></i>
          </div>
          <span class="ai-title">AI 智能翻译 (Beta)</span>
        </div>
        <p class="ai-description">检测当前表单内容，一键自动翻译至上述所选的目标语言。</p>
        <div class="ai-action">
          立即翻译所有标签
          <i class="ri-arrow-right-line ai-action-arrow"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

interface Props {
  form?: any
}

const props = defineProps<Props>()

// Initialize from localStorage or default
const getInitialLocale = () => {
  const saved = localStorage.getItem('noco-form-runtime-locale')
  return saved || 'zh-CN'
}

const runtimeLocale = ref(getInitialLocale())

const handleRuntimeLocaleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value
  runtimeLocale.value = newLocale

  // Save to localStorage
  localStorage.setItem('noco-form-runtime-locale', newLocale)

  // Update form config if exists
  if (props.form) {
    props.form.runtimeLocale = newLocale
  }

  // Emit event or trigger update
  console.log('Runtime locale changed to:', newLocale)

  // Show notification
  showNotification(`Language changed to ${newLocale}`)
}

const handleAILocalize = () => {
  showNotification('AI Translation feature coming soon!')
}

const showNotification = (message: string) => {
  // Simple notification
  const notification = document.createElement('div')
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 24px;
    background: #6366f1;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    animation: slideIn 0.3s ease;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease'
    setTimeout(() => notification.remove(), 300)
  }, 2000)
}

// Add CSS animations
onMounted(() => {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
})
</script>

<style scoped>
.localization-simple {
  margin-bottom: 24px;
}

.locale-section {
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

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-left i {
  font-size: 16px;
  color: #71717a;
}

.section-title {
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #71717a;
  margin: 0;
}

.user-badge {
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  color: #71717a;
  background: #27272a;
  padding: 3px 6px;
  border-radius: 4px;
  border: 1px solid #3f3f46;
}

/* Locale Controls */
.locale-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.select-wrapper {
  position: relative;
}

.locale-select {
  width: 100%;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 14px;
  color: #e4e4e7;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s;
}

.locale-select:focus {
  outline: none;
  border-color: #6366f1;
}

.locale-select:hover {
  border-color: #3f3f46;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 14px;
  font-size: 16px;
  color: #71717a;
  pointer-events: none;
  transition: all 0.2s;
}

.group:hover .select-arrow {
  color: #f4f4f5;
}

/* Description */
.locale-description {
  font-size: 11px;
  line-height: 1.6;
  color: #71717a;
  padding: 0 4px;
}

/* AI Translate Card */
.ai-translate-card {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%);
  border: 1px dashed rgba(147, 51, 234, 0.3);
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.ai-translate-card:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(147, 51, 234, 0.5);
}

.ai-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.ai-icon-badge {
  width: 32px;
  height: 32px;
  background: rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-sparkle {
  font-size: 16px;
  color: #a78bfa;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.ai-title {
  font-size: 12px;
  font-weight: 700;
  color: #c4b5fd;
}

.ai-description {
  font-size: 10px;
  color: rgba(196, 181, 253, 0.6);
  line-height: 1.4;
  margin: 0 0 12px 0;
}

.ai-action {
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
  color: #a78bfa;
  transition: color 0.2s;
}

.ai-translate-card:hover .ai-action {
  color: #c4b5fd;
}

.ai-action-arrow {
  font-size: 12px;
  margin-left: 4px;
  transition: transform 0.2s;
}

.ai-translate-card:hover .ai-action-arrow {
  transform: translateX(4px);
}
</style>
