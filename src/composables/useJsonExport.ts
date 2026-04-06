import { computed, ref } from 'vue'
import { message } from 'ant-design-vue'

function highlightJson(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number'
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string'
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean'
        } else if (/null/.test(match)) {
          cls = 'json-null'
        }
        return `<span class="${cls}">${match}</span>`
      },
    )
}

export function useJsonExport() {
  const json = ref('')
  const copyLabel = ref('复制 JSON')

  const highlighted = computed(() => (json.value ? highlightJson(json.value) : ''))

  function setJson(data: unknown) {
    json.value = JSON.stringify(data, null, 2)
    copyLabel.value = '复制 JSON'
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(json.value)
      copyLabel.value = '已复制!'
      setTimeout(() => { copyLabel.value = '复制 JSON' }, 2000)
    } catch {
      message.error('复制失败，请手动选中文本复制', 2)
    }
  }

  function download(filename = `form-${Date.now()}.json`) {
    const blob = new Blob([json.value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return { json, copyLabel, highlighted, setJson, copy, download }
}
