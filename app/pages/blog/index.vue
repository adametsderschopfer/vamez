<script setup lang="ts">
import BlogListSection from '@/components/blog/BlogListSection.vue'

interface BlogPostListItem {
  slug: string
  locale: 'ru' | 'en'
  title: string
  description: string
  date: string
  tags: string[]
}

const { t, locale } = useI18n()
const route = useRoute()
definePageMeta({
  pageTransition: {
    name: 'blog-page-transition',
    mode: 'out-in'
  }
})

const { data } = await useAsyncData(
  () => `blog-list-${locale.value}`,
  () => queryCollection('blog').where('locale', '=', locale.value).all(),
  { watch: [locale] }
)

const posts = computed<BlogPostListItem[]>(() => {
  return (data.value ?? [])
    .filter(
      (item): item is BlogPostListItem =>
        (item.locale === 'ru' || item.locale === 'en') &&
        typeof item.slug === 'string' &&
        typeof item.title === 'string' &&
        typeof item.description === 'string' &&
        typeof item.date === 'string' &&
        Array.isArray(item.tags)
    )
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
})

const activeTags = computed(() => {
  const tagQuery = route.query.tags

  if (typeof tagQuery === 'string') {
    const normalizedTag = tagQuery.trim()
    return normalizedTag ? [normalizedTag] : []
  }

  if (Array.isArray(tagQuery)) {
    return Array.from(
      new Set(
        tagQuery
          .filter((value): value is string => typeof value === 'string')
          .map((value) => value.trim())
          .filter(Boolean)
      )
    )
  }

  return []
})

const allTags = computed<string[]>(() => {
  const tagsSet = new Set<string>()

  for (const post of posts.value) {
    for (const tag of post.tags) {
      const normalizedTag = tag.trim()
      if (normalizedTag) tagsSet.add(normalizedTag)
    }
  }

  return Array.from(tagsSet).sort((a, b) => a.localeCompare(b))
})

const filteredPosts = computed<BlogPostListItem[]>(() => {
  if (!activeTags.value.length) return posts.value

  return posts.value.filter((post) => activeTags.value.some((tag) => post.tags.includes(tag)))
})

useHead({
  title: computed(() => `${t('blog.title')} | Vamez`),
  meta: [{ name: 'description', content: computed(() => t('blog.subtitle')) }]
})
</script>

<template>
  <main class="blog-page">
    <BlogListSection :posts="filteredPosts" :all-tags="allTags" :active-tags="activeTags" />
  </main>
</template>

<style scoped>
.blog-page {
  min-height: 100dvh;
}
</style>
