
<template>
  <div class="setting-item">
    <label class="setting-label">布局方式</label>
    <div class="radio-group">
      <label
        v-for="item in layoutTypeList"
        :key="item.value"
        class="radio-option"
        :class="{ 'active': comp.layoutType === item.value }"
      >
        <input
          type="radio"
          :value="item.value"
          v-model="comp.layoutType"
          @change="handleChangeInput"
          class="radio-input"
        />
        <span class="radio-label">{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref }  from 'vue'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const compStore = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    layoutType: data
  })
}

interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

const layoutTypeList = [{
  label: '横向',
  value: 'horizontal'
}, {
  label: '纵向',
  value: 'vertical'
}]

</script>
