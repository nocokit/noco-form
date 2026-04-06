<template>
  <a-typography-text type="secondary" class="block-title">{{ label }}</a-typography-text>
  <a-textarea
    v-if="textarea && compStore.currentCompConfig"
    :placeholder="placeholder"
    allow-clear
    show-count
    v-model:value="comp[field]"
    @input="updateFieldFromEvent(field, $event)"
    :auto-size="{ minRows: 2, maxRows: 5 }"
    :maxlength="maxlength"
  />
  <a-input
    v-else-if="compStore.currentCompConfig"
    :placeholder="placeholder"
    allow-clear
    v-model:value="comp[field]"
    @input="updateFieldFromEvent(field, $event)"
    :maxlength="maxlength"
    :show-count="showCount"
  />
</template>

<script lang="ts" setup>
import { useSettingField } from '@/composables/useSettingField'

interface Props {
  comp: Record<string, any>
  field: string
  label: string
  placeholder?: string
  textarea?: boolean
  maxlength?: number
  showCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入',
  textarea: false,
  maxlength: 200,
  showCount: false,
})

const { compStore, updateFieldFromEvent } = useSettingField()
const comp = props.comp
</script>

<style lang="scss" scoped>
.block-title {
  display: block;
  margin-top: 10px;
  margin-bottom: 6px;
}
</style>
