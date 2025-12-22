<template>
  <div class="localization-section">

    <!-- Section Header with Icon -->
    <div class="section-header">
      <div class="header-left">
        <div class="icon-box">
          <i class="ri-translate-2 icon"></i>
        </div>
        <h2 class="section-title">Localization</h2>
      </div>
      <span class="version-badge">I18N v2.0</span>
    </div>

    <div class="section-content">

      <!-- 1. Editor Language -->
      <div class="field-group">
        <div class="field-header">
          <label class="field-label">Editor UI Language</label>
          <span class="field-badge">APP</span>
        </div>
        <div class="select-wrapper">
          <select v-model="editorLanguage" @change="handleEditorLanguageChange" class="item-comp w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-600">
            <option value="zh">简体中文</option>
            <option value="en">English</option>
          </select>
          <i class="ri-arrow-down-s-line select-arrow"></i>
        </div>
        <p class="field-hint">Changes the language of the NOCO FORM interface.</p>
      </div>

      <!-- 2. Form Runtime Locale -->
      <div class="field-group separator">
        <div class="field-header">
          <label class="field-label">Form Runtime Locale</label>
          <i class="ri-question-line help-icon"></i>
        </div>
        <div class="select-wrapper">
          <select v-model="runtimeLocale" @change="handleRuntimeLocaleChange" class="item-comp w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-600">
            <option value="zh-CN">简体中文 (Chinese Simplified)</option>
            <option value="en-US">English (United States)</option>
          </select>
          <i class="ri-arrow-down-s-line select-arrow primary"></i>
        </div>

        <!-- Auto-detect Toggle -->
        <div class="toggle-container">
          <div class="toggle-info">
            <span class="toggle-title">Auto-detect</span>
            <span class="toggle-subtitle">Match user's browser lang</span>
          </div>
          <label class="switch-wrapper">
            <input type="checkbox" v-model="autoDetect" class="switch-input">
            <div class="switch-track"></div>
            <div class="switch-thumb"></div>
          </label>
        </div>
      </div>

      <!-- 3. Regional Standards -->
      <div class="field-group separator">
        <label class="field-label">Regional Standards</label>
        <div class="regional-grid">
          <div class="regional-item">
            <span class="regional-key">Currency</span>
            <span class="regional-val">
              USD ($)
              <i class="ri-arrow-right-s-line"></i>
            </span>
          </div>
          <div class="regional-item">
            <span class="regional-key">Week Start</span>
            <span class="regional-val">
              Monday
              <i class="ri-arrow-right-s-line"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- 4. AI Feature Card -->
      <div class="ai-card">
        <div class="ai-glow"></div>
        <div class="ai-header">
          <i class="ri-sparkling-line ai-icon"></i>
          <span class="ai-title">AI Localize</span>
        </div>
        <p class="ai-description">
          Our AI engine can automatically translate your labels and descriptions to the selected locale with 98% accuracy.
        </p>
        <button class="ai-button" type="button">
          Enable AI Translation
          <i class="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="section-footer">
      <span class="footer-left">UTF-8 ENCODING</span>
      <span class="footer-right">
        VIEW JSON SCHEMA
        <i class="ri-external-link-line"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  form?: any
}

const props = defineProps<Props>()

const editorLanguage = ref('zh')
const runtimeLocale = ref('zh-CN')
const autoDetect = ref(true)

const handleEditorLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  editorLanguage.value = target.value
}

const handleRuntimeLocaleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  runtimeLocale.value = target.value
}
</script>

