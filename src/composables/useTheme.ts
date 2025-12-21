import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'noco-form-theme'

// Global state - shared across all components
const currentTheme = ref<Theme>('dark')

/**
 * Theme Management Composable
 *
 * Features:
 * - Persistent theme storage (localStorage)
 * - System preference detection
 * - Real-time theme switching
 * - Auto-apply theme on mount
 */
export function useTheme() {
  /**
   * Set theme and persist to localStorage
   */
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  /**
   * Detect system color scheme preference
   */
  const getSystemTheme = (): Theme => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  const initTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initialTheme = savedTheme || getSystemTheme()
    setTheme(initialTheme)
  }

  /**
   * Listen to system theme changes
   */
  const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    })
  }

  // Auto-initialize on first use
  onMounted(() => {
    initTheme()
    watchSystemTheme()
  })

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme,
    getSystemTheme,
    initTheme
  }
}
