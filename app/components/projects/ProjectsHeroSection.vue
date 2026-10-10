<script setup lang="ts">
import { ArrowUpLeft } from 'lucide-vue-next'
import SiteControls from '@/components/home/SiteControls.vue'

const { t } = useI18n()
const localePath = useLocalePath()
defineProps<{ showProjects: boolean }>()
</script>

<template>
  <section class="projects-hero" aria-labelledby="projects-hero-title">
    <div class="projects-hero__topline">
      <NuxtLink class="projects-hero__back" :to="localePath('/')">
        <ArrowUpLeft :size="18" :stroke-width="1.7" aria-hidden="true" />
        {{ t('projects.back') }}
      </NuxtLink>
      <SiteControls />
    </div>
    <div class="projects-hero__body">
      <h1 id="projects-hero-title" class="projects-hero__title">{{ t('projects.title') }}</h1>
      <p class="projects-hero__description">
        {{ t(showProjects ? 'projects.description' : 'projects.soonDescription') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.projects-hero {
  --projects-heading-space: clamp(3rem, 7vw, 6rem);

  display: grid;
  gap: var(--projects-heading-space);
  color: var(--ink);
}

.projects-hero__topline {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  min-height: 3.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.projects-hero__back {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  min-height: 2.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: inherit;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.25em;
  transition: text-decoration-color 0.18s ease;
}

.projects-hero__back:hover {
  text-decoration-color: currentcolor;
}

.projects-hero__back:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 0.3rem;
}

.projects-hero__body {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  padding-bottom: clamp(1.5rem, 3vw, 3rem);
}

.projects-hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 9vw, 6rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
}

.projects-hero__description {
  max-width: 55ch;
  margin: 0;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.65;
}

@media (max-width: 380px) {
  .projects-hero__topline {
    gap: 0.5rem;
  }

  .projects-hero__back {
    gap: 0.25rem;
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-hero__back {
    transition: none;
  }
}
</style>
