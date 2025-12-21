import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// Get language from localStorage or browser
const getDefaultLocale = (): string => {
  const savedLocale = localStorage.getItem('noco-form-locale')
  if (savedLocale) return savedLocale

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) return 'zh-CN'
  if (browserLang.startsWith('en')) return 'en-US'
  if (browserLang.startsWith('ja')) return 'ja-JP'
  if (browserLang.startsWith('es')) return 'es-ES'
  if (browserLang.startsWith('de')) return 'de-DE'
  if (browserLang.startsWith('fr')) return 'fr-FR'
  if (browserLang.startsWith('pt')) return 'pt-BR'

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
