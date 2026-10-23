<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { WorkProject } from '@/types/workCases'
import HomeProjectPreview from './HomeProjectPreview.vue'

defineProps<{ projects: WorkProject[]; companyId: string }>()
const { t, locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
</script>

<template>
  <div class="project-grid">
    <h4 class="project-grid__title">{{ t('home.cases.projects') }}</h4>
    <ul class="project-grid__list">
      <li v-for="project in projects" :key="project.key" class="project-grid__item">
        <article
          class="project-grid__card"
          :aria-labelledby="`project-title-${companyId}-${project.key}`"
        >
          <HomeProjectPreview v-if="project.preview" :preview="project.preview" />
          <div class="project-grid__content">
            <span v-if="project.isPlaceholder" class="project-grid__placeholder">
              {{ t('home.cases.placeholder') }}
            </span>
            <div class="project-grid__heading-group">
              <h5 :id="`project-title-${companyId}-${project.key}`" class="project-grid__heading">
                {{ project.title[language] }}
              </h5>
              <img
                v-if="project.logo"
                class="project-grid__logo"
                :src="project.logo.src"
                :width="project.logo.width"
                :height="project.logo.height"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <p class="project-grid__description">{{ project.description[language] }}</p>
            <dl v-if="project.sections?.length" class="project-grid__sections">
              <div
                v-for="section in project.sections"
                :key="section.title.ru"
                class="project-grid__section"
              >
                <dt class="project-grid__section-title">{{ section.title[language] }}</dt>
                <dd class="project-grid__description">{{ section.description[language] }}</dd>
              </div>
            </dl>
            <div v-if="project.contribution" class="project-grid__contribution">
              <h6 class="project-grid__contribution-title">{{ t('home.cases.contribution') }}</h6>
              <p class="project-grid__description">{{ project.contribution[language] }}</p>
            </div>
            <ul
              v-if="project.stack?.length"
              class="project-grid__technologies"
              :aria-label="t('home.cases.technologies')"
            >
              <li v-for="technology in project.stack" :key="technology">{{ technology }}</li>
            </ul>
            <a
              v-if="project.url"
              class="project-grid__link"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('home.cases.projectWebsite') }}
              <ArrowUpRight :size="18" aria-hidden="true" />
            </a>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.project-grid {
  --project-gap: 1rem;
  --project-padding: clamp(1rem, 1.6vw, 1.5rem);
  --project-surface: color-mix(in srgb, var(--case-background), var(--case-ink) 6%);

  min-width: 0;
}

.project-grid__title {
  margin: 0 0 1rem;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
}

.project-grid__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--project-gap);
  padding: 0;
  margin: 0;
  list-style: none;
}

.project-grid__item {
  display: flex;
  min-width: 0;
}

.project-grid__item:only-child {
  grid-column: 1 / -1;
}

.project-grid__card {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: var(--project-surface);
  border: 1px solid var(--case-rule);
}

.project-grid__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.875rem;
  padding: var(--project-padding);
}

.project-grid__heading {
  max-width: 22ch;
  margin: 0;
  font-size: clamp(1.25rem, 1.6vw, 1.75rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.project-grid__placeholder {
  align-self: flex-start;
  padding: 0.25rem 0.5rem;
  font-size: var(--font-size-meta);
  font-weight: var(--font-weight-meta);
  line-height: 1.4;
  border: 1px dashed var(--case-rule);
}

.project-grid__heading-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.project-grid__logo {
  display: block;
  flex: none;
  width: 9rem;
  height: auto;
}

.project-grid__description {
  max-width: 60ch;
  margin: 0;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  line-height: 1.6;
}

.project-grid__contribution {
  padding-top: 1rem;
  border-top: 1px solid var(--case-rule);
}

.project-grid__sections {
  display: grid;
  gap: 1rem;
  margin: 0;
}

.project-grid__section {
  display: grid;
  gap: 0.4rem;
}

.project-grid__section-title {
  font-size: var(--font-size-label);
  font-weight: 600;
  line-height: 1.5;
}

.project-grid__contribution-title {
  margin: 0 0 0.5rem;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
}

.project-grid__link {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  align-self: flex-start;
  margin-top: auto;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  line-height: 1.6;
  color: inherit;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.3em;
}

.project-grid__link:focus-visible {
  outline: 2px solid currentcolor;
  outline-offset: 0.35rem;
}

@media (hover: hover) {
  .project-grid__link:hover {
    text-decoration: none;
  }
}

.project-grid__technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  padding: 1rem 0 0;
  margin: auto 0 0;
  font-size: var(--font-size-meta);
  font-weight: var(--font-weight-meta);
  list-style: none;
  border-top: 1px solid var(--case-rule);
}

@media (min-width: 1200px) {
  .project-grid__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
