
<template>
  <div class="setting-item">
    <label class="setting-label">分页描述</label>
    <textarea
      v-if="compStore.currentCompConfig"
      placeholder="请输入分页描述"
      v-model="comp.pageSubDescription"
      @input="handleChangeInput"
      maxlength="200"
      rows="3"
      class="custom-textarea"
    ></textarea>
    <div class="char-count" v-if="comp.pageSubDescription">{{ comp.pageSubDescription.length }} / 200</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps,watch, computed, defineEmits, ref, onMounted }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const compStore: any = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    pageSubDescription: data
  })
}


interface Props{
  comp: any
}

const props = defineProps<Props>()

</script>
