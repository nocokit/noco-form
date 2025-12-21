<template>
  <!-- Professional Preview Overlay - 99+ SaaS Quality -->
  <Transition name="preview-fade">
    <div v-if="props.open" class="preview-root" :class="{ 'dark-theme-preview': currentTheme === 'dark' }">
      <!-- Top Professional Toolbar -->
      <header class="top-bar">
        <div class="logo-section">
          <span class="logo-text">PREVIEW</span>
          <span class="separator">/</span>
          <span class="project-name">{{ props.selectForm?.formTitle || 'NOCO FORM' }}</span>
        </div>

        <!-- Device Mode Switches -->
        <div class="mode-switches">
          <button
            class="tab-btn"
            :class="{ active: previewType === 'Phone' }"
            @click="previewType = 'Phone'"
          >
            <i class="ri-smartphone-line"></i>
            Mobile
          </button>
          <button
            class="tab-btn"
            :class="{ active: previewType === 'PC' }"
            @click="previewType = 'PC'"
          >
            <i class="ri-computer-line"></i>
            Desktop
          </button>
        </div>

        <!-- Theme Switches -->
        <div class="theme-switches">
          <button
            class="tab-btn"
            :class="{ active: currentTheme === 'light' }"
            @click="setTheme('light')"
          >
            <i class="ri-sun-line"></i>
            Light
          </button>
          <button
            class="tab-btn"
            :class="{ active: currentTheme === 'dark' }"
            @click="setTheme('dark')"
          >
            <i class="ri-moon-line"></i>
            Dark
          </button>
        </div>

        <!-- Action Buttons -->
        <div class="actions">
          <button class="tab-btn icon-only" title="Share Preview">
            <i class="ri-share-line"></i>
          </button>
          <button class="tab-btn exit-btn" @click="handleClose">
            <i class="ri-close-line"></i>
            Exit Preview
          </button>
        </div>
      </header>

      <!-- Main Stage: Simulator + Inspector Panel -->
      <div class="main-stage">
        <!-- Simulator Workspace -->
        <div class="simulator-workspace">
          <div
            class="device-shell"
            :class="{
              'device-desktop': previewType === 'PC',
              'device-mobile': previewType === 'Phone'
            }"
          >
            <!-- Dynamic Island (Mobile Only) -->
            <div class="notch" v-if="previewType === 'Phone'"></div>

            <!-- Screen Content -->
            <div class="screen-content">
              <div class="watermark-wrapper" :data-watermark="selectForm?.displayWaterMark ? selectForm?.waterMarkText || '' : ''">
                <!-- Form Header -->
                <div class="form-header-preview">
                  <div class="header-icon"></div>
                  <h2 class="form-title">{{ selectForm?.formTitle || 'Product Feedback' }}</h2>
                  <p class="form-description">{{ selectForm?.formDescription || 'We value your feedback.' }}</p>
                </div>

                <!-- Form Components -->
                <div class="form-components" v-if="pageCompList.length">
                  <div
                    v-for="(item, index) in pageCompList"
                    :key="item?.id"
                    class="form-field"
                  >
                    <FormComponent
                      v-if="!['Paging'].includes(item.type) || (['Paging'].includes(item.type) && displayPaging)"
                      :renderType="'preview'"
                      :key="item.id + previewType + currentTheme"
                      :component="item"
                      :type="item.type"
                      :isDev="false"
                      :formConfig="selectForm"
                      :previewType="previewType"
                    />
                  </div>

                  <!-- Submit Button -->
                  <div class="form-footer" v-if="selectForm?.displayBtn" style="display: flex; justify-content: center;">
                    <TwButton
                      :text="pageFooter.buttonText || '提交反馈'"
                      :size="(pageFooter.size as 'small' | 'default' | 'large') || 'default'"
                      :loading="isSubmitting"
                      :success="submitSuccess"
                      :show-icon="pageFooter.buttonIconShowBool"
                      @click="handleSubmit"
                    />
                  </div>
                </div>

                <!-- Empty State -->
                <div v-else class="empty-state">
                  <i class="ri-file-list-3-line empty-icon"></i>
                  <p class="empty-text">No form fields yet</p>
                  <p class="empty-subtext">Add components from the editor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Professional Inspector Panel -->
        <aside class="inspector-panel">
          <!-- Live Schema Section -->
          <div class="inspector-section">
            <div class="inspector-header">
              <span>Live Schema Inspector</span>
              <i class="ri-code-s-slash-line"></i>
            </div>
            <div class="code-container">
              <pre class="code-view">{{ formattedSchema }}</pre>
            </div>
          </div>

          <!-- Form Submission Data Section -->
          <div class="inspector-section submission-data">
            <div class="inspector-header">
              <span>Form Submission Data</span>
              <div class="status-indicator">
                <span class="status-dot"></span>
                <span class="status-text">{{ filledFieldsCount }}/{{ totalFieldsCount }} filled</span>
              </div>
            </div>
            <div class="data-preview">
              <div class="data-item" v-for="(value, key) in formData" :key="key">
                <span class="data-key">{{ key }}</span>
                <span class="data-value">{{ formatValue(value) }}</span>
              </div>
              <div v-if="Object.keys(formData).length === 0" class="no-data">
                <i class="ri-database-2-line"></i>
                <p>Interact with form to see data</p>
              </div>
            </div>
          </div>

          <!-- Metadata Footer -->
          <div class="inspector-footer">
            <div class="meta-item">
              <i class="ri-git-commit-line"></i>
              <span>v2.4.0</span>
            </div>
            <div class="meta-item">
              <i class="ri-time-line"></i>
              <span>{{ currentTime }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, provide, reactive } from 'vue'
