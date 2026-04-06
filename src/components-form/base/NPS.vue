<template>
  <div class="nps-list">
    <div class="nps-item" v-for="(item, index) in list"     
      @mouseenter="!isDev && changeIndex(index)" 
      @mouseleave="!isDev && changeIndex( -1)" 
      @click="!isDev && selectValue(item)"
    >
      <span class="item" v-bind:class="{
        isDev,
        hoverChildrenIndex: hoverIndex >= index,
        active: value >= index,
      }">{{ item }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref,watch, reactive, onMounted, computed } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'
import { useSelectCompStore } from '@/stores/selectCompStore'
import { useFormValues } from '@/composables/useFormValues'

interface Props {
  id: string
  value: number
  startValue: number
  rateCount: number
  isDev: boolean
}
const compStore = useSelectCompStore()
const props = defineProps<Props>()
const formValues = useFormValues()
const hoverIndex = ref(-1)
const list = computed(() => {
  let _val = []
  for (let i = props.startValue; i <= props.rateCount; i++) {
    _val.push(i)
  }
  return _val
})


const changeIndex = (index: number) => {
  hoverIndex.value = index
}

const selectValue = (item: any) => {
  compStore.updateCurrentComp({
    value: item
  })
  if (formValues && props.id) formValues[props.id] = item
}

onMounted(() => {

})



</script>
<style lang="scss">
.nps-list {
  display: flex;
  flex-basis: content;
  flex-wrap: wrap;
}
.nps-item {
  display: inline-flex;
  width: 32px;
  height: 30px;
  font-size: 22px;
  line-height: 30px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 4px;
  .item {
    color: #fff;
    background: #dee0e3;
    border-radius: 6px;
    width: 30px;
    text-align: center;
    padding:0;
    height: 30px;
    cursor: pointer;
    &:hover:not(.isDev),
    &.hoverChildrenIndex {
      background:  rgba(22, 119, 255, 0.66);
    }
    &.active:not(.isDev) {
      background: #1677ff;;
    }
  }
}
</style>