<script setup lang="ts">
import { errorMessages } from '@/data/errorMessages'

useThemeMode()

type NuxtError = {
  url?: string
  statusCode?: number
  statusMessage?: string
  message?: string
}

const props = defineProps<{
  error: NuxtError
}>()

const requestUrl = useRequestURL()
const errorPath = ref(new URL(props.error.url || requestUrl.pathname, requestUrl.origin).pathname)
const errorLocale = computed(() => (/^\/en(?:\/|$)/.test(errorPath.value) ? 'en' : 'ru'))
onMounted(() => {
  errorPath.value = window.location.pathname
})
const messages = computed(() => errorMessages[errorLocale.value])
const homePath = computed(() => (errorLocale.value === 'en' ? '/en' : '/'))
const statusCode = computed(() => props.error.statusCode ?? 500)
const isClientError = computed(() => statusCode.value >= 400 && statusCode.value < 500)
const contentMap = computed(() =>
  isClientError.value ? messages.value.client : messages.value.server
)

useHead(() => ({
  htmlAttrs: { lang: errorLocale.value === 'en' ? 'en-US' : 'ru-RU', dir: 'ltr' },
  title: `${statusCode.value} — ${contentMap.value.title}`,
  meta: [
    { name: 'robots', content: 'noindex, follow' },
    { name: 'description', content: contentMap.value.description }
  ]
}))
</script>

<template>
  <div class="error-screen">
    <main id="main-content" class="error-screen__main">
      <div class="error-screen__content">
        <p class="error-screen__code">{{ statusCode }}</p>
        <h1 class="error-screen__title">{{ contentMap.title }}</h1>
        <p class="error-screen__description">
          {{ contentMap.description }}
        </p>
        <NuxtLink class="error-screen__home-link" :to="homePath">{{
          messages.actions.home
        }}</NuxtLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
.error-screen {
  position: relative;
  min-height: 100dvh;
}

.error-screen__main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: var(--page-gutter);
}

.error-screen__content {
  display: grid;
  gap: 1rem;
  justify-items: start;
  width: min(100%, 48rem);
  padding: clamp(2rem, 5vw, 5rem);
  background: var(--card-surface);
  border-radius: var(--card-radius);
}

.error-screen__code {
  margin: 0;
  font-size: clamp(5rem, 17vw, 11rem);
  font-weight: 800;
  line-height: 0.9;
  color: var(--ink);
  letter-spacing: -0.04em;
}

.error-screen__title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 3.25rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--ink);
  letter-spacing: -0.03em;
}

.error-screen__description {
  max-width: 30rem;
  margin: 0;
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  line-height: 1.65;
  color: var(--ink-muted);
}

.error-screen__home-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.25rem;
  padding: 0 1.4rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ink-on-accent);
  text-decoration: none;
  cursor: pointer;
  background: var(--card-accent);
  border: 0;
  border-radius: var(--control-radius);
  transition: transform 0.2s ease;
}

.error-screen__home-link:active {
  transform: scale(0.975);
}

.error-screen__home-link:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .error-screen__home-link {
    transition: none;
  }
}
</style>
