<template>
  <div class="tag-input-wrapper">
    <label v-if="label" class="tag-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <div class="tag-input-container">
      <div class="tag-list">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="tag-item"
        >
          <span class="tag-text">{{ tag }}</span>
          <i class="ri-close-line remove-icon" @click="removeTag(index)"></i>
        </div>

        <input
          v-model="inputValue"
          type="text"
          :placeholder="tags.length === 0 ? placeholder : 'Add...'"
          class="tag-input"
          @keydown.enter="addTag"
          @keydown.comma.prevent="addTag"
          @keydown.space="handleSpace"
        />
      </div>
    </div>

    <div v-if="hint" class="tag-hint">
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
  maxTags?: number
  isDev: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Skills',
  placeholder: 'Add tags...',
  hint: 'Press Enter, Comma, or Space to add tags',
  required: false,
  maxTags: 10
})

const tags = ref<string[]>([])
const inputValue = ref('')

const addTag = (event?: Event) => {
  event?.preventDefault()

  const value = inputValue.value.trim()

  if (value && !tags.value.includes(value)) {
    if (tags.value.length < props.maxTags) {
      tags.value.push(value)
      inputValue.value = ''
    }
  }
}

const handleSpace = (event: KeyboardEvent) => {
  if (inputValue.value.trim()) {
    event.preventDefault()
    addTag()
  }
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}
</script>

