<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

interface BlogPostDocument {
  readonly title: string
  readonly description: string
  readonly date: string
  readonly author?: string
  readonly readingTime?: string
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
      <NuxtLink to="/#journal" class="blog-post__back-link" :aria-label="t('blog.backToJournal')">
        <ArrowLeft :size="18" />
        <span>{{ t('blog.backToJournal') }}</span>
      </NuxtLink>

      <div class="blog-post__meta">
        <p class="blog-post__meta-item">
          <span>{{ t('blog.published') }}:</span>
          {{ dateFormatter.format(new Date(props.post.date)) }}
        </p>
        <p v-if="props.post.author" class="blog-post__meta-item">
          <span>{{ t('blog.author') }}:</span> {{ props.post.author }}
        </p>
        <p v-if="props.post.readingTime" class="blog-post__meta-item">
          <span>{{ t('blog.readingTime') }}:</span> {{ props.post.readingTime }}
        </p>
      </div>

      <h1 class="blog-post__title">{{ props.post.title }}</h1>

      <ul v-if="props.post.tags.length" class="blog-post__tags" :aria-label="t('blog.tags')">
        <li v-for="tag in props.post.tags" :key="tag" class="blog-post__tag">{{ tag }}</li>
      </ul>

      <p class="blog-post__lead">{{ props.post.description }}</p>
    </header>

    <ContentRenderer class="blog-post__content" :value="props.post" />
  </article>
</template>

<style scoped>
.blog-post {
  --blog-post-page-inset: clamp(1.5rem, 5vw, 6.5rem);

  width: calc(100% - (var(--blog-post-page-inset) * 2));
  padding: clamp(2rem, 3vw, 3rem) 0 clamp(6rem, 10vw, 9rem);
  margin: 0 auto;
}

.blog-post__header {
  display: grid;
  gap: 1.25rem;
  margin-bottom: clamp(1.7rem, 3vw, 2.4rem);
}

.blog-post__back-link {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  width: fit-content;
  font-size: 0.9rem;
  color: var(--journal-page-content);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.blog-post__back-link:hover {
  opacity: 0.55;
}

.blog-post__back-link:focus-visible {
  outline: 1px solid currentcolor;
  outline-offset: 0.35rem;
}

.blog-post__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
}

.blog-post__meta-item {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.4;
  color: var(--journal-page-content);
}

.blog-post__meta-item span {
  color: var(--journal-page-content);
}

.blog-post__title {
  margin: 0;
  font-size: clamp(2.35rem, 5vw, 4.8rem);
  font-weight: 500;
  line-height: 0.94;
  color: var(--journal-page-text);
  letter-spacing: -0.055em;
}

.blog-post__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.blog-post__tag {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.55rem;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1;
  color: var(--journal-page-content);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid color-mix(in srgb, var(--journal-page-content) 35%, transparent);
  border-radius: 0.2rem;
}

.blog-post__lead {
  margin: 0;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  line-height: 1.5;
  color: var(--journal-page-content);
}

.blog-post__content {
  font-size: clamp(1.25rem, 1.65vw, 2rem);
  line-height: 1.32;
  color: var(--journal-page-content);
}

.blog-post__content ::v-deep(h2) {
  margin: clamp(3rem, 5vw, 5rem) 0 1.25rem;
  font-size: clamp(2rem, 2.7vw, 3.35rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.blog-post__content ::v-deep(p) {
  margin: 0 0 clamp(1.75rem, 3vw, 3.5rem);
}

.blog-post__content ::v-deep(ul) {
  padding-left: 1.5rem;
  margin: 0 0 clamp(1.75rem, 3vw, 3.5rem);
}

.blog-post__content ::v-deep(li) {
  margin-bottom: 0.85rem;
}
</style>