import FormComponent from '@/components-form/index.vue'
import { TwButton } from '@/components/ui'
import { useTheme } from '@/composables/useTheme'

type PreviewType = 'Phone' | 'PC'
type ThemeType = 'light' | 'dark'

interface Props {
  open: boolean
  selectForm: any
  pageFooter: any
  pageCompList: any[]
}

const props = defineProps<Props>()
const emit = defineEmits(['onClose'])

// Use global theme composable
const { theme: globalTheme, setTheme: setGlobalTheme } = useTheme()

const previewType = ref<PreviewType>('Phone')
const currentTheme = ref<ThemeType>('light')
const displayPaging = ref(true)
const currentTime = ref(new Date().toLocaleTimeString())

// Submit states
const isSubmitting = ref(false)
const submitSuccess = ref(false)

// Form data state - stores actual form values (reactive for deep tracking)
const formData = reactive<Record<string, any>>({})

// Update form data from components
const updateFormData = (fieldId: string, value: any) => {
  formData[fieldId] = value
}

// Handle form submission
const handleSubmit = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  submitSuccess.value = false

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Show success state
    isSubmitting.value = false
    submitSuccess.value = true

    console.log('Form submitted:', formData)

    // Reset success state after 2 seconds
    setTimeout(() => {
      submitSuccess.value = false
    }, 2000)
  } catch (error) {
    isSubmitting.value = false
    console.error('Submit error:', error)
  }
}

// Provide formData context to child components
provide('previewFormData', {
  formData,
  updateFormData
})

// Set theme (sync with global theme)
const setTheme = (theme: ThemeType) => {
  currentTheme.value = theme
  setGlobalTheme(theme)
}

// Initialize preview theme from global theme
onMounted(() => {
  currentTheme.value = globalTheme.value as ThemeType
})

const handleClose = () => {
  emit('onClose')
}

