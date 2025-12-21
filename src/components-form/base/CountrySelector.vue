<template>
  <div class="country-selector-wrapper" :class="{ 'component-hidden': hidden }">
    <label v-if="label" class="country-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <div class="country-container" @click="toggleDropdown">
      <div class="country-input" :class="{ disabled: isDev || disabled || readonly }">
        <div v-if="selectedCountry" class="selected-country">
          <div class="country-flag" :class="`flag-${selectedCountry.code.toLowerCase()}`">
            {{ selectedCountry.flag }}
          </div>
          <span class="country-name">{{ selectedCountry.name }}</span>
        </div>
        <span v-else class="placeholder">{{ placeholder }}</span>
        <i class="ri-arrow-down-s-line dropdown-icon" :class="{ open: isOpen }"></i>
      </div>

      <div v-if="isOpen && !disabled && !readonly" class="country-dropdown">
        <div class="search-box">
          <i class="ri-search-line search-icon"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search countries..."
            class="search-input"
            @click.stop
          />
        </div>

        <div class="country-list">
          <div
            v-for="country in filteredCountries"
            :key="country.code"
            class="country-option"
            :class="{ active: selectedCountry?.code === country.code }"
            @click.stop="selectCountry(country)"
          >
            <div class="country-flag" :class="`flag-${country.code.toLowerCase()}`">
              {{ country.flag }}
            </div>
            <span class="country-name">{{ country.name }}</span>
            <span class="country-code">{{ country.code }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { type DisplayMode } from '@/views/FormEditor/comp-config-data'

interface Country {
  name: string
  code: string
  flag: string
}

interface Props {
  // 基础字段
  id?: string
  field?: string
  type?: string
  label?: string
  placeholder?: string
  required?: boolean
  isDev?: boolean
  isSelected?: boolean
  isPreviewRender?: boolean
  dataValue?: string

  // 新增：响应式控制字段
  display?: DisplayMode
  hidden?: boolean
  disabled?: boolean
  readonly?: boolean

  // 新增：数据源
  dataSource?: any
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择国家',
  required: false,
  isDev: false,
  isSelected: false,
  isPreviewRender: false
})

const emit = defineEmits<{
  change: [value: string]
  update: [field: string, value: string]
}>()

const countries: Country[] = [
  { name: '中国', code: 'CN', flag: '🇨🇳' },
  { name: '美国', code: 'US', flag: '🇺🇸' },
  { name: '英国', code: 'GB', flag: '🇬🇧' },
  { name: '加拿大', code: 'CA', flag: '🇨🇦' },
  { name: '澳大利亚', code: 'AU', flag: '🇦🇺' },
  { name: '德国', code: 'DE', flag: '🇩🇪' },
  { name: '法国', code: 'FR', flag: '🇫🇷' },
  { name: '西班牙', code: 'ES', flag: '🇪🇸' },
  { name: '意大利', code: 'IT', flag: '🇮🇹' },
  { name: '日本', code: 'JP', flag: '🇯🇵' },
  { name: '韩国', code: 'KR', flag: '🇰🇷' },
  { name: '印度', code: 'IN', flag: '🇮🇳' },
  { name: '巴西', code: 'BR', flag: '🇧🇷' },
  { name: '墨西哥', code: 'MX', flag: '🇲🇽' },
  { name: '荷兰', code: 'NL', flag: '🇳🇱' },
  { name: '瑞士', code: 'CH', flag: '🇨🇭' },
  { name: '瑞典', code: 'SE', flag: '🇸🇪' },
  { name: '挪威', code: 'NO', flag: '🇳🇴' },
  { name: '丹麦', code: 'DK', flag: '🇩🇰' },
  { name: '芬兰', code: 'FI', flag: '🇫🇮' },
  { name: '波兰', code: 'PL', flag: '🇵🇱' },
  { name: '新加坡', code: 'SG', flag: '🇸🇬' },
  { name: '泰国', code: 'TH', flag: '🇹🇭' },
  { name: '越南', code: 'VN', flag: '🇻🇳' },
]

const isOpen = ref(false)
const selectedCountry = ref<Country | null>(null)
const searchQuery = ref('')

const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries

  const query = searchQuery.value.toLowerCase()
  return countries.filter(
    country =>
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query)
  )
})

const toggleDropdown = () => {
  if (props.isDev || props.disabled || props.readonly) {
    return
  }
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

const selectCountry = (country: Country) => {
  selectedCountry.value = country
  isOpen.value = false
  searchQuery.value = ''

  // 触发 change 事件
  emit('change', country.code)
  if (props.field) {
    emit('update', props.field, country.code)
  }
}

// 初始化选中值
watch(() => props.dataValue, (newVal) => {
  if (newVal) {
    const country = countries.find(c => c.code === newVal)
    if (country) {
      selectedCountry.value = country
    }
  }
}, { immediate: true })
</script>

