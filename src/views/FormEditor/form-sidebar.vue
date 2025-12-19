<template>
  <div class="sidebar" >
    <div class="item" v-for="item in classifyList" @click="selectSideItemType(item.type)" :key="item.label" :class="{
      active: item.type === props.currentSideItemType
    }">
      <i class="icon" :class="item.icon"></i>
      <div class="label">{{ item.label }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'
import Icon from './comp-icon'

interface Props {
  currentSideItemType?: 'questionBank' | 'theme' | 'logic' | 'outline' | string
}

interface ClassifyType {
  label: string
  icon: any
  type: 'questionBank' | 'theme' | 'logic' | 'outline'
}
const emit = defineEmits(['selectSideItemType'])
const props = defineProps<Props>()

const classifyList = ref<ClassifyType[]>([{
  label: '题库',
  icon: Icon.Question,
  type: 'questionBank'
}, {
  label: '主题',
  icon: Icon.Theme,
  type: 'outline'
// }, {
//   label: '逻辑',
//   icon: Icon.Logic,
//   type: 'logic',

},])

const selectSideItemType = (type: string) => {
  emit('selectSideItemType', type)
}



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
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--bg-hover);
  }

  &.active {
    .icon {
      color: var(--primary);
    }
    .label {
      color: var(--primary);
    }
  }

  .icon {
    font-size: 20px;
    display: inline-block;
    color: var(--text-secondary);
    transition: color 0.2s;
  }

  .label {
    margin-top: 5px;
    height: 20px;
    line-height: 20px;
    color: var(--text-secondary);
    transition: color 0.2s;
  }
}
</style>