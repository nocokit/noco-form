<template>
  <div class="setting-item h-42">
    <span class="text-gray-500 secondary">最小值</span>
    <input
      type="number"
      class="abs-r w-30 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      v-model="comp.minValue"
      placeholder="最小值"
      @input="handleChangeInput($event, 'minValue')"
    />
  </div>

  <div class="setting-item h-42">
    <span class="text-gray-500 secondary">最大值</span>
    <input
      type="number"
      class="abs-r w-30 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      v-model="comp.maxValue"
      placeholder="最大值"
      @input="handleChangeInput($event, 'maxValue')"
    />
  </div>


</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useSelectCompStore } from '@/stores/selectCompStore'

interface Props {
  comp: any
}
const compStore = useSelectCompStore()

const props = defineProps<Props>()
const comp = ref(props.comp)


const handleChangeInput = (event: any, param: 'maxValue' | 'minValue') => {
  const data = event.target.value
  compStore.updateCurrentComp({
    [param]: data
  })
}

</script>
