<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

const localeOptions = computed(() =>
  locales.value.map((entry) => {
    if (typeof entry === 'string') {
      return { code: entry, name: entry.toUpperCase() }
    }

    return {
      code: entry.code,
      name: entry.name ?? entry.code.toUpperCase()
    }
  })
)
</script>

<template>
  <div class="home">
    <header class="home__header">
      <p class="home__brand">{{ t('brand') }}</p>
      <div class="home__locale-switcher">
        <button
          v-for="option in localeOptions"
          :key="option.code"
          class="home__locale-button"
          :class="{ 'home__locale-button--active': locale === option.code }"
          type="button"
          @click="setLocale(option.code)"
        >
          {{ option.name }}
        </button>
      </div>
    </header>

    <main class="home__content">
      <h1 class="home__title">{{ t('heroTitle') }}</h1>
      <p class="home__subtitle">{{ t('heroSubtitle') }}</p>

      <div class="home__actions">
        <a
          class="home__action home__action--primary"
          href="https://nuxt.com/docs"
          target="_blank"
          rel="noreferrer"
        >
          {{ t('ctaPrimary') }}
        </a>
        <a
          class="home__action home__action--secondary"
          href="https://nuxt.com/docs"
          target="_blank"
          rel="noreferrer"
        >
          {{ t('ctaSecondary') }}
        </a>
      </div>

      <section class="home__cards">
        <article class="home__card">
          <h2 class="home__card-title">{{ t('cardOneTitle') }}</h2>
          <p class="home__card-text">{{ t('cardOneText') }}</p>
        </article>
        <article class="home__card">
          <h2 class="home__card-title">{{ t('cardTwoTitle') }}</h2>
          <p class="home__card-text">{{ t('cardTwoText') }}</p>
        </article>
        <article class="home__card">
          <h2 class="home__card-title">{{ t('cardThreeTitle') }}</h2>
          <p class="home__card-text">{{ t('cardThreeText') }}</p>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home {
  width: min(1080px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding: 2rem 0 3.5rem;
}

.home__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.home__brand {
  margin: 0;
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.home__locale-switcher {
  display: inline-flex;
  gap: 0.4rem;
  background: rgba(238, 255, 163, 0.46);
  border: 1px solid rgba(121, 145, 26, 0.34);
  border-radius: 999px;
  padding: 0.25rem;
}

.home__locale-button {
  border: 0;
  background: transparent;
  color: var(--color-text);
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.home__locale-button--active {
  background: var(--color-accent);
  color: var(--color-surface);
}

.home__content {
  display: grid;
  gap: 1.5rem;
}

.home__title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
  max-width: 14ch;
}

.home__subtitle {
  margin: 0;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  max-width: 56ch;
  color: var(--color-text-soft);
}

.home__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.home__action {
  text-decoration: none;
  border: 1px solid transparent;
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  transition: transform 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}

.home__action:hover {
  transform: translateY(-2px);
}

.home__action--primary {
  background: var(--color-accent);
  color: var(--color-surface);
}

.home__action--secondary {
  background: rgba(248, 255, 206, 0.52);
  border-color: rgba(121, 145, 26, 0.36);
  color: var(--color-text);
}

.home__cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 1rem;
}

.home__card {
  background: rgba(255, 255, 226, 0.56);
  border: 1px solid rgba(121, 145, 26, 0.32);
  border-radius: 1rem;
  padding: 1.15rem;
  backdrop-filter: blur(4px);
}

.home__card-title {
  margin: 0 0 0.55rem;
  font-size: 1.2rem;
}

.home__card-text {
  margin: 0;
  color: var(--color-text-soft);
  line-height: 1.5;
}

@media (max-width: 900px) {
  .home__cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .home {
    width: min(1080px, calc(100% - 1.5rem));
    padding-top: 1.25rem;
  }

  .home__header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2.1rem;
  }
}
</style>
