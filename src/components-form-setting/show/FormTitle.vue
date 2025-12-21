
<template>
  <div class="setting-row inline">
    <label>Show Title Image</label>
    <TwSwitch v-model="comp.titleImageShow" @change="() => handleSwitchChange('titleImageShow', comp.titleImageShow)" />
  </div>
    <div class="setting-item">
    <label class="setting-label">标题图片</label>
    <input
      type="text"
      placeholder="请输入图片URL"
      v-model="comp.titleImageUrl"
      @input="handleChangeInput($event, 'titleImageUrl')"
      maxlength="400"
      class="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-2.5 text-xs text-white font-inherit transition-all placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:outline-none focus:border-indigo-500/50 focus:bg-[#09090b]"
    />
  </div>

  <div class="setting-item">
    <label class="setting-label">表单标题</label>
    <input
      type="text"
      placeholder="请输入标题文字（最多30个字）"
      v-model="comp.titleValue"
      @input="handleChangeInput"
      maxlength="30"
      class="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-2.5 text-xs text-white font-inherit transition-all placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:outline-none focus:border-indigo-500/50 focus:bg-[#09090b]"
    />
  </div>

  <div class="setting-item">
    <label class="setting-label">标题大小</label>
    <TwSelect
      v-model="comp.titleSize"
      :options="orientationList"
      @change="(value) => changeSelect(value, 'titleSize')"
    />
  </div>

  <div class="setting-row inline">
    <label>Show Title Description</label>
    <TwSwitch v-model="comp.titleDescriptionShow" @change="() => handleSwitchChange('titleDescriptionShow', comp.titleDescriptionShow)" />
  </div>
  <div class="setting-item">
    <label class="setting-label">标题描述</label>
    <textarea
      placeholder="请输入描述"
      v-model="comp.titleDescription"
      @input="handleChangeInput($event, 'titleDescription')"
      maxlength="200"
      rows="3"
      class="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-2.5 text-xs text-white font-inherit resize-vertical min-h-[80px] transition-all leading-relaxed placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:outline-none focus:border-indigo-500/50 focus:bg-[#09090b]"
    ></textarea>
    <div class="text-right text-[10px] text-[#71717a] mt-1" v-if="comp.titleDescription">{{ comp.titleDescription.length }} / 200</div>
  </div>
  <div class="setting-item">
    <label class="setting-label">位置(标题+描述)</label>
    <TwSelect
      v-model="comp.titleDescriptionPosition"
      :options="positionList"
      @change="(value) => changeSelect(value, 'titleDescriptionPosition')"
    />
  </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { TwSwitch, TwSelect } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'
import { optionData, textOrButtonSizeData } from '../setting-config-data'

interface Props {
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

const compStore: any = useSelectCompStore()
const orientationList = ref([...textOrButtonSizeData])
const positionList = ref([...optionData])

const handleChangeInput = (event: any, params?: string) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    [params || 'titleValue']: data
  })
}

const changeSelect = (value: any, param?: string) => {
  compStore.updateCurrentComp({
    [param || 'titleSize']: value
  })
}

const handleSwitchChange = (param: string, value: boolean) => {
  compStore.updateCurrentComp({
    [param]: value
  })
}
</script>