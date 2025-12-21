
<template>
  <div class="setting-item">
    <label class="setting-label">选择框省/市/区提示</label>
    <input
      v-if="compStore.currentCompConfig"
      type="text"
      placeholder="输入框提示"
      v-model="comp.address_placeholder"
      @input="handleChangeInput($event,'address_placeholder')"
      class="custom-input"
    />
  </div>

  <div class="setting-item">
    <label class="setting-label">详细地址输入框提示</label>
    <input
      v-if="compStore.currentCompConfig"
      type="text"
      placeholder="输入框提示"
      v-model="comp.address_detail_placeholder"
      @input="handleChangeInput($event, 'address_detail_placeholder')"
      class="custom-input"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'


const compStore = useSelectCompStore()

const handleChangeInput = (event: any, key: string) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    [key]: data
  })
}

interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

</script>
