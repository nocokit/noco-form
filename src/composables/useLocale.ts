import { ref, computed } from 'vue'
import i18n from '@/i18n'

// Map short codes to full locale codes (only languages with translations)
const localeMap: Record<string, string> = {
  'zh': 'zh-CN',
  'en': 'en-US',
}

// Reverse map
const reverseLocaleMap: Record<string, string> = {
  'zh-CN': 'zh',
  'en-US': 'en',
}

// Global state - singleton
const currentLocale = computed({
  get: () => i18n.global.locale.value,
  set: (value: string) => {
    i18n.global.locale.value = value as any
  }
})

const currentShortLocale = computed({
  get: () => reverseLocaleMap[currentLocale.value] || 'zh',
  set: (newShortLocale: string) => {
    const newFullLocale = localeMap[newShortLocale]
    if (newFullLocale) {
      setLocale(newShortLocale)
    }
  }
})

// Only include languages with complete translations
const availableLocales = ref([
  { code: 'zh', fullCode: 'zh-CN', label: '简体中文' },
  { code: 'en', fullCode: 'en-US', label: 'English' },
])

const setLocale = (newShortLocale: string) => {
  const newFullLocale = localeMap[newShortLocale]

  if (!newFullLocale) {
    console.error('Invalid locale:', newShortLocale)
    return
  }

  // Update i18n locale (this is the single source of truth)
  i18n.global.locale.value = newFullLocale as any

  // Save to localStorage
  localStorage.setItem('noco-form-locale', newFullLocale)

  console.log('Locale changed to:', newFullLocale)
}

export const useLocale = () => {
  return {
    currentLocale,
    currentShortLocale,
    availableLocales,
    setLocale,
  }
}
