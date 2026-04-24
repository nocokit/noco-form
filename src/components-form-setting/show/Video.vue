
<template>
  <a-typography-text type="secondary" class="block-title">视频URL</a-typography-text>
  <a-input 
    class="mb-10"
    placeholder="请输入视频URL" 
    v-model:value="comp.url"
    @Input="handleChangeInput($event, 'url')"
    :maxlength="400"
  ></a-input>

  <a-typography-text type="secondary" class="block-title">替代文本</a-typography-text>
  <a-input 
    class="mb-10"
    placeholder="请输入视频的替代文本" 
    v-model:value="comp.alt"
    @Input="handleChangeInput($event, 'alt')"
    :maxlength="100"
  ></a-input>

  <a-typography-text type="secondary" class="block-title">视频标题</a-typography-text>
  <a-input 
    class="mb-10"
    placeholder="请输入视频标题（可选）" 
    v-model:value="comp.titleValue"
    @Input="handleChangeInput($event, 'titleValue')"
    :maxlength="50"
  ></a-input>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { useSelectCompStore } from '@/stores/selectCompStore'

const compStore: any = useSelectCompStore()

const handleChangeInput = (event: any, params: string) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    [params]: data
  })
}

interface Props {
  comp: any
}

const props = defineProps<Props>()
</script>
<style lang="scss" scoped>

.mb-10 {
  margin-top: 4px;
  margin-bottom: 10px;
}

</style>