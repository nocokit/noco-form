<template>
  <div class="setting-item">
    <label class="setting-label">自定义错误提示</label>
    <textarea
      v-model="comp.customErrorMessage"
      placeholder="请输入自定义错误提示"
      maxlength="40"
      rows="2"
      class="custom-textarea"
      @input="handleChangeInput"
    ></textarea>
    <div class="char-count" v-if="comp.customErrorMessage">{{ comp.customErrorMessage.length }} / 40</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useSelectCompStore  } from '@/stores/selectCompStore'

interface Props{
  comp: any
}
const compStore = useSelectCompStore()

const props = defineProps<Props>()
const comp = ref(props.comp)

const handleChangeInput = (event: any) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    customErrorMessage: data
  })
}

</script>
