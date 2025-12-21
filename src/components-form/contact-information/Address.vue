<template>
  <div class="space-y-3 w-full">
    <!-- Custom Cascader Select (simplified for now - you could make this more sophisticated) -->
    <div class="relative">
      <select
        v-model="selectedRegion"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
        :disabled="isDev"
        @change="handleRegionChange"
      >
        <option value="" disabled>{{ props.address_placeholder }}</option>
        <option v-for="region in options" :key="region.value" :value="region.value">
          {{ region.label }}
        </option>
      </select>
      <i class="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
    </div>

    <!-- Address Detail Input -->
    <input
      type="text"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      v-model="addressDetail"
      :placeholder="props.address_detail_placeholder"
      :disabled="isDev"
      @input="handleDetailInput"
    />
  </div>
</template>
<script setup lang="ts">
import { addressData } from '@/views/FormEditor/comp-address-data';
import { ref, watch } from 'vue'

interface Props {
  id: string
  address_placeholder: string
  address_detail_placeholder: string
  value: string
  isDev: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:value'])

const options = ref([...addressData])
const selectedRegion = ref('')
const addressDetail = ref('')

// Initialize values from props if provided
watch(() => props.value, (newValue) => {
  if (newValue && typeof newValue === 'object') {
    // @ts-ignore
    selectedRegion.value = newValue.region || ''
    // @ts-ignore
    addressDetail.value = newValue.detail || ''
  }
}, { immediate: true })

const handleRegionChange = () => {
  emitValue()
}

const handleDetailInput = () => {
  emitValue()
}

const emitValue = () => {
  const fullAddress = {
    region: selectedRegion.value,
    detail: addressDetail.value,
    full: `${selectedRegion.value} ${addressDetail.value}`.trim()
  }
  emit('update:value', fullAddress)
}
</script>