// Initialize form data with default values
const initFormData = () => {
  // Clear existing data
  Object.keys(formData).forEach(key => delete formData[key])

  props.pageCompList.forEach((item) => {
    const fieldKey = item.id || item.name

    // Set default value based on component type
    if (item.defaultValue !== undefined) {
      formData[fieldKey] = item.defaultValue
    } else {
      // Type-specific defaults
      switch (item.type) {
        case 'Input':
        case 'Textarea':
        case 'Email':
        case 'URL':
          formData[fieldKey] = ''
          break
        case 'Number':
          formData[fieldKey] = 0
          break
        case 'Switch':
          formData[fieldKey] = false
          break
        case 'Radio':
        case 'Select':
          formData[fieldKey] = null
          break
        case 'Checkout':
          formData[fieldKey] = []
          break
        case 'Date':
        case 'Time':
          formData[fieldKey] = null
          break
        case 'Rate':
          formData[fieldKey] = 0
          break
        case 'Upload':
          formData[fieldKey] = []
          break
        default:
          formData[fieldKey] = null
      }
    }
  })
}

// Watch for component list changes
watch(() => props.pageCompList, () => {
  initFormData()
}, { immediate: true })

// Computed values
const totalFieldsCount = computed(() => props.pageCompList.length)

const filledFieldsCount = computed(() => {
  return Object.values(formData).filter(v => {
    if (Array.isArray(v)) return v.length > 0
    if (typeof v === 'string') return v.trim() !== ''
    if (typeof v === 'number') return v !== 0
    return v !== null && v !== undefined
  }).length
})

// Generate formatted form data JSON
const formattedSchema = computed(() => {
  return JSON.stringify({
    formData: formData,
    _meta: {
      timestamp: new Date().toISOString(),
      theme: currentTheme.value,
      device: previewType.value,
      totalFields: totalFieldsCount.value,
      filledFields: filledFieldsCount.value
    }
  }, null, 2)
})

// Format value for display
const formatValue = (value: any) => {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') return `"${value}"`
  if (Array.isArray(value)) return `[${value.length} items]`
  return String(value)
}

// Update time
onMounted(() => {
  const timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
  }, 1000)

  onUnmounted(() => {
    clearInterval(timer)
  })
})

