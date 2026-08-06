<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const i18nHead = useLocaleHead({ seo: true })

const appBaseUrl = computed(() => String(runtimeConfig.app.baseURL || '/').replace(/\/?$/, '/'))
const baseUrl = computed(() =>
  String(runtimeConfig.public.siteUrl || 'https://vamez.ru').replace(/\/$/, '')
)
const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
const socialImageUrl = computed(() => `${baseUrl.value}/favicon-96x96.png`)
const metrikaScriptUrl = computed(() => `${appBaseUrl.value}metrika.js`)
const localeLanguage = computed(() => (locale.value === 'ru' ? 'ru-RU' : 'en-US'))
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${baseUrl.value}/#website`,
      '@type': 'WebSite',
      inLanguage: localeLanguage.value,
      name: 'Vamez',
      url: baseUrl.value
    },
    {
      '@id': `${canonicalUrl.value}#webpage`,
      '@type': 'WebPage',
      description: t('seo.description'),
      inLanguage: localeLanguage.value,
      isPartOf: { '@id': `${baseUrl.value}/#website` },
      name: t('seo.ogTitle'),
      url: canonicalUrl.value
    }
  ]
}))

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  title: t('seo.ogTitle'),
  link: [
    ...(i18nHead.value.link || []),
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap'
    }
  ],
  script: [
    {
      key: 'yandex-metrika',
      src: metrikaScriptUrl.value,
      defer: true
    },
    {
      key: 'website-structured-data',
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value)
    }
  ],
  meta: [
    ...(i18nHead.value.meta || []),
    { name: 'description', content: t('seo.description') },
    { name: 'image', content: socialImageUrl.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Vamez' },
    { property: 'og:title', content: t('seo.ogTitle') },
    { property: 'og:description', content: t('seo.description') },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: socialImageUrl.value },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:alt', content: t('seo.ogTitle') },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('seo.ogTitle') },
    { name: 'twitter:description', content: t('seo.description') },
    { name: 'twitter:image', content: socialImageUrl.value }
  ]
}))
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
  </div>
</template>
