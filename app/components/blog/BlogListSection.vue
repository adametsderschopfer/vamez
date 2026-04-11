<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { Pin } from 'lucide-vue-next'

interface BlogPostListItem {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly date: string
  readonly tags: string[]
}

const props = defineProps<{
  posts: BlogPostListItem[]
  allTags: string[]
  activeTags: string[]
}>()

const { locale, t } = useI18n()
const route = useRoute()
const router = useRouter()
const POSTS_STEP = 10
const visibleCount = ref(POSTS_STEP)
const postItemRefs = ref<HTMLElement[]>([])
const visiblePostMap = ref<Record<string, boolean>>({})
const hasTagPanel = computed(() => props.allTags.length > 0)

let postObserver: IntersectionObserver | null = null

const dateFormatter = computed(
  () =>
    new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
      dateStyle: 'long'
    })
)

const visiblePosts = computed(() => props.posts.slice(0, visibleCount.value))
const hasMorePosts = computed(() => visibleCount.value < props.posts.length)

function showMorePosts(): void {
  visibleCount.value = props.posts.length
}

function isActiveTag(tag: string): boolean {
  return props.activeTags.includes(tag)
}

function toggleTag(tag: string): void {
  const selectedTags = new Set(props.activeTags)

  if (selectedTags.has(tag)) selectedTags.delete(tag)
  else selectedTags.add(tag)

  const nextTags = Array.from(selectedTags)
  const nextQuery = { ...route.query, tags: nextTags }
  delete nextQuery.tag

  if (!nextTags.length) delete nextQuery.tags

  router.push({ path: '/blog', query: nextQuery })
}

function isPostVisible(slug: string): boolean {
  return Boolean(visiblePostMap.value[slug])
}

function setPostRef(
  el: Element | ComponentPublicInstance | null,
  index: number,
  slug: string
): void {
  if (!(el instanceof HTMLElement)) return
  el.dataset.slug = slug
  postItemRefs.value[index] = el
}

function markVisible(slug: string): void {
  if (visiblePostMap.value[slug]) return
  visiblePostMap.value = { ...visiblePostMap.value, [slug]: true }
}

function observeVisiblePosts(): void {
  if (!import.meta.client) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (const post of visiblePosts.value) markVisible(post.slug)
    return
  }

  if (!postObserver) {
    postObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const slug = (entry.target as HTMLElement).dataset.slug
          if (!slug) continue
          markVisible(slug)
          postObserver?.unobserve(entry.target)
        }
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    )
  }

  postObserver.disconnect()

  for (const el of postItemRefs.value) {
    if (!el) continue
    const slug = el.dataset.slug
    if (!slug || visiblePostMap.value[slug]) continue
    postObserver.observe(el)
  }
}

watch(
  () => [props.posts, props.activeTags.join('|')],
  () => {
    visibleCount.value = POSTS_STEP
    postItemRefs.value = []
  }
)

watch(
  () => visiblePosts.value.map((post) => post.slug),
  async () => {
    await nextTick()
    observeVisiblePosts()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  postObserver?.disconnect()
})
</script>

