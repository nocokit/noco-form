import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// Get language from localStorage or browser (only supported languages)
const getDefaultLocale = (): string => {
  // Use same localStorage key as useLocale
  const savedLocale = localStorage.getItem('noco-form-locale')
  if (savedLocale && (savedLocale === 'zh-CN' || savedLocale === 'en-US')) {
    return savedLocale
  }

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) return 'zh-CN'
  if (browserLang.startsWith('en')) return 'en-US'

  return 'zh-CN' // Default fallback
}

export type MessageSchema = typeof zhCN

const i18n = createI18n<[MessageSchema], 'zh-CN' | 'en-US'>({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  globalInjection: true,
})

export default i18n

// Export helper functions
export const setLocale = (locale: string) => {
  i18n.global.locale.value = locale as 'zh-CN' | 'en-US'
  localStorage.setItem('noco-form-locale', locale)
}

export const getLocale = () => {
  return i18n.global.locale.value
}

export const t = i18n.global.t
