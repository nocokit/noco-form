import { createRouter, createWebHistory } from 'vue-router'

// Supported locales
export const SUPPORTED_LOCALES = ['zh-CN', 'en-US', 'ja-JP', 'es-ES', 'de-DE', 'fr-FR', 'pt-BR']
export const DEFAULT_LOCALE = 'zh-CN'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Root redirect to default locale
    {
      path: '/',
      redirect: () => {
        const savedLocale = localStorage.getItem('noco-form-editor-locale')
        const browserLang = navigator.language

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

        let targetLocale = DEFAULT_LOCALE

        if (savedLocale && localeMap[savedLocale]) {
          targetLocale = localeMap[savedLocale]
        } else if (browserLang) {
          const lang = browserLang.toLowerCase().split('-')[0]
          targetLocale = localeMap[lang] || DEFAULT_LOCALE
        }

        return `/${targetLocale}`
      }
    },

    // Locale-based routes
    {
      path: '/:locale',
      name: 'form-editor',
      component: () => import('../views/FormEditor/index.vue'),
      beforeEnter: (to, from, next) => {
        const locale = to.params.locale as string

        // Validate locale
        if (!SUPPORTED_LOCALES.includes(locale)) {
          return next(`/${DEFAULT_LOCALE}`)
        }

        // Save to localStorage
        const shortLocale = locale.split('-')[0]
        localStorage.setItem('noco-form-editor-locale', shortLocale)

        next()
      }
    },

    // Locale with ID
    {
      path: '/:locale/:id',
      name: 'form-editor-with-id',
      component: () => import('../views/FormEditor/index.vue'),
      beforeEnter: (to, from, next) => {
        const locale = to.params.locale as string

        // Validate locale
        if (!SUPPORTED_LOCALES.includes(locale)) {
          return next(`/${DEFAULT_LOCALE}/${to.params.id}`)
        }

        // Save to localStorage
        const shortLocale = locale.split('-')[0]
        localStorage.setItem('noco-form-editor-locale', shortLocale)

        next()
      }
    },

    // Fallback - redirect invalid paths
    {
      path: '/:pathMatch(.*)*',
      redirect: `/${DEFAULT_LOCALE}`
    }
  ]
})

export default router
