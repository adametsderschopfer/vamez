export type ThemeMode = 'light' | 'dark'

export function useThemeMode() {
  const themeCookie = useCookie<ThemeMode>('theme-mode', {
    default: () => 'dark',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365
  })
  const themeMode = useState<ThemeMode>('theme-mode', () =>
    themeCookie.value === 'light' ? 'light' : 'dark'
  )

  useHead(() => ({
    htmlAttrs: { 'data-theme': themeMode.value },
    script: [
      {
        key: 'theme-init',
        tagPriority: 'critical',
        innerHTML: `
          try {
            const cookie = document.cookie.match(/(?:^|; )theme-mode=(dark|light)(?:;|$)/)
            document.documentElement.dataset.theme = cookie ? cookie[1] : 'dark'
          } catch {
            document.documentElement.dataset.theme = 'dark'
          }
        `
      }
    ],
    meta: [
      {
        name: 'theme-color',
        content: themeMode.value === 'dark' ? '#171717' : '#e5e5e0'
      }
    ]
  }))

  function applyTheme(mode: ThemeMode) {
    document.documentElement.dataset.theme = mode
  }

  watch(
    themeMode,
    (mode) => {
      if (!import.meta.client) return
      themeCookie.value = mode
      applyTheme(mode)
    },
    { flush: 'sync' }
  )

  onMounted(() => {
    // Prerendered HTML carries the default theme; the early script reads the actual cookie.
    themeMode.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
    applyTheme(themeMode.value)
  })

  function toggleTheme() {
    themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
  }

  return { themeMode, toggleTheme }
}
