
<template>
  <div class="setting-item">
    <label class="setting-label">按钮文字</label>
    <input
      v-if="compStore.currentCompConfig"
      type="text"
      placeholder="请输入按钮文字（最多30个字）"
      v-model="comp.buttonText"
      @input="handleChangeInput"
      maxlength="30"
      class="custom-input"
    />
  </div>

  <div class="setting-row inline">
    <label>Show Icon</label>
    <TwSwitch v-model="comp.buttonIconShowBool" @change="handleSwitchChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

interface Props {
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)
const compStore: any = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    buttonText: data
  })
}

const handleSwitchChange = (value: boolean) => {
  compStore.updateCurrentComp({
    buttonIconShowBool: value
  })
}
</script>
