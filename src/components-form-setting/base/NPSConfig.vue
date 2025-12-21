<template>
  <div class="setting-item">
    <span class="text-gray-500 block-title2">取值范围
      <span class="relative inline-block group ml-1">
        <QuestionCircleOutlined class="cursor-help" />
        <span class="invisible group-hover:visible absolute z-10 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg -top-8 left-0 whitespace-nowrap">
          开始值可以选择0，结束值最小值是3
        </span>
      </span>
    </span>
  </div>
  <div class="setting-item g-2">
    <TwSelect
      v-model="comp.startValue"
      :options="comp.startValueList"
      @change="changeStartValue"
      custom-class="abs-item"
    />
    <TwSelect
      v-model="comp.rateCount"
      :options="dataList"
      @change="changeEndValue"
      custom-class="abs-item"
    />
  </div>
</template>


<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'
import { TwSelect } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

const compStore = useSelectCompStore()

interface Props {
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)


const dataList: any = ref([])

onMounted(() => {
  for (let i = 3; i <= 10; i++) {
    dataList.value.push({
      name: i,
      value: i
    })
  }
})

const changeStartValue = (value: any) => {
  compStore.updateCurrentComp({
    startValue: value
  })
}

const changeEndValue = (value: any) => {
  compStore.updateCurrentComp({
    rateCount: value
  })
}
</script>
