import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  routeRules: {
    '/**': { prerender: true }
  },
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url))
  },
  app: {
    head: {
      title: 'Vladislav Adamets',
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Vladislav Adamets' },
        { name: 'theme-color', content: '#111111' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://vamez.ru' },
      ]
    }
  },
  modules: ['@nuxt/eslint', '@nuxt/content', '@nuxtjs/i18n'],
  css: ['@/assets/css/main.css'],
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      useCookie: true
    },
    langDir: 'locales',
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  }
})
