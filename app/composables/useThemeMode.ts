export type ThemeMode = 'light' | 'dark'

export const useThemeMode = () => {
  const themeMode = useState<ThemeMode>('theme-mode', () => 'light')

  useHead({
    script: [
      {
        key: 'theme-init',
        innerHTML: `
          try {
            const storedTheme = localStorage.getItem('theme-mode')
            const theme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light'
            document.documentElement.dataset.theme = theme
          } catch {
            document.documentElement.dataset.theme = 'light'
          }
        `
      }
    ]
  })

  const applyTheme = (mode: ThemeMode) => {
    if (import.meta.client) {
      document.documentElement.dataset.theme = mode
    }
  }

  const toggleTheme = () => {
    themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
  }

  onMounted(() => {
    const storedTheme = localStorage.getItem('theme-mode')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      themeMode.value = storedTheme
    }

    applyTheme(themeMode.value)
  })

  watch(themeMode, (value) => {
    if (import.meta.client) {
      localStorage.setItem('theme-mode', value)
    }

    applyTheme(value)
  })

  return {
    themeMode,
    toggleTheme
  }
}