<template>
  <section class="blog-list" aria-labelledby="blog-list-title">
    <div class="blog-list__main">
      <div class="blog-list__head">
        <h1 id="blog-list-title" class="blog-list__title">{{ t('blog.title') }}</h1>
        <p class="blog-list__subtitle">{{ t('blog.subtitle') }}</p>

        <ul v-if="hasTagPanel" class="blog-list__filter-list" :aria-label="t('blog.tags')">
          <li v-for="tag in props.allTags" :key="tag" class="blog-list__filter-item">
            <button
              type="button"
              class="blog-list__filter-link"
              :class="{ 'blog-list__filter-link--active': isActiveTag(tag) }"
              @click="toggleTag(tag)"
            >
              <span>{{ tag }}</span>
              <Transition name="blog-list-pin">
                <span v-if="isActiveTag(tag)" class="blog-list__filter-pin" aria-hidden="true">
                  <Pin :size="15" />
                </span>
              </Transition>
            </button>
          </li>
        </ul>
      </div>

      <ul class="blog-list__items">
        <li
          v-for="(post, index) in visiblePosts"
          :key="post.slug"
          :ref="(el) => setPostRef(el, index, post.slug)"
          class="blog-list__item"
          :class="{ 'blog-list__item--visible': isPostVisible(post.slug) }"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="blog-list__link">
            <p class="blog-list__date">{{ dateFormatter.format(new Date(post.date)) }}</p>
            <h2 class="blog-list__item-title">{{ post.title }}</h2>
            <p class="blog-list__description">{{ post.description }}</p>
            <ul v-if="post.tags.length" class="blog-list__tags" :aria-label="t('blog.tags')">
              <li v-for="tag in post.tags" :key="tag" class="blog-list__tag">{{ tag }}</li>
            </ul>
          </NuxtLink>
        </li>
      </ul>

      <button v-if="hasMorePosts" class="blog-list__show-more" type="button" @click="showMorePosts">
        {{ t('blog.showMore') }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.blog-list {
  --blog-list-max-width: 62rem;
  --blog-list-card-min-height: 11rem;

  width: min(100% - 2rem, var(--blog-list-max-width));
  margin: 0 auto;
  padding: clamp(4rem, 6vw, 6rem) 0 clamp(7rem, 10vw, 9rem);
}

.blog-list__main {
  min-width: 0;
}

.blog-list__head {
  display: grid;
  gap: 0.7rem;
  margin-bottom: clamp(1.6rem, 4vw, 2.5rem);
}

.blog-list__title {
  margin: 0;
  font-size: clamp(2rem, 6vw, 3.7rem);
  line-height: 0.95;
}

.blog-list__subtitle {
  max-width: 38rem;
  margin: 0;
  font-size: clamp(0.95rem, 1.6vw, 1.12rem);
  line-height: 1.65;
  color: var(--color-text-soft);
}

.blog-list__items {
  display: grid;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.blog-list__item {
  min-height: var(--blog-list-card-min-height);
  opacity: 1;
  transform: none;
}

.blog-list__item--visible {
  animation: blogItemReveal 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

.blog-list__link {
  display: grid;
  gap: 0.55rem;
  height: 100%;
  padding: clamp(1.15rem, 2.5vw, 1.5rem);
  color: var(--color-text);
  text-decoration: none;
  background: color-mix(in srgb, var(--glass-bg) 92%, transparent);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  box-shadow: 0 18px 50px var(--glass-shadow);
  backdrop-filter: blur(24px);
  transition:
    transform 0.22s ease,
    border-color 0.22s ease;
}

.blog-list__link:hover,
.blog-list__link:focus-visible {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--color-accent) 45%, var(--glass-border));
  outline: none;
}

.blog-list__date {
  margin: 0;
  font-size: 0.86rem;
  letter-spacing: 0.02em;
  color: var(--color-text-soft);
}

.blog-list__item-title {
  margin: 0;
  font-size: clamp(1.2rem, 2.3vw, 1.55rem);
  line-height: 1.2;
}

.blog-list__description {
  max-width: 45rem;
  margin: 0;
  line-height: 1.65;
  color: var(--color-text-soft);
}

.blog-list__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0;
  margin: 0.25rem 0 0;
  list-style: none;
}

.blog-list__tag {
  display: inline-flex;
  align-items: center;
  min-height: 1.5rem;
  padding: 0 0.55rem;
  font-size: 0.7rem;
  line-height: 1;
  color: var(--color-text-soft);
  border: 1px solid color-mix(in srgb, var(--glass-border) 70%, transparent);
  border-radius: 999px;
}

.blog-list__show-more {
  margin-top: 1rem;
  min-height: 2.7rem;
  padding: 0 1rem;
  color: var(--color-text);
  cursor: pointer;
  background: color-mix(in srgb, var(--glass-bg) 92%, transparent);
  border: 1px solid var(--glass-border);
  border-radius: 0.85rem;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.blog-list__show-more:hover,
.blog-list__show-more:focus-visible {
  background: color-mix(in srgb, var(--glass-border) 45%, transparent);
  transform: translateY(-1px);
  outline: none;
}

.blog-list__filter-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0;
  margin: 0.15rem 0 0;
  list-style: none;
}

.blog-list__filter-item {
  margin: 0;
}

.blog-list__filter-link {
  display: inline-flex;
  gap: 0.35rem;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  min-height: 1.65rem;
  padding: 0 0.55rem;
  font-size: 0.74rem;
  color: var(--color-text-soft);
  cursor: pointer;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--glass-border) 65%, transparent);
  border-radius: 999px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.blog-list__filter-link:hover,
.blog-list__filter-link:focus-visible {
  color: var(--color-text);
  background: color-mix(in srgb, var(--glass-border) 45%, transparent);
  outline: none;
}

.blog-list__filter-link--active {
  color: var(--color-text);
  background: color-mix(in srgb, var(--glass-border) 55%, transparent);
  border-color: color-mix(in srgb, var(--color-accent) 45%, var(--glass-border));
}

.blog-list__filter-pin {
  position: absolute;
  top: -0.4rem;
  right: -0.32rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  color: var(--color-accent);
  transform: rotate(18deg);
}

.blog-list-pin-enter-active,
.blog-list-pin-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.blog-list-pin-enter-from,
.blog-list-pin-leave-to {
  opacity: 0;
  transform: translateY(2px) scale(0.82) rotate(30deg);
}

.blog-list-pin-enter-to,
.blog-list-pin-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(18deg);
}

@keyframes blogItemReveal {
  from {
    opacity: 0.86;
    transform: translateY(10px) scale(0.99);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
