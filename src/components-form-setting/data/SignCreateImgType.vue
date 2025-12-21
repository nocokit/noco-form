<template>
  <div class="setting-item h-50">
    <span class="text-gray-500 block-title2">保存图片格式</span>
    <select
      v-model="comp.sign_create_type"
      @change="changeType(($event.target as HTMLSelectElement).value)"
      class="abs-r w-30 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option :value="item.value" v-for="item in ImgTypeList" :key="item.value">{{ item.label }}</option>
    </select>
  </div>

</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  comp: any
}
const props = defineProps<Props>()
const ImgTypeList = ref([{
  label: 'JPG',
  value: 'jpg'
}, {
  label: 'PNG',
  value: 'png'
}])

const changeType = (item: any) => {
  console.log(item)
}


</script>
