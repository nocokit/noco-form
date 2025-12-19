
<template>
  <div class="toggle-field">
    <div>
      <div class="toggle-field-label">必填</div>
      <div class="toggle-field-description">标记此字段为必填项</div>
    </div>
    <a-switch v-model:checked="comp.isRequired" @change="handleChangeInput"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSelectCompStore  } from '@/stores/selectCompStore'

interface Props{
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

const compStore = useSelectCompStore()

const handleChangeInput = (event: any) => {
  const data = event
  compStore.updateCurrentComp({
    isRequired: data
  })
}
</script>

<style lang="scss" scoped>
@import '@/components-form-setting/setting-common.css';
</style>