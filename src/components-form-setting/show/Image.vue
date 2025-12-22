
<template>
  <div class="setting-item h-42">
    <span class="text-gray-500 secondary">显示标题图片</span>
    <div class="abs-r switch-r">
      <TwSwitch v-model="comp.titleImageShow" @change="(value) => changeValue(value, 'titleImageShow')" />
    </div>
  </div>
  <span class="text-gray-500 block-title">标题图片</span>
  <input
    type="text"
    class="custom-input mb-10"
    placeholder="请输入图片URL"
    v-model="comp.titleImageUrl"
    @input="handleChangeInput($event, 'titleImageUrl')"
    maxlength="400"
  />

  <span class="text-gray-500 block-title">表单标题</span>
  <input
    type="text"
    class="custom-input mb-10"
    placeholder="请输入标题文字（最多30个字）"
    v-model="comp.titleValue"
    @input="handleChangeInput"
    maxlength="30"
  />

  <div class="setting-item h-50">
    <span class="text-gray-500 block-title2">标题大小</span>
    <select
      v-model="comp.titleSize"
      @change="changeSelect(($event.target as HTMLSelectElement).value)"
      class="item-comp w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-600 abs-r w-30"
    >
      <option :value="item.value" v-for="item in orientationList" :key="item.value">{{ item.name }}</option>
    </select>
  </div>

  <div class="setting-item h-42">
    <span class="text-gray-500 secondary">显示标题描述</span>
    <div class="abs-r switch-r">
      <TwSwitch v-model="comp.titleDescriptionShow" @change="(value) => changeValue(value, 'titleDescriptionShow')" />
    </div>
  </div>
  <span class="text-gray-500 block-title">标题描述</span>
  <div class="relative mb-10 m-b-10">
    <textarea
      class="custom-textarea"
      placeholder="请输入描述"
      v-model="comp.titleDescription"
      @input="handleChangeInput($event, 'titleDescription')"
      rows="3"
      maxlength="200"
    ></textarea>
    <div class="text-right text-[10px] text-[#71717a] mt-1" v-if="comp.titleDescription">{{ comp.titleDescription.length }} / 200</div>
  </div>
  <div class="setting-item h-50">
    <span class="text-gray-500 block-title2">位置</span>
    <select
      v-model="comp.titleDescriptionPosition"
      @change="changeSelect(($event.target as HTMLSelectElement).value, 'titleDescriptionPosition')"
      class="item-comp w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-600 abs-r w-30"
    >
      <option :value="item.value" v-for="item in positionList" :key="item.value">{{ item.name }}</option>
    </select>
  </div>

</template>
<script lang="ts" setup>
import { defineProps,watch, computed, defineEmits, ref, onMounted }  from 'vue'
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore  } from '@/stores/selectCompStore'
import Description from '@/components-form-setting/base/Description.vue';
import { optionData, textOrButtonSizeData } from '../setting-config-data';

const compStore: any = useSelectCompStore()
const orientationList = ref([...textOrButtonSizeData])

const positionList = ref([...optionData])

const handleChangeInput = (event: any, params?: string) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    [params || 'titleValue']: data
  })
}

const changeSelect = (event: any, param?: string) => {
  const data = event
  compStore.updateCurrentComp({
    [param || 'titleSize']: data
  })
}

const changeValue = (event: any, param?: string) => {
  const data = event
  compStore.updateCurrentComp({
    [param || 'buttonIconShowBool']: data
  })
}


interface Props{
  comp: any
}

const props = defineProps<Props>()

</script>
