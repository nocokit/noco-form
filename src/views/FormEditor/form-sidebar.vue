<template>
  <div class="sidebar">
    <div
      v-for="item in classifyList"
      :key="item.type"
      class="item"
      :class="{ active: item.type === props.currentSideItemType }"
      @click="emit('selectSideItemType', item.type)"
    >
      <img class="icon" :src="item.icon" alt="">
      <div class="label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './comp-icon'

interface SideItem {
  label: string
  icon: string
  type: 'questionBank' | 'theme' | 'logic' | 'outline'
}

interface Props {
  currentSideItemType?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'selectSideItemType', type: string): void }>()

const classifyList: SideItem[] = [
  { label: '题库', icon: Icon.Question, type: 'questionBank' },
  { label: '主题', icon: Icon.Theme,    type: 'theme' },
  { label: '逻辑', icon: Icon.Logic,    type: 'logic' },
]
</script>

<style scoped lang="scss">
.sidebar {
  font-size: 12px;
  color: #314666;
  border-right: 1px solid rgb(232, 235, 238);
}

.item {
  text-align: center;
  height: 70px;
  padding: 10px;
  display: block;
  filter: grayscale(100%);
  cursor: pointer;

  &.active {
    filter: grayscale(0%);
    .label { color: #1677ff; }
  }

  .icon {
    width: 20px;
    display: inline-block;
  }

  .label {
    margin-top: 5px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
