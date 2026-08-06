<script setup lang="ts">
interface JournalPost {
  readonly slug: string
  readonly locale: 'ru' | 'en'
  readonly title: string
  readonly description: string
  readonly date: string
  readonly tags: string[]
}

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data } = await useAsyncData(
  () => `home-journal-${locale.value}`,
  () => queryCollection('blog').where('locale', '=', locale.value).all(),
  { watch: [locale] }
)

const posts = computed<JournalPost[]>(() =>
  (data.value ?? [])
    .filter(
      (item): item is JournalPost =>
        (item.locale === 'ru' || item.locale === 'en') &&
        typeof item.slug === 'string' &&
        typeof item.title === 'string' &&
        typeof item.description === 'string' &&
        typeof item.date === 'string' &&
        Array.isArray(item.tags)
    )
    .sort((first, second) => +new Date(second.date) - +new Date(first.date))
)

const dateFormatter = computed(
  () =>
    new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
      dateStyle: 'long'
    })
)
</script>

<template>
  <section id="journal" class="home-journal" aria-labelledby="home-journal-title">
    <header class="home-journal__header">
      <h2 id="home-journal-title" class="home-journal__title">{{ t('blog.title') }}</h2>
      <p class="home-journal__subtitle">{{ t('blog.subtitle') }}</p>
    </header>

    <ul class="home-journal__list">
      <li v-for="post in posts" :key="post.slug" class="home-journal__item">
        <NuxtLink :to="localePath(`/journal/${post.slug}`)" class="home-journal__link">
          <h3 class="home-journal__item-title">{{ post.title }}</h3>

          <ul v-if="post.tags.length" class="home-journal__tags" :aria-label="t('blog.tags')">
            <li v-for="tag in post.tags" :key="tag" class="home-journal__tag">{{ tag }}</li>
          </ul>

          <p class="home-journal__description">{{ post.description }}</p>
          <p class="home-journal__date">{{ dateFormatter.format(new Date(post.date)) }}</p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.home-journal {
  width: 100%;
  padding: clamp(1.5rem, 3vw, 2.75rem) clamp(1.25rem, 5vw, 5rem) clamp(5rem, 9vw, 9rem);
}

.home-journal__header {
  display: grid;
  gap: 0.8rem;
  max-width: 42rem;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.home-journal__title {
  margin: 0;
  font-size: clamp(2.1rem, 3.2vw, 3.5rem);
  font-weight: 500;
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: -0.06em;
}

.home-journal__subtitle {
  margin: 0;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.5;
  color: var(--home-page-contact);
}

.home-journal__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  padding: 0;
  margin: 0;
  list-style: none;
}

.home-journal__item {
  border-top: 1px solid color-mix(in srgb, var(--home-page-text) 36%, transparent);
}

.home-journal__link {
  display: grid;
  gap: 0.85rem;
  align-content: start;
  min-height: 100%;
  padding: 1.2rem 0 0;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.home-journal__link:hover {
  opacity: 0.66;
}

.home-journal__link:focus-visible {
  outline: 1px solid currentcolor;
  outline-offset: 0.45rem;
}

.home-journal__item-title {
  margin: 0;
  font-size: clamp(1.35rem, 2.2vw, 2rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.04em;
}

.home-journal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.home-journal__tag {
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1;
  color: var(--home-page-contact);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid color-mix(in srgb, var(--home-page-contact) 35%, transparent);
  border-radius: 0.2rem;
}

.home-journal__description {
  margin: 0;
  line-height: 1.55;
  color: var(--home-page-contact);
}

.home-journal__date {
  margin: 0.25rem 0 0;
  font-size: 0.82rem;
  line-height: 1.35;
  color: var(--home-page-contact);
}

@media (max-width: 640px) {
  .home-journal {
    padding-top: 1.5rem;
  }
}
</style>
