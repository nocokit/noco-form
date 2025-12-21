import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useLocale = () => {
  const router = useRouter()
  const route = useRoute()

  // Map short codes to full locale codes
  const localeMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en-US',
    'ja': 'ja-JP',
    'es': 'es-ES',
    'de': 'de-DE',
    'fr': 'fr-FR',
    'pt': 'pt-BR'
  }

  // Reverse map
  const reverseLocaleMap: Record<string, string> = {
    'zh-CN': 'zh',
    'en-US': 'en',
    'ja-JP': 'ja',
    'es-ES': 'es',
    'de-DE': 'de',
    'fr-FR': 'fr',
    'pt-BR': 'pt'
  }

  const currentLocale = computed(() => {
    const routeLocale = route.params.locale as string
    return routeLocale || 'zh-CN'
  })

  const currentShortLocale = computed(() => {
    return reverseLocaleMap[currentLocale.value] || 'zh'
  })

  const availableLocales = [
    { code: 'zh', fullCode: 'zh-CN', label: '简体中文' },
    { code: 'en', fullCode: 'en-US', label: 'English' },
    { code: 'ja', fullCode: 'ja-JP', label: '日本語' },
    { code: 'es', fullCode: 'es-ES', label: 'Español' },
    { code: 'de', fullCode: 'de-DE', label: 'Deutsch' },
    { code: 'fr', fullCode: 'fr-FR', label: 'Français' },
    { code: 'pt', fullCode: 'pt-BR', label: 'Português' },
  ]

  const setLocale = (newShortLocale: string) => {
    const newFullLocale = localeMap[newShortLocale]

    if (!newFullLocale) {
      console.error('Invalid locale:', newShortLocale)
      return
    }

    // Save to localStorage
    localStorage.setItem('noco-form-editor-locale', newShortLocale)

    // Update route
    const currentPath = route.path
    const currentParams = route.params
    const id = currentParams.id

    // Build new path
    let newPath = `/${newFullLocale}`
    if (id) {
      newPath += `/${id}`
    }

    // Navigate to new locale route
    if (currentPath !== newPath) {
      router.push(newPath)
    }
  }

  return {
    currentLocale,
    currentShortLocale,
    availableLocales,
    setLocale,
  }
}
