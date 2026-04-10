export type ThemeMode = 'light' | 'dark'

export const useThemeMode = () => {
  const themeCookie = useCookie<ThemeMode>('theme-mode', {
    default: () => 'light',
    sameSite: 'lax'
  })

  const themeMode = useState<ThemeMode>('theme-mode', () => themeCookie.value ?? 'light')
  const isThemeReady = useState('theme-ready', () => false)

  useHead({
    script: [
      {
        key: 'theme-init',
        innerHTML: `
          try {
            const cookieMatch = document.cookie.match(/(?:^|; )theme-mode=(dark|light)(?:;|$)/)
            const storedTheme = cookieMatch ? decodeURIComponent(cookieMatch[1]) : 'light'
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
    applyTheme(themeMode.value)
    isThemeReady.value = true
  })

  watch(
    themeMode,
    (value) => {
      themeCookie.value = value
      applyTheme(value)
    },
    { immediate: true }
  )

  return {
    isThemeReady,
    themeMode,
    toggleTheme
  }
}
