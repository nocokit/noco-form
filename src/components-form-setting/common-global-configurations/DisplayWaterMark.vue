
<template>
  <div class="watermark-setting">
    <TwSwitch v-model="form.displayWaterMark" @change="handleChange" />

    <div class="setting-item" v-if="form.displayWaterMark && !compact" style="margin-top: 12px;">
      <label class="setting-label">Watermark Text</label>
      <input
        type="text"
        placeholder="Enter watermark text (max 15 chars)"
        v-model="form.waterMarkText"
        @input="handleChangeInput"
        maxlength="15"
        class="custom-input"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

interface Props {
  form: any
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
})

const form = ref(props.form)
const compStore = useSelectCompStore()

const handleChange = (value: boolean) => {
  compStore.updateGlobalFormConfig({
    displayWaterMark: value
  })
}

const handleChangeInput = (event: any) => {
  const data = event.target.value
  compStore.updateGlobalFormConfig({
    waterMarkText: data
  })
}

</script>
