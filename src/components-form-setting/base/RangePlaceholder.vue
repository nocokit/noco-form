
<template>
  <div class="setting-item">
    <label class="setting-label">输入框提示（区间）</label>
    <input
      v-if="compStore.currentCompConfig && comp.placeholderRange"
      type="text"
      placeholder="开始提示"
      v-model="comp.placeholderRange[0]"
      @input="handleChangeInput($event, 'start')"
      class="custom-input"
    />
    <input
      v-if="compStore.currentCompConfig && comp.placeholderRange"
      type="text"
      placeholder="结束提示"
      v-model="comp.placeholderRange[1]"
      @input="handleChangeInput($event, 'end')"
      class="custom-input mt-8"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const compStore = useSelectCompStore()

const handleChangeInput = (event: any, state: 'start' | 'end') => {
  const data = event.target.value 
  const val = [...comp.value.placeholderRange]
  if(state === 'start') {
    val[0] = data
  } else {
    val[1] = data
  }
  const value =
  compStore.updateCurrentComp({
    placeholderRange: val
  })
}

interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

</script>
