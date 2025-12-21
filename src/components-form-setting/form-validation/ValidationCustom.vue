
<template>
  <div class="setting-item h-42">
    <span class="text-gray-500 secondary">自定错误提示</span>
    <div class="abs-r switch-r">
      <TwSwitch v-model="comp.isCustomErrorMessage" @change="handleChangeInput" />
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore  } from '@/stores/selectCompStore'

const requiredCustomText = ref(null)
interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

const compStore = useSelectCompStore()

const handleChangeInput = (value: boolean) => {
  compStore.updateCurrentComp({
    isCustomErrorMessage: value
  })
}
</script>
