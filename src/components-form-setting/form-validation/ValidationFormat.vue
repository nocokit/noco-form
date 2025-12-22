
<template>
  <div class="setting-item h-50">
    <span class="text-gray-500 secondary">格式</span>
    <select
      v-model="comp.formValidationFormat"
      @change="handleChangeInput(($event.target as HTMLSelectElement).value)"
      class="item-comp w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-600 abs-r w-30"
    >
      <option :value="item.value" v-for="item in systemFormatList" :key="item.value">{{ item.name }}</option>
    </select>
  </div>
  <div class="setting-item h-42" v-if="comp.formValidationFormat === 'regular'">
    <input
      type="text"
      v-model="comp.formValidationFormatRegex"
      placeholder="请输入自定义正则表达式"
      maxlength="40"
      @input="changeValidationFormatRegexInput"
      class="w-full px-3 py-2 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useSelectCompStore  } from '@/stores/selectCompStore'
const val = ref(null)
const formList = [{
  name: '手机号',
  value: 'phone'
}, {
  name: '数字',
  value: 'number'
},{
  name: '网站',
  value: 'website'
},{
  name: '身份证',
  value: 'idCard'
},{
  name: '邮件',
  value: 'email'
},{
  name: '自定义正则',
  value: 'regular'
}]

const systemFormatList = ref(formList)
interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

const compStore = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event
  compStore.updateCurrentComp({
    formValidationFormat: data
  })
}

const changeValidationFormatRegexInput = (event: any) => {
  const data = event.target.value 
  compStore.updateCurrentComp({
    formValidationFormatRegex: data
  })
}

</script>
