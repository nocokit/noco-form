
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
    class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="请输入图片URL"
    v-model="comp.titleImageUrl"
    @input="handleChangeInput($event, 'titleImageUrl')"
    maxlength="400"
  />

  <span class="text-gray-500 block-title">表单标题</span>
  <input
    type="text"
    class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      class="abs-r w-30 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      class="w-full px-4 py-2.5 text-xs text-white rounded-xl border outline-none transition-all resize-y min-h-[80px] leading-relaxed bg-[#18181b] border-[#27272a] placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:border-indigo-500/50 focus:bg-[#09090b]"
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
      class="abs-r w-30 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
