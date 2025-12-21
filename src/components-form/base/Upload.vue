<template>
  <div class="upload-container" style="width: 100%; max-width: 100%; box-sizing: border-box;">
    <label
      class="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-500/50 hover:bg-blue-500/[0.02] transition-all cursor-pointer group"
      :class="{ 'opacity-50 cursor-not-allowed': isDev }"
      :title="isDev ? disableInputByDev : '点击或将文件拖拽至此'">
      <div class="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-all">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
      <p class="text-sm font-medium text-zinc-300">点击或将文件拖拽至此</p>
      <p class="text-xs text-zinc-500 mt-1">支持 PNG, JPG, PDF (最大 10MB)</p>
      <input
        type="file"
        class="hidden"
        :disabled="isDev"
        @change="handleChange"
        multiple
        ref="fileInput"
      />
    </label>

    <!-- File List Display -->
    <div v-if="uploadedFiles.length > 0" class="file-list mt-3 space-y-2">
      <div
        v-for="(file, index) in uploadedFiles"
        :key="index"
        class="file-item flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700"
      >
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-500 flex-shrink-0">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <span class="text-sm text-zinc-300 truncate">{{ file.name }}</span>
          <span class="text-xs text-zinc-500">({{ formatFileSize(file.size) }})</span>
        </div>
        <button
          @click="removeFile(index)"
          class="ml-2 text-zinc-500 hover:text-rose-500 transition-colors"
          :disabled="isDev"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'

interface Props {
  id: string
  placeholder: string
  value: string
  isDev: boolean
  fileList: Array<any>
}

const props = defineProps<Props>()
const emit = defineEmits(['update:fileList'])

const fileInput = ref<HTMLInputElement | null>(null)
const uploadedFiles = ref<File[]>(props.fileList || [])

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const newFiles = Array.from(target.files)
    uploadedFiles.value = [...uploadedFiles.value, ...newFiles]
    emit('update:fileList', uploadedFiles.value)

    // Reset input so same file can be selected again
    target.value = ''
  }
}

const removeFile = (index: number) => {
  if (!props.isDev) {
    uploadedFiles.value.splice(index, 1)
    emit('update:fileList', uploadedFiles.value)
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

</script>
