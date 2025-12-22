
<template>
  <div class="setting-item">
    <label class="setting-label">标题</label>
    <textarea
      v-if="compStore.currentCompConfig"
      placeholder="请输入标题"
      v-model="comp.title"
      @input="handleChangeInput"
      maxlength="50"
      rows="2"
      class="custom-textarea"
    ></textarea>
    <div class="char-count" v-if="comp.title">{{ comp.title.length }} / 50</div>
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

