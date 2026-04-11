<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()

const BASE_URL = 'https://vamez.ru'

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  title: computed(() => t('seo.ogTitle')),
  meta: [
    { name: 'description', content: computed(() => t('seo.description')) },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Vamez' },
    { property: 'og:title', content: computed(() => t('seo.ogTitle')) },
    { property: 'og:description', content: computed(() => t('seo.description')) },
    { property: 'og:url', content: computed(() => `${BASE_URL}${route.path}`) },
    { property: 'og:locale', content: computed(() => locale.value === 'ru' ? 'ru_RU' : 'en_US') },
    // Twitter / X
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => t('seo.ogTitle')) },
    { name: 'twitter:description', content: computed(() => t('seo.description')) },
  ],
})

const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <AppBottomControls :show-menu="isHomePage" />
  </div>
</template>
