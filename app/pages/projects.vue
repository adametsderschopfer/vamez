<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import SiteControls from '@/components/home/SiteControls.vue'
import ProjectGallery from '@/components/projects/ProjectGallery.vue'
import HomeContactSection from '@/components/home/HomeContactSection.vue'
import HomeLegalSection from '@/components/home/HomeLegalSection.vue'
import HomeFooter from '@/components/home/HomeFooter.vue'
const { t } = useI18n()
const localePath = useLocalePath()
definePageMeta({ seoPage: 'projects' })
</script>

<template>
  <div id="top" class="projects-page">
    <header class="projects-page__header">
      <NuxtLink class="projects-page__back" :to="localePath('/')"
        ><ArrowLeft :size="20" />{{ t('portfolio.back') }}</NuxtLink
      ><SiteControls />
    </header>
    <main class="projects-page__main">
      <h1 class="projects-page__title">{{ t('portfolio.title') }}</h1>
      <p class="projects-page__description">{{ t('home.cases.notice') }}</p>
      <ProjectGallery />
      <HomeContactSection />
      <HomeLegalSection />
    </main>
    <HomeFooter />
  </div>
</template>

<style scoped>
.projects-page {
  width: min(100%, var(--content-width));
  min-height: 100dvh;
  padding: 0 var(--page-gutter);
  margin: 0 auto;
}

.projects-page__header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-height);
  background: var(--page-background);
  border-bottom: 1px solid var(--line);
}

.projects-page__back {
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
  color: var(--ink);
  text-decoration: none;
}

.projects-page__main {
  padding: clamp(2rem, 5vw, 5rem) 0;
}

.projects-page__title {
  margin: 0;
  font-size: clamp(3rem, 7vw, 7rem);
  line-height: 1.1;
  letter-spacing: -0.05em;
}

.projects-page__description {
  max-width: 48ch;
  margin: 1.5rem 0 0;
  line-height: 1.6;
  color: var(--ink-muted);
}
</style>
