
<template>
  <div class="setting-item h-42 comp">
    <span class="text-gray-500 secondary">虚线</span>
    <div class="abs-r switch-r">
      <TwSwitch v-model="comp.dividerBorderType" @change="changeValue" />
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref, watch, defineProps } from 'vue';
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore  } from '@/stores/selectCompStore'

interface Props {
  comp: any
}

const props = defineProps<Props>()

const compStore = useSelectCompStore()

const changeValue = (value: boolean) => {
  compStore.updateGlobalFormConfig({
    dividerBorderType: value
  })
}

</script>
