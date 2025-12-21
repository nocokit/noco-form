<template>
  <div v-if="props.open" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-wrapper">
      <!-- Backdrop -->
      <div class="fixed inset-0 transition-opacity bg-zinc-950/80 backdrop-blur-sm" @click="handleSubmit('cancel')"></div>

      <!-- Modal panel -->
      <div class="relative bg-[#121214] border border-zinc-800 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all w-full max-w-2xl modal-content">
        <!-- Header -->
        <div class="px-6 pt-6 pb-4">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-zinc-100 tracking-tight">批量编辑选项数据</h3>
            </div>
            <button @click="handleSubmit('cancel')" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Info tip -->
          <div class="flex gap-3 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400 flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <p class="text-xs text-zinc-400 leading-relaxed">
              可以直接从 Excel 中复制列表数据，每行一条选项，粘贴到下方编辑器中。
            </p>
          </div>

          <!-- IDE-style editor -->
          <div class="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
            <div class="flex">
              <!-- Line numbers -->
              <div class="line-numbers bg-zinc-900/50 border-r border-zinc-800 px-3 py-4 select-none">
                <div v-for="n in lineCount" :key="n" class="text-xs text-zinc-600 font-mono leading-6 text-right">
                  {{ String(n).padStart(2, '0') }}
                </div>
              </div>

              <!-- Textarea editor -->
              <div class="flex-1 relative">
                <textarea
                  ref="editorRef"
                  class="editor-textarea w-full px-4 py-4 bg-transparent text-sm text-zinc-300 font-mono leading-6 resize-none focus:outline-none"
                  style="height: -webkit-fill-available;"
                  placeholder="选项 1&#10;选项 2&#10;选项 3"
                  v-model="batchDataValue"
                  @input="handleChangeInput"
                  @scroll="syncScroll"
                ></textarea>
              </div>
            </div>

            <!-- Item count -->
            <div class="px-4 py-2 bg-zinc-900/50 border-t border-zinc-800 flex items-center justify-between">
              <span class="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">数据预览</span>
              <span class="text-xs text-zinc-500">{{ itemCount }} 项</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 pb-6 flex gap-3 justify-end">
          <button
            type="button"
            @click="handleSubmit('cancel')"
            class="px-5 py-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-sm font-semibold text-zinc-300 transition-all"
          >
            取消
          </button>
          <button
            type="button"
            @click="handleSubmit('ok')"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all"
          >
            同步数据
          </button>
        </div>
      </div>
  </div>

</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { v4 as uuidv4  } from 'uuid'
const emit = defineEmits(['handleBatchOperation'])

interface Props {
  open: boolean
  dataList: any[]
}

const props = defineProps<Props>()
const batchDataValue = ref('')
const dataList: any = ref(props.dataList)
const editorRef = ref<HTMLTextAreaElement | null>(null)

// Calculate line count based on textarea content
const lineCount = computed(() => {
  const lines = batchDataValue.value.split('\n').length
  return Math.max(lines, 20) // Minimum 20 lines for better UX
})

// Calculate item count (non-empty lines)
const itemCount = computed(() => {
  return batchDataValue.value.split('\n').filter(item => item?.length > 0 && item).length
})

const handleSubmit = (state : string) => {
  const isOk = state === 'ok'
  if (isOk) {
    const val = batchDataValue.value
    const nextData: any[] = []
    if(val) {
      const _list = val.split('\n').filter(item => item?.length > 0 && item)
      if(Array.isArray(_list)) {

        _list.forEach((element, index) => {
         nextData.push({
          label:element,
          value: element,
          _index: index
         })
        });
      }
    }
    dataList.value = nextData
  }
  emit('handleBatchOperation', isOk, dataList.value)
}

const handleChangeInput = (event: any) => {
  const data = event.target.value
  console.log(data)
}

// Sync line numbers scroll with textarea scroll
const syncScroll = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  const lineNumbersEl = textarea.closest('.flex')?.querySelector('.line-numbers')
  if (lineNumbersEl) {
    lineNumbersEl.scrollTop = textarea.scrollTop
  }
}

onMounted(() => {
  let  val = ''
  props.dataList.map(item => val += item.value + '\n')
  batchDataValue.value = val

})

</script>
<style lang="scss" scoped>
/* Modal entrance animation */
.modal-wrapper {
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  animation: modalShow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalShow {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Line numbers container scrolling */
.line-numbers {
  overflow-y: hidden;
  max-height: 320px; /* Match textarea height (h-80) */
}

/* Custom scrollbar for textarea */
.editor-textarea {
  scrollbar-width: thin;
  scrollbar-color: #3f3f46 transparent;
}

.editor-textarea::-webkit-scrollbar {
  width: 8px;
}

.editor-textarea::-webkit-scrollbar-track {
  background: transparent;
}

.editor-textarea::-webkit-scrollbar-thumb {
  background-color: #3f3f46;
  border-radius: 4px;
}

.editor-textarea::-webkit-scrollbar-thumb:hover {
  background-color: #52525b;
}

/* Placeholder styling */
.editor-textarea::placeholder {
  color: #52525b;
  font-style: italic;
}
</style>