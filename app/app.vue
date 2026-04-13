<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const baseUrl = computed(() =>
  String(runtimeConfig.public.siteUrl || 'https://vamez.ru').replace(/\/$/, '')
)
const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
const socialImageUrl = computed(() => `${baseUrl.value}/favicon-96x96.png`)

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value)
  },
  title: computed(() => t('seo.ogTitle')),
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      key: 'yandex-metrika',
      src: '/metrika.js',
      defer: true
    }
  ],
  meta: [
    { name: 'description', content: computed(() => t('seo.description')) },
    { name: 'image', content: socialImageUrl },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Vamez' },
    { property: 'og:title', content: computed(() => t('seo.ogTitle')) },
    { property: 'og:description', content: computed(() => t('seo.description')) },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: socialImageUrl },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:alt', content: computed(() => t('seo.ogTitle')) },
    { property: 'og:locale', content: computed(() => (locale.value === 'ru' ? 'ru_RU' : 'en_US')) },
    // Twitter / X
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => t('seo.ogTitle')) },
    { name: 'twitter:description', content: computed(() => t('seo.description')) },
    { name: 'twitter:image', content: socialImageUrl }
  ]
})

const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <main>
      <NuxtPage />
    </main>
    <noscript>
      <div>
        <img
          src="https://mc.yandex.ru/watch/108521187"
          style="position: absolute; left: -9999px"
          alt=""
        />
      </div>
    </noscript>
    <AppBottomControls :show-menu="isHomePage" />
  </div>
</template>
