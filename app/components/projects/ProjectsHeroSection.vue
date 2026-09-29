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
  --selection-text: var(--ink-on-dark);
  --selection-background: var(--card-dark);

  display: flex;
  flex-direction: column;
  min-height: clamp(22rem, 31vw, 31rem);
  padding: clamp(1.5rem, 3vw, 2.75rem);
  color: var(--ink-on-accent);
  background: var(--card-accent);
  border-radius: var(--card-radius);
}

.projects-hero__topline {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.projects-hero__back {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: inherit;
  text-decoration: none;
}

.projects-hero__back svg {
  transition: transform 0.22s ease;
}

.projects-hero__back:hover svg,
.projects-hero__back:focus-visible svg {
  transform: translate(-2px, -2px);
}

.projects-hero__body {
  margin: auto 0;
}

.projects-hero__title {
  margin: 0;
  font-size: clamp(4.2rem, 11vw, 12rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.085em;
}

.projects-hero__description {
  max-width: 35rem;
  margin: clamp(1.5rem, 3vw, 2.5rem) 0 0;
  font-size: clamp(0.95rem, 1.2vw, 1.18rem);
  line-height: 1.6;
}

@media (max-width: 600px) {
  .projects-hero {
    min-height: 24rem;
  }

  .projects-hero__title {
    font-size: clamp(3.7rem, 16vw, 6rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-hero__back svg {
    transition: none;
  }
}
</style>
