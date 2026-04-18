import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      siteUrl: 'https://vamez.ru'
    }
  },
  experimental: {
    buildCache: true
  },
  nitro: {
    compressPublicAssets: {
      gzip: false,
      brotli: true
    },
    prerender: {
      concurrency: 10,
      crawlLinks: true,
      routes: ['/', '/blog', '/sitemap.xml']
    }
  },
  routeRules: {
    '/**': {
      prerender: true,
      headers: {
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://mc.yandex.ru",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: https://mc.yandex.ru https://mc.yandex.com",
          "font-src 'self' https://fonts.gstatic.com",
          "connect-src 'self' https://mc.yandex.ru https://mc.yandex.com wss://mc.yandex.com",
          "frame-src https://mc.yandex.ru https://mc.yandex.com",
          "object-src 'none'",
          "base-uri 'self'"
        ].join('; '),
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
      }
    }
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
        { name: 'yandex-verification', content: '408e9c6c152e0036' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=20260413' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  modules: ['@nuxt/eslint', '@nuxt/content', '@nuxtjs/i18n'],
  css: ['@/assets/css/main.css'],
  vite: {
    build: {
      sourcemap: false,
      minify: 'esbuild',
      cssMinify: 'esbuild'
    }
  },
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
