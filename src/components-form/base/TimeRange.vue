<template>

  <a-time-range-picker :disabled="isDev" :title="isDev ? disableInputByDev : ''"
  class="item-comp" v-model:value="props.value" :placeholder="placeholderRange" />
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'

interface Props {
  id: string
  placeholderRange: [string, string]
  value: string
  isDev: boolean
}

const props = defineProps<Props>()
</script>
