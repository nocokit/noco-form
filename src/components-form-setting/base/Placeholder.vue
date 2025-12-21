
<template>
  <div class="setting-item">
    <label class="setting-label">输入框提示</label>
    <input
      v-if="compStore.currentCompConfig"
      type="text"
      placeholder="输入框提示文本"
      v-model="comp.placeholder"
      @input="handleChangeInput"
      class="custom-input"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const compStore = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    placeholder: data
  })
}

interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)
</script>

