
<template>
  <div class="setting-item">
    <label class="setting-label">位置</label>
    <TwSelect
      v-model="comp.position"
      :options="orientationList"
      @change="handleChangePosition"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref }  from 'vue'
import { TwSelect } from '@/components/ui'
import { useSelectCompStore  } from '@/stores/selectCompStore'
import { optionData } from '../setting-config-data'

const compStore = useSelectCompStore()
const orientationList = ref([...optionData])

const handleChangeInput = (event: any) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    dividerValue: data
  })
}



const handleChangePosition = (value: any) => {
  compStore.updateCurrentComp({
    position: value
  })
}

interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

</script>