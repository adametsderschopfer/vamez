export type ThemeMode = 'light' | 'dark'

export const useThemeMode = () => {
  const themeCookie = useCookie<ThemeMode>('theme-mode', {
    default: () => 'dark',
    sameSite: 'lax'
  })

  const themeMode = useState<ThemeMode>('theme-mode', () => themeCookie.value ?? 'dark')

  useHead({
    script: [
      {
        key: 'theme-init',
        innerHTML: `
          try {
            const cookieMatch = document.cookie.match(/(?:^|; )theme-mode=(dark|light)(?:;|$)/)
            const storedTheme = cookieMatch ? decodeURIComponent(cookieMatch[1]) : 'dark'
            const theme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'dark'
            document.documentElement.dataset.theme = theme
          } catch {
            document.documentElement.dataset.theme = 'dark'
          }
        `
      }
    ]
  })

  const applyTheme = (mode: ThemeMode) => {
    if (import.meta.client) {
      document.documentElement.classList.add('theme-transition')
      document.documentElement.dataset.theme = mode
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, 400)
    }
  }

  const toggleTheme = () => {
    themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
  }

  onMounted(() => {
    applyTheme(themeMode.value)
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
    themeMode,
    toggleTheme
  }
}
