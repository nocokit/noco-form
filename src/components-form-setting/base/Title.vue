
<template>
  <div class="setting-item">
    <label class="setting-label">标题</label>
    <a-textarea
      v-if="compStore.currentCompConfig"
      placeholder="请输入标题"
      allow-clear
      show-count
      v-model:value="comp.title"
      @Input="handleChangeInput"
      :auto-size="{ minRows: 2, maxRows: 5 }"
      :maxlength="50"
    ></a-textarea>
  </div>
</template>

<script lang="ts" setup>
import { defineProps }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const compStore: any = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    title: data
  })
}

interface Props{
  comp: any
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
@import '@/components-form-setting/setting-common.css';
</style>