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
    !Array.isArray(item.tags)
  ) {
    return null
  }

  return item as JournalPostDocument
})

if (!postDocument.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useHead({
  title: computed(() => `${postDocument.value?.title ?? 'Post'} | Vamez`),
  meta: [{ name: 'description', content: computed(() => postDocument.value?.description ?? '') }]
})
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
