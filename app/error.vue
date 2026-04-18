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
  min-height: 100vh;
}

.error-screen__main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.error-screen__content {
  display: grid;
  gap: 0.9rem;
  justify-items: center;
  max-width: 42rem;
  text-align: center;
}

.error-screen__eyebrow {
  margin: 0;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.error-screen__code {
  margin: 0;
  font-size: clamp(4.5rem, 14vw, 10rem);
  font-weight: 700;
  line-height: 0.9;
  color: color-mix(in srgb, var(--color-text) 86%, transparent);
}

.error-screen__title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 3.25rem);
  font-weight: 600;
  line-height: 1;
  color: var(--color-text);
}

.error-screen__description {
  max-width: 30rem;
  margin: 0;
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  line-height: 1.65;
  color: var(--color-text-soft);
}

.error-screen__home-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.25rem;
  padding: 0 1.4rem;
  color: var(--color-text);
  text-decoration: none;
  cursor: pointer;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  box-shadow: 0 18px 50px var(--glass-shadow);
  backdrop-filter: blur(24px);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.error-screen__home-link:active {
  transform: scale(0.975);
}

@media (hover: hover) and (pointer: fine) {
  .error-screen__home-link:hover {
    transform: translateY(-1px) scale(1.015);
  }
}
</style>
