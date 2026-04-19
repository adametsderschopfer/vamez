<script setup lang="ts">
import BlogPostSection from '@/components/blog/BlogPostSection.vue'

interface BlogPostDocument {
  slug: string
  locale: 'ru' | 'en'
  title: string
  description: string
  date: string
  tags: string[]
}

const route = useRoute()
const { locale } = useI18n()
definePageMeta({
  pageTransition: {
    name: 'blog-page-transition',
    mode: 'out-in'
  }
})

const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param[0] : param
})

const { data: post } = await useAsyncData(
  () => `blog-post-${locale.value}-${slug.value}`,
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

const postDocument = computed<BlogPostDocument | null>(() => {
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

  return item as BlogPostDocument
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
  <main class="blog-post-page">
    <BlogPostSection v-if="postDocument" :post="postDocument" />
  </main>
</template>

<style scoped>
.blog-post-page {
  min-height: 100dvh;
}
</style>
