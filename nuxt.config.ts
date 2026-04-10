// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  i18n: {
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    langDir: 'locales',
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  }
})
