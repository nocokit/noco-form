<template>
  <div>
    <div
      class="divider flex items-center my-4"
      :class="{
        'justify-start': position === 'left',
        'justify-center': position === 'center',
        'justify-end': position === 'right'
      }"
    >
      <div
        v-if="position === 'left'"
        class="flex-grow-0 border-t"
        :class="dividerBorderType ? 'border-dashed' : 'border-solid'"
        style="border-color: #e0e0e0; width: 0;"
      ></div>
      <div
        v-if="position !== 'left'"
        class="flex-1 border-t"
        :class="dividerBorderType ? 'border-dashed' : 'border-solid'"
        style="border-color: #e0e0e0;"
      ></div>
      <span v-if="dividerValue" class="px-4 text-gray-600">{{ dividerValue }}</span>
      <div
        class="flex-1 border-t"
        :class="dividerBorderType ? 'border-dashed' : 'border-solid'"
        style="border-color: #e0e0e0;"
      ></div>
      <div
        v-if="position === 'right'"
        class="flex-grow-0 border-t"
        :class="dividerBorderType ? 'border-dashed' : 'border-solid'"
        style="border-color: #e0e0e0; width: 0;"
      ></div>
    </div>
  </div>
 </template>
 <script setup lang="ts">
 interface Props {
  type: string
  dividerValue: string
  dividerBorderType: boolean // 虚线类型
  position: string
  isDev: boolean
 }

 const props = defineProps<Props>()
 </script>
