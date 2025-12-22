import { ref, onMounted } from 'vue'

export type Theme = 'dark'

const STORAGE_KEY = 'noco-form-theme'

// Global state - shared across all components
const currentTheme = ref<Theme>('dark')

/**
 * Theme Management Composable
 *
 * Features:
 * - Dark theme only (light theme disabled)
 * - Persistent theme storage (localStorage)
 * - Auto-apply theme on mount
 */
export function useTheme() {
  /**
   * Set theme (always dark)
   */
  const setTheme = (theme: Theme) => {
    currentTheme.value = 'dark'
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem(STORAGE_KEY, 'dark')
  }

  /**
   * Toggle theme (disabled - always dark)
   */
  const toggleTheme = () => {
    // Theme toggle disabled - always use dark theme
    setTheme('dark')
  }

  /**
   * Get system theme (always returns dark)
   */
  const getSystemTheme = (): Theme => {
    return 'dark'
  }

  /**
   * Initialize theme (always dark)
   */
  const initTheme = () => {
    setTheme('dark')
  }

  /**
   * Listen to system theme changes (disabled)
   */
  const watchSystemTheme = () => {
    // System theme watching disabled - always use dark theme
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
