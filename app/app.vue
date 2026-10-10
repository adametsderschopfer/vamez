<script setup lang="ts">
const { t, locale } = useI18n()
const { scrollToSection } = useSectionScroll()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const i18nHead = useLocaleHead({ seo: true })

const appBaseUrl = computed(() => String(runtimeConfig.app.baseURL || '/').replace(/\/?$/, '/'))
const baseUrl = computed(() =>
  String(runtimeConfig.public.siteUrl || 'https://vamez.ru').replace(/\/$/, '')
)
const canonicalUrl = computed(
  () =>
    i18nHead.value.link?.find((link) => link.rel === 'canonical')?.href ||
    `${baseUrl.value}${route.path}`
)
const socialImageUrl = computed(
  () => `${baseUrl.value}${appBaseUrl.value}social-${locale.value}.png`
)
const metrikaScriptUrl = computed(() => `${appBaseUrl.value}metrika.js`)
const analyticsReady = ref(false)
onNuxtReady(() => {
  analyticsReady.value = !import.meta.dev
})
const localeLanguage = computed(() => (locale.value === 'ru' ? 'ru-RU' : 'en-US'))
const isProjectsPage = computed(() => /\/projects\/?$/.test(route.path))
const pageTitle = computed(() => t(isProjectsPage.value ? 'seo.projectsTitle' : 'seo.ogTitle'))
const pageDescription = computed(() =>
  t(
    isProjectsPage.value
      ? import.meta.dev
        ? 'seo.projectsDescription'
        : 'seo.projectsComingSoonDescription'
      : 'seo.description'
  )
)
const personName = computed(() => `${t('home.intro.firstName')} ${t('home.intro.lastName')}`)
const personId = computed(() => `${baseUrl.value}/#person`)
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': personId.value,
      '@type': 'Person',
      name: personName.value,
      url: `${baseUrl.value}/`,
      sameAs: [
        'https://github.com/adametsderschopfer',
        'https://www.youtube.com/@vlad_adamets',
        'https://t.me/adametsderschopfer'
      ]
    },
    {
      '@id': `${baseUrl.value}/#website`,
      '@type': 'WebSite',
      author: { '@id': personId.value },
      inLanguage: localeLanguage.value,
      name: 'Vamez',
      url: baseUrl.value
    },
    {
      '@id': `${canonicalUrl.value}#webpage`,
      '@type': 'WebPage',
      about: { '@id': personId.value },
      description: pageDescription.value,
      inLanguage: localeLanguage.value,
      isPartOf: { '@id': `${baseUrl.value}/#website` },
      name: pageTitle.value,
      url: canonicalUrl.value
    }
  ]
}))

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  title: pageTitle.value,
  link: i18nHead.value.link || [],
  script: [
    ...(analyticsReady.value
      ? [{ key: 'yandex-metrika', src: metrikaScriptUrl.value, defer: true }]
      : []),
    {
      key: 'website-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData.value)
    }
  ],
  meta: [
    ...(i18nHead.value.meta || []),
    { name: 'description', content: pageDescription.value },
    { name: 'image', content: socialImageUrl.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Vamez' },
    { property: 'og:title', content: pageTitle.value },
    { property: 'og:description', content: pageDescription.value },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: socialImageUrl.value },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: pageTitle.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle.value },
    { name: 'twitter:description', content: pageDescription.value },
    { name: 'twitter:image', content: socialImageUrl.value },
    { name: 'twitter:image:alt', content: pageTitle.value }
  ]
}))
</script>

<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <a
      class="app-shell__skip"
      href="#main-content"
      @click="scrollToSection('main-content', $event)"
    >
      {{ t('controls.skipToContent') }}
    </a>
    <NuxtPage />
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

<style scoped>
.app-shell__skip {
  position: fixed;
  top: 1rem;
  left: var(--page-gutter);
  z-index: 200;
  padding: 0.75rem 1rem;
  color: var(--ink-on-accent);
  background: var(--card-accent);
  transform: translateY(calc(-100% - 2rem));
}

.app-shell__skip:focus {
  transform: none;
}
</style>
