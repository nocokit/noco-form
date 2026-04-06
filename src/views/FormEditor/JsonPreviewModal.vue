<template>
  <a-modal
    :open="open"
    title="表单 JSON 数据"
    :width="760"
    :footer="null"
    :bodyStyle="{ padding: '0' }"
    @cancel="emit('update:open', false)"
  >
    <div class="toolbar">
      <span class="tip">保存成功 · 以下为当前表单完整配置</span>
      <div class="actions">
        <a-button size="small" @click="copy">
          <template #icon><CopyOutlined /></template>
          {{ copyLabel }}
        </a-button>
        <a-button size="small" @click="download">
          <template #icon><DownloadOutlined /></template>
          下载 JSON
        </a-button>
      </div>
    </div>
    <div class="body">
      <pre class="code" v-html="highlighted"></pre>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { useJsonExport } from '@/composables/useJsonExport'

const props = defineProps<{ open: boolean; data: unknown }>()
const emit = defineEmits<{ (e: 'update:open', v: boolean): void }>()

const { copyLabel, highlighted, setJson, copy, download } = useJsonExport()

watch(() => props.data, (v) => { if (v) setJson(v) }, { immediate: true })
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;

  .tip {
    font-size: 12px;
    color: #52c41a;
  }

  .actions {
    display: flex;
    gap: 8px;
  }
}

.body {
  max-height: 60vh;
  overflow-y: auto;
  background: #1e1e1e;
  padding: 16px;
  border-radius: 0 0 8px 8px;
}

.code {
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
  white-space: pre;
  overflow-x: auto;

  :deep(.json-key)     { color: #9cdcfe; }
  :deep(.json-string)  { color: #ce9178; }
  :deep(.json-number)  { color: #b5cea8; }
  :deep(.json-boolean) { color: #569cd6; }
  :deep(.json-null)    { color: #569cd6; }
}
</style>
