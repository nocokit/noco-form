
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
      class="w-full px-4 py-2.5 text-xs text-white rounded-xl border outline-none transition-all resize-y min-h-[80px] leading-relaxed bg-[#18181b] border-[#27272a] placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:border-indigo-500/50 focus:bg-[#09090b]"
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

