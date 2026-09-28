<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="home-projects" aria-labelledby="home-projects-title">
    <NuxtLink class="home-projects__link" :to="localePath('/projects')">
      <div class="home-projects__topline">
        <span>{{ t('projects.teaser.eyebrow') }}</span>
      </div>
      <div class="home-projects__body">
        <div class="home-projects__copy">
          <h2 id="home-projects-title" class="home-projects__title">
            {{ t('projects.teaser.title') }}
          </h2>
          <p class="home-projects__description">{{ t('projects.teaser.description') }}</p>
        </div>
        <span class="home-projects__arrow" aria-hidden="true">
          <ArrowUpRight :size="32" :stroke-width="1.5" />
        </span>
      </div>
    </NuxtLink>
  </section>
</template>

<style scoped>
.home-projects {
  min-width: 0;
}

.home-projects__link {
  --home-projects-padding: clamp(1.5rem, 3vw, 2.75rem);

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: clamp(21rem, 30vw, 32rem);
  padding: var(--home-projects-padding);
  overflow: hidden;
  color: var(--ink);
  text-decoration: none;
  background: var(--card-purple);
  border-radius: var(--card-radius);
  isolation: isolate;
}

.home-projects__topline {
  display: flex;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.home-projects__body {
  display: flex;
  gap: 2rem;
  align-items: end;
  justify-content: space-between;
  margin-top: 4rem;
}

.home-projects__copy {
  position: relative;
  z-index: 1;
}

.home-projects__title {
  margin: 0;
  font-size: clamp(3.7rem, 9vw, 10rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.085em;
}

.home-projects__description {
  max-width: 31rem;
  margin: 1.5rem 0 0;
  font-size: clamp(0.92rem, 1.1vw, 1.05rem);
  line-height: 1.6;
}

.home-projects__arrow {
  position: relative;
  z-index: 1;
  display: grid;
  flex: none;
  place-items: center;
  width: clamp(4rem, 7vw, 6rem);
  aspect-ratio: 1;
  color: var(--ink-on-accent);
  background: var(--card-accent);
  border-radius: 50%;
}

.home-projects__arrow svg {
  transition: transform 0.22s ease;
}

.home-projects__link:hover .home-projects__arrow svg,
.home-projects__link:focus-visible .home-projects__arrow svg {
  transform: translate(3px, -3px);
}

@media (max-width: 600px) {
  .home-projects__body {
    gap: 1rem;
    margin-top: 5rem;
  }

  .home-projects__title {
    font-size: clamp(3.2rem, 13vw, 5rem);
  }

  .home-projects__arrow {
    width: 3.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-projects__arrow svg {
    transition: none;
  }
}
</style>
