<script setup lang="ts">
import BlogPostSection from '@/components/blog/BlogPostSection.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'

interface JournalPostDocument {
  slug: string
  locale: 'ru' | 'en'
  title: string
  description: string
  date: string
  author?: string
  readingTime?: string
  socialImage?: string
  tags: string[]
}

const route = useRoute()
const { locale } = useI18n()
const { themeMode } = useThemeMode()

const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param[0] : param
})

const { data: post } = await useAsyncData(
  () => `journal-post-${locale.value}-${slug.value}`,
  () =>
    queryCollection('blog')
      .where('slug', '=', slug.value)
      .where('locale', '=', locale.value)
      .first(),
  { watch: [locale, slug] }
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const postDocument = computed<JournalPostDocument | null>(() => {
  const item = post.value

  if (
    !item ||
    (item.locale !== 'ru' && item.locale !== 'en') ||
    typeof item.slug !== 'string' ||
    typeof item.title !== 'string' ||
    typeof item.description !== 'string' ||
    typeof item.date !== 'string' ||
    (typeof item.socialImage !== 'undefined' && typeof item.socialImage !== 'string') ||
    !Array.isArray(item.tags)
  ) {
    return null
  }

  return item as JournalPostDocument
})

if (!postDocument.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() =>
  String(runtimeConfig.public.siteUrl || 'https://vamez.ru').replace(/\/$/, '')
)
const postUrl = computed(() => `${siteUrl.value}${route.path}`)
const postImageUrl = computed(() => {
  const imagePath = postDocument.value?.socialImage || '/favicon-96x96.png'
  return `${siteUrl.value}${imagePath}`
})
const localeLanguage = computed(() => (locale.value === 'ru' ? 'ru-RU' : 'en-US'))
const postSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  author: {
    '@type': 'Person',
    name: postDocument.value?.author || 'Vladislav Adamets'
  },
  datePublished: postDocument.value?.date,
  description: postDocument.value?.description,
  headline: postDocument.value?.title,
  image: postImageUrl.value,
  inLanguage: localeLanguage.value,
  mainEntityOfPage: postUrl.value,
  url: postUrl.value
}))

useSeoMeta({
  title: () => `${postDocument.value?.title ?? 'Post'} | Vamez`,
  description: () => postDocument.value?.description ?? '',
  ogType: 'article',
  ogTitle: () => postDocument.value?.title ?? '',
  ogDescription: () => postDocument.value?.description ?? '',
  ogUrl: postUrl,
  ogImage: postImageUrl,
  ogImageAlt: () => postDocument.value?.title ?? '',
  ogImageType: 'image/png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  articlePublishedTime: () => postDocument.value?.date ?? '',
  articleAuthor: () => postDocument.value?.author || 'Vladislav Adamets',
  twitterCard: 'summary_large_image',
  twitterTitle: () => postDocument.value?.title ?? '',
  twitterDescription: () => postDocument.value?.description ?? '',
  twitterImage: postImageUrl
})

useHead(() => ({
  script: [
    {
      key: 'blog-post-structured-data',
      type: 'application/ld+json',
      children: JSON.stringify(postSchema.value)
    }
  ]
}))
</script>

<template>
  <main class="journal-post-page" :class="{ 'journal-post-page--dark': themeMode === 'dark' }">
    <HomeHeader />
    <BlogPostSection v-if="postDocument" :post="postDocument" />
  </main>
</template>

<style scoped>
.journal-post-page {
  --journal-page-background: #f7f4ec;
  --journal-page-content: #171716;
  --journal-page-text: #1979bd;

  position: relative;
  min-height: 100dvh;
  color: var(--journal-page-text);
  background: var(--journal-page-background);
}

.journal-post-page--dark {
  --journal-page-background: #191816;
  --journal-page-content: #f7f4ec;
  --journal-page-text: #89cdf6;
}
</style>
