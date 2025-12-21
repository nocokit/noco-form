<template>
  <div class="richtext-wrapper">
    <label v-if="label" class="richtext-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <div class="richtext-container">
      <!-- Toolbar -->
      <div class="richtext-toolbar">
        <div class="toolbar-group">
          <button class="toolbar-btn" title="Bold" @click.prevent="execCommand('bold')">
            <i class="ri-bold"></i>
          </button>
          <button class="toolbar-btn" title="Italic" @click.prevent="execCommand('italic')">
            <i class="ri-italic"></i>
          </button>
          <button class="toolbar-btn" title="Underline" @click.prevent="execCommand('underline')">
            <i class="ri-underline"></i>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <button class="toolbar-btn" title="Heading 1" @click.prevent="execCommand('formatBlock', '<h1>')">
            <i class="ri-h-1"></i>
          </button>
          <button class="toolbar-btn" title="Heading 2" @click.prevent="execCommand('formatBlock', '<h2>')">
            <i class="ri-h-2"></i>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <button class="toolbar-btn" title="Unordered List" @click.prevent="execCommand('insertUnorderedList')">
            <i class="ri-list-unordered"></i>
          </button>
          <button class="toolbar-btn" title="Ordered List" @click.prevent="execCommand('insertOrderedList')">
            <i class="ri-list-ordered"></i>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <button class="toolbar-btn" title="Link" @click.prevent="insertLink">
            <i class="ri-link"></i>
          </button>
          <button class="toolbar-btn" title="Code" @click.prevent="execCommand('formatBlock', '<pre>')">
            <i class="ri-code-line"></i>
          </button>
        </div>

        <div class="toolbar-spacer"></div>

        <div class="toolbar-group">
          <button class="toolbar-btn" :class="{ active: mode === 'visual' }" @click.prevent="mode = 'visual'">
            <i class="ri-edit-line"></i>
          </button>
          <button class="toolbar-btn" :class="{ active: mode === 'markdown' }" @click.prevent="mode = 'markdown'">
            <i class="ri-markdown-line"></i>
          </button>
        </div>
      </div>

      <!-- Editor Area -->
      <div
        v-if="mode === 'visual'"
        ref="editorRef"
        class="richtext-editor"
        contenteditable="true"
        :placeholder="placeholder"
        @input="handleInput"
      ></div>

      <textarea
        v-else
        v-model="markdownContent"
        class="markdown-editor"
        :placeholder="'# Markdown Mode\n\nWrite markdown here...'"
      ></textarea>
    </div>

    <div v-if="hint" class="richtext-hint">
      <i class="ri-information-line"></i>
      <span>{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  type: string
  label?: string
  placeholder?: string
  hint?: string
  required?: boolean
  isDev: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Description',
  placeholder: 'Write something...',
  hint: 'Supports rich text formatting and markdown',
  required: false
})

const editorRef = ref<HTMLDivElement | null>(null)
const mode = ref<'visual' | 'markdown'>('visual')
const markdownContent = ref('')

const execCommand = (command: string, value?: string) => {
  document.execCommand(command, false, value)
  editorRef.value?.focus()
}

const insertLink = () => {
  const url = prompt('Enter URL:')
  if (url) {
    execCommand('createLink', url)
  }
}

const handleInput = () => {
  if (editorRef.value) {
    markdownContent.value = editorRef.value.innerHTML
  }
}
</script>

