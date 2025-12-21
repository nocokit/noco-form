
<template>
  <div class="setting-item">
    <label class="setting-label">分割线文本</label>
    <input
      v-if="compStore.currentCompConfig"
      type="text"
      placeholder="输入分割线文本"
      v-model="comp.dividerValue"
      @input="handleChangeInput"
      maxlength="30"
      class="custom-input"
    />
    <div class="char-count" v-if="comp.dividerValue">{{ comp.dividerValue.length }} / 30</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const compStore = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    dividerValue: data
  })
}


interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

</script>
