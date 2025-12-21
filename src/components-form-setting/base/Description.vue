
<template>
  <div class="setting-item">
    <label class="setting-label">描述/备注</label>
    <textarea
      v-if="compStore.currentCompConfig"
      placeholder="请输入描述"
      v-model="comp.description"
      @input="handleChangeInput"
      maxlength="200"
      rows="3"
      class="w-full px-4 py-2.5 text-xs text-white rounded-xl border outline-none transition-all resize-y min-h-[80px] leading-relaxed bg-[#18181b] border-[#27272a] placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:border-indigo-500/50 focus:bg-[#09090b]"
    ></textarea>
    <div class="char-count" v-if="comp.description">{{ comp.description.length }} / 200</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps,watch, computed, defineEmits, ref, onMounted }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'
import Description from '@/components-form-setting/base/Description.vue';

const compStore: any = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    description: data
  })
}


interface Props{
  comp: any
}

const props = defineProps<Props>()

</script>
