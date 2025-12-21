<template>
  <div>
    <div class="paging flex items-center justify-center my-4">
      <div class="flex-1 border-t border-solid" style="border-color: #e0e0e0;"></div>
      <span class="pageNumber px-4">
        {{ pagingValue }}
      </span>
      <div class="flex-1 border-t border-solid" style="border-color: #e0e0e0;"></div>
    </div>
    <div v-if="isDev || !isDev && pageSubTitle"  class="page-title border-radius" contenteditable="true" @blur="changeValue($event, 'pageSubTitle')" ref="subTitle">
      {{pageSubTitle}}
    </div>
    <div v-if="isDev || !isDev && pageSubDescription" class="page-sub-description border-radius" contenteditable="true" @blur="changeValue($event, 'pageSubDescription')" ref="subDescription">
      {{pageSubDescription}}
    </div>
  </div>
 </template>
 <script setup lang="ts">
 import { ref, onMounted } from 'vue'
 import { useSelectCompStore  } from '@/stores/selectCompStore'
 import { v4 as uuidv4 } from 'uuid';
 
 const subTitle = ref(null)
 const subDescription = ref(null)

 const compStore = useSelectCompStore()
 
 interface Props {
  isDev: boolean
  pagingValue: string
  pageSubTitle: string 
  pageSubDescription: string
 }
 
 const props = defineProps<Props>()

 const handleKeyDown = (event: any) => {
  
 }

 const changeValue = (event: any, params: any) => {
  const hasDataBool = event.target.innerText !== null &&  event.target.innerText !== '\n'
  if(!hasDataBool) {
    event.target.innerHTML = null
  } 
  const data = event.target.innerText

  console.log('event',data)
  if(params === 'pageSubTitle') {
    compStore.updateCurrentComp({
      pageSubTitle: data
    })
  } else if(params === 'pageSubDescription') {
    compStore.updateCurrentComp({
      pageSubDescription: data
    })
  }
  compStore.updateCurrentCompKey(uuidv4())
}

onMounted(() => {

})
 
 </script>
