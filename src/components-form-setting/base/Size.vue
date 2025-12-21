
<template>
  <div class="setting-item">
    <label class="setting-label">大小</label>
    <TwSelect
      v-model="comp.size"
      :options="orientationList"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref }  from 'vue'
import { TwSelect } from '@/components/ui'
import { useSelectCompStore  } from '@/stores/selectCompStore'
import { textOrButtonSizeData } from '../setting-config-data'

const compStore = useSelectCompStore()
const orientationList = ref([...textOrButtonSizeData])



const handleChange = (value: any) => {
  compStore.updateCurrentComp({
    size: value
  })
}

interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

</script>