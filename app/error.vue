<script setup lang="ts">
type NuxtError = {
  statusCode?: number
  statusMessage?: string
  message?: string
}

const props = defineProps<{
  error: NuxtError
}>()

let t: (key: string) => string = (key) => key
try {
  const i18n = useI18n()
  t = i18n.t
} catch {
  // i18n not available in error context, use key as fallback
}

const statusCode = computed(() => props.error.statusCode ?? 500)
const isClientError = computed(() => statusCode.value >= 400 && statusCode.value < 500)

const contentMap = computed(() =>
  isClientError.value
    ? {
        eyebrow: '',
        title: t('error.client.title'),
        description: t('error.client.description')
      }
    : {
        eyebrow: t('error.server.eyebrow'),
        title: t('error.server.title'),
        description: t('error.server.description')
      }
)
</script>

<template>
  <div class="error-screen">
    <main class="error-screen__main">
      <div class="error-screen__content">
        <p v-if="contentMap.eyebrow" class="error-screen__eyebrow">{{ contentMap.eyebrow }}</p>
        <p class="error-screen__code">{{ statusCode }}</p>
        <h1 class="error-screen__title">{{ contentMap.title }}</h1>
        <p class="error-screen__description">
          {{ contentMap.description }}
        </p>
        <NuxtLink class="error-screen__home-link" to="/">{{ t('error.actions.home') }}</NuxtLink>
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

.error-screen__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.error-screen__code {
  margin: 0;
  font-size: clamp(5rem, 17vw, 11rem);
  font-weight: 800;
  line-height: 0.9;
  color: var(--ink);
  letter-spacing: -0.1em;
}

.error-screen__title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 3.25rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--ink);
  letter-spacing: -0.06em;
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
  color: #1b221d;
  text-decoration: none;
  cursor: pointer;
  background: var(--card-accent);
  border: 0;
  border-radius: 999px;
  transition: transform 0.2s ease;
}

.error-screen__home-link:active {
  transform: scale(0.975);
}

.error-screen__home-link:hover {
  transform: translateY(-2px);
}
</style>
