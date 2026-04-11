<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

interface BlogPostDocument {
  readonly title: string
  readonly description: string
  readonly date: string
  readonly tags: string[]
  readonly body?: unknown
}

const props = defineProps<{
  post: BlogPostDocument
}>()

const { locale, t } = useI18n()

const dateFormatter = computed(
  () =>
    new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
      dateStyle: 'long'
    })
)
</script>

<template>
  <article class="blog-post">
    <header class="blog-post__header">
      <p class="blog-post__date">{{ dateFormatter.format(new Date(props.post.date)) }}</p>
      <ul v-if="props.post.tags.length" class="blog-post__tags" :aria-label="t('blog.tags')">
        <li v-for="tag in props.post.tags" :key="tag" class="blog-post__tag-item">
          <NuxtLink :to="{ path: '/blog', query: { tags: tag } }" class="blog-post__tag">
            {{ tag }}
          </NuxtLink>
        </li>
      </ul>
      <h1 class="blog-post__title">
        <NuxtLink
          to="/blog"
          class="blog-post__title-back"
          :aria-label="t('blog.backToBlog')"
          :title="t('blog.backToBlog')"
        >
          <ArrowLeft :size="26" />
        </NuxtLink>
        <span>{{ props.post.title }}</span>
      </h1>
    </header>

    <ContentRenderer class="blog-post__content" :value="props.post" />
  </article>
</template>

<style scoped>
.blog-post {
  --blog-post-max-width: 52rem;

  width: min(100% - 2rem, var(--blog-post-max-width));
  margin: 0 auto;
  padding: clamp(4rem, 6vw, 6rem) 0 clamp(7rem, 10vw, 9rem);
}

.blog-post__header {
  display: grid;
  gap: 0.75rem;
  margin-bottom: clamp(1.7rem, 3vw, 2.4rem);
}

.blog-post__date {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-soft);
}

.blog-post__title {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin: 0;
  font-size: clamp(2rem, 6vw, 3.7rem);
  line-height: 0.96;
}

.blog-post__title-back {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  color: var(--color-text-soft);
  text-decoration: none;
  border-radius: 999px;
  transition:
    transform 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;
}

.blog-post__title-back:hover,
.blog-post__title-back:focus-visible {
  color: var(--color-text);
  background: color-mix(in srgb, var(--glass-bg) 88%, transparent);
  transform: translateX(-2px);
  outline: none;
}

.blog-post__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.blog-post__tag-item {
  margin: 0;
}

.blog-post__tag {
  display: inline-flex;
  align-items: center;
  min-height: 1.7rem;
  padding: 0 0.65rem;
  font-size: 0.75rem;
  line-height: 1;
  color: var(--color-text-soft);
  text-decoration: none;
  border: 1px solid color-mix(in srgb, var(--glass-border) 70%, transparent);
  border-radius: 999px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.blog-post__tag:hover,
.blog-post__tag:focus-visible {
  color: var(--color-text);
  background: color-mix(in srgb, var(--glass-border) 45%, transparent);
  border-color: color-mix(in srgb, var(--color-accent) 40%, var(--glass-border));
  outline: none;
}

.blog-post__content {
  line-height: 1.8;
}

.blog-post__content :deep(h2) {
  margin: 2rem 0 0.85rem;
  font-size: clamp(1.35rem, 3vw, 2rem);
}

.blog-post__content :deep(p) {
  margin: 0 0 1rem;
}

.blog-post__content :deep(ul) {
  padding-left: 1.2rem;
  margin: 0 0 1rem;
}

.blog-post__content :deep(li) {
  margin-bottom: 0.5rem;
}
</style>
