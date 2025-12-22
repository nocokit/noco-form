
<template>
  <div class="setting-item h-42 mb-10">
    <span class="text-gray-500 secondary">显示其他数据</span>
    <div class="abs-r switch-r">
      <TwSwitch v-model="comp.useOtherDataList" @change="handleChangeInput" />
    </div>
  </div>
  <div class="setting-item">
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入其他文本(最长15个字符)"
      v-model="comp.dataOtherList[0].label"
      @input="changeOther"
      maxlength="15"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref }  from 'vue'
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const compStore = useSelectCompStore()

const handleChangeInput = (value: boolean) => {
  compStore.updateCurrentComp({
    useOtherDataList: value
  })
}

const changeOther = (event: any) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    dataOtherList: [{
      label: data,
      value: data,
    }]
  }) 
}

interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

</script>