// ESC key handler
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
/* Preview Root Container */
.preview-root {
  position: fixed;
  inset: 0;
  background: #09090b;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Transitions */
.preview-fade-enter-active,
.preview-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.preview-fade-enter-from,
.preview-fade-leave-to {
  opacity: 0;
}

/* Top Professional Toolbar */
.top-bar {
  height: 60px;
  border-bottom: 1px solid var(--border-subtle-alpha);
  background: var(--bg-panel-dark-alpha);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  gap: 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;

  .logo-text {
    color: var(--text-primary);
  }

  .separator {
    color: var(--border-medium);
  }

  .project-name {
    color: var(--text-tertiary);
  }
}

.mode-switches,
.theme-switches,
.actions {
  display: flex;
  gap: 4px;
  background: var(--bg-panel);
  padding: 4px;
  border-radius: 8px;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  i {
    font-size: 14px;
  }

  &:hover {
    background: var(--bg-hover-light-alpha);
    color: var(--text-secondary);
  }

  &.active {
    background: var(--bg-hover);
    color: var(--text-primary);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &.icon-only {
    padding: 6px 10px;
  }

  &.exit-btn {
    background: var(--text-primary);
    color: var(--bg-deep);
    font-weight: 600;

    &:hover {
      background: var(--text-secondary);
    }
  }
}

/* Main Stage */
.main-stage {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Simulator Workspace */
.simulator-workspace {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  position: relative;
  background-image: radial-gradient(var(--border-subtle-light-alpha) 1px, transparent 1px);
  background-size: 32px 32px;
  animation: slideInSimulator 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

@keyframes slideInSimulator {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Device Shell */
.device-shell {
  background: var(--device-shell-bg);
  border-radius: 54px;
  border: 12px solid var(--device-shell-border);
  box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.7);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  &.device-mobile {
    width: 375px;
    height: 780px;
  }

  &.device-desktop {
    width: 100%;
    max-width: 900px;
    height: 700px;
    border-radius: 16px;
    border-width: 8px;
  }
}

/* Dynamic Island (Notch) */
.notch {
  width: 100px;
  height: 28px;
  background: var(--device-shell-bg);
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  z-index: 10;
}

/* Screen Content */
.screen-content {
  flex: 1;
  background: var(--screen-bg-light);
  margin: 6px;
  border-radius: 40px;
  overflow-y: auto;
  padding: 48px 24px;
  color: var(--screen-text-light);
  transition: background 0.3s, color 0.3s;

  .device-desktop & {
    border-radius: 8px;
    padding: 60px 80px;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
}

/* Dark Theme Adaptations */
.dark-theme-preview {
  .screen-content {
    background: var(--screen-bg-dark);
    color: var(--screen-text-dark);
  }

  .form-header-preview .header-icon {
    background: var(--screen-text-dark);
  }

  .form-title {
    color: var(--screen-text-dark) !important;
  }

  .submit-btn {
    background: var(--screen-text-dark);
    border-color: var(--screen-text-dark);
    color: var(--screen-bg-dark);

    &:hover {
      background: var(--text-secondary);
      border-color: var(--text-secondary);
    }
  }
}

/* Form Header */
.form-header-preview {
  text-align: center;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-light-alpha);
  margin-bottom: 32px;

  .dark-theme-preview & {
    border-bottom-color: var(--border-dark-alpha);
  }

  .header-icon {
    width: 64px;
    height: 64px;
    background: var(--screen-text-light);
    border-radius: 16px;
    margin: 0 auto 16px;
  }

  .form-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: var(--screen-text-light);
  }

  .form-description {
    color: var(--text-tertiary);
    font-size: 14px;
    margin: 0;
  }
}

/* Form Components */
.form-components {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Submit Button */
.form-footer {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border-light-alpha);

  .dark-theme-preview & {
    border-top-color: var(--border-dark-alpha);
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 40px;
  color: var(--text-tertiary);

  .empty-icon {
    font-size: 64px;
    color: var(--text-dim);
    margin-bottom: 16px;
  }

  .empty-text {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-tertiary);
    margin: 0 0 8px 0;
  }

  .empty-subtext {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0;
  }
}

/* Professional Inspector Panel */
.inspector-panel {
  width: 380px;
  background: var(--inspector-bg);
  border-left: 1px solid var(--border-subtle-alpha);
  display: flex;
  flex-direction: column;
  animation: slideInInspector 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}

@keyframes slideInInspector {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.inspector-section {
  display: flex;
  flex-direction: column;

  &.submission-data {
    flex: 1;
    border-top: 1px solid var(--border-subtle-alpha);
  }
}

.inspector-header {
  padding: 16px 20px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border-subtle-alpha);
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    color: var(--primary);
    font-size: 14px;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    text-transform: none;
    font-weight: 500;
    font-size: 10px;

    .status-dot {
      width: 6px;
      height: 6px;
      background: var(--success);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  }
}

.code-container {
  padding: 20px;
  overflow-y: auto;
  max-height: 300px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb-alpha);
    border-radius: 10px;
  }
}

.code-view {
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 11px;
  line-height: 1.8;
  color: var(--code-text);
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

/* Data Preview Section */
.data-preview {
  flex: 1;
  padding: 16px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb-alpha);
    border-radius: 10px;
  }
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--data-item-bg-alpha);
  border: 1px solid var(--data-item-border-alpha);
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 11px;

  .data-key {
    color: var(--code-text);
    font-weight: 500;
  }

  .data-value {
    color: var(--code-value);
  }
}

.no-data {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--border-medium);
  padding: 40px 20px;

  i {
    font-size: 32px;
    margin-bottom: 12px;
  }

  p {
    font-size: 12px;
    margin: 0;
  }
}

/* Inspector Footer */
.inspector-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border-subtle-alpha);
  display: flex;
  justify-content: space-between;
  background: var(--data-item-bg-alpha);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--text-tertiary);
  font-family: monospace;

  i {
    font-size: 12px;
  }
}

/* Watermark Wrapper - CSS-only watermark */
.watermark-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  &[data-watermark]:not([data-watermark=""]):before {
    content: attr(data-watermark);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 48px;
    color: var(--watermark-light);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 1;
  }
}

.dark-theme-preview .watermark-wrapper[data-watermark]:not([data-watermark=""]):before {
  color: var(--watermark-dark);
}
</style>
