<template>
  <div class="setting-item h-50">
    <span class="text-gray-500 block-title2">图标</span>
  </div>
  <div class="grid grid-cols-5 gap-1.5 mb-4">
    <label
      v-for="item in imgList"
      :key="item"
      class="flex items-center justify-center p-2.5 text-xl border rounded-lg cursor-pointer transition-all"
      :class="comp.rateCharacter === item
        ? 'bg-blue-500/10 border-blue-500/50 shadow-sm shadow-blue-500/20'
        : 'bg-zinc-800/30 border-zinc-700/50 hover:bg-zinc-800/50 hover:border-zinc-600'"
    >
      <input
        type="radio"
        :value="item"
        v-model="comp.rateCharacter"
        @change="changeRateCharacter(item)"
        class="sr-only"
      />
      <span>{{ item }}</span>
    </label>
  </div>

  <div class="setting-item h-50">
    <span class="text-gray-500 block-title2">数量</span>
    <TwSelect
      v-model="comp.rateCount"
      :options="dataList"
      @change="changeRateCount"
      custom-class="abs-r w-30"
    />
  </div>


  <div class="setting-item h-50">
    <span class="text-gray-500 block-title2">允许半选</span>
    <div class="abs-r switch-r">
      <TwSwitch v-model="comp.rateAllowHalf" @change="changeHalf" />
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'
import { TwSelect, TwSwitch } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

const compStore = useSelectCompStore()

interface Props {
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)


const dataList: any = ref([])
const imgList = ['⭐️', '❤️', '😊', '🔥', '🌩']

onMounted(() => {
  for (let i = 1; i <= 10; i++) {
    dataList.value.push({
      name: i + ' 个',
      value: i
    })
  }
})

const changeRateCount = (value: any) => {
  compStore.updateCurrentComp({
    rateCount: value
  })
}

const changeRateCharacter = (value: any) => {
  compStore.updateCurrentComp({
    rateCharacter: value
  })
}

const changeHalf = (value: boolean) => {
  compStore.updateCurrentComp({
    rateAllowHalf: value
  })
}

</script>
