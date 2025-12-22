
<template>
  <div class="setting-item">
    <label class="setting-label">分页标题</label>
    <textarea
      v-if="compStore.currentCompConfig"
      placeholder="请输入分页标题"
      v-model="comp.pageSubTitle"
      @input="handleChangeInput"
      maxlength="50"
      rows="2"
      class="custom-textarea"
    ></textarea>
    <div class="char-count" v-if="comp.pageSubTitle">{{ comp.pageSubTitle.length }} / 50</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps,watch, computed, defineEmits, ref, onMounted }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const compStore: any = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    pageSubTitle: data
  })
}


interface Props{
  comp: any
}

const props = defineProps<Props>()

</script>
