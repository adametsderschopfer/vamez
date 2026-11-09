<script setup lang="ts">
import { ArrowUpRight, Plus } from 'lucide-vue-next'
import type { WorkProject } from '@/types/workCases'

defineProps<{ project: WorkProject }>()
const { t, locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
</script>

<template>
  <article class="personal-project" :aria-labelledby="`personal-project-${project.key}`">
    <div class="personal-project__heading">
      <h3 :id="`personal-project-${project.key}`" class="personal-project__title">
        {{ project.title[language] }}
      </h3>
      <img
        v-if="project.logo"
        class="personal-project__logo"
        :src="project.logo.src"
        :width="project.logo.width"
        :height="project.logo.height"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
    <p class="personal-project__description">{{ project.description[language] }}</p>
    <ul
      v-if="project.stack?.length"
      class="personal-project__stack"
      :aria-label="t('home.cases.technologies')"
    >
      <li
        v-for="technology in project.stack"
        :key="technology"
        class="personal-project__technology"
      >
        {{ technology }}
      </li>
    </ul>
    <details
      v-if="project.sections?.length || project.contribution"
      class="personal-project__disclosure"
    >
      <summary class="personal-project__summary">
        {{ t('home.personalProjects.developmentDetails') }}
        <Plus :size="20" class="personal-project__toggle-icon" aria-hidden="true" />
      </summary>
      <div class="personal-project__content">
        <dl v-if="project.sections?.length" class="personal-project__details">
          <div v-for="section in project.sections" :key="section.title.ru">
            <dt class="personal-project__label">{{ section.title[language] }}</dt>
            <dd class="personal-project__text">{{ section.description[language] }}</dd>
          </div>
        </dl>
        <div v-if="project.contribution">
          <h4 class="personal-project__label">{{ t('home.cases.contribution') }}</h4>
          <p class="personal-project__text">{{ project.contribution[language] }}</p>
        </div>
      </div>
    </details>
    <div v-if="project.url || project.repositoryUrl" class="personal-project__links">
      <a
        v-if="project.url"
        class="personal-project__link"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('home.personalProjects.visitWebsite') }}
        <ArrowUpRight :size="20" aria-hidden="true" />
      </a>
      <a
        v-if="project.repositoryUrl"
        class="personal-project__link"
        :href="project.repositoryUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('home.personalProjects.sourceCode') }}
        <ArrowUpRight :size="20" aria-hidden="true" />
      </a>
    </div>
  </article>
</template>

<style scoped>
.personal-project {
  --project-padding: clamp(1.25rem, 2.5vw, 2.5rem);
  --project-gap: clamp(1.25rem, 2vw, 2rem);
  --project-logo-size: 3rem;

  display: flex;
  flex-direction: column;
  gap: var(--project-gap);
  min-width: 0;
  height: 100%;
  padding: var(--project-padding);
  background: var(--card-surface);
  border: 1px solid var(--line);
}

.personal-project__heading {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.personal-project__title {
  min-width: 0;
  margin: 0;
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  overflow-wrap: anywhere;
}

.personal-project__logo {
  flex: none;
  width: var(--project-logo-size);
  height: var(--project-logo-size);
}

.personal-project__description,
.personal-project__text {
  max-width: 65ch;
  margin: 0;
  font-size: var(--font-size-body);
  line-height: 1.6;
}

.personal-project__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.personal-project__technology {
  padding: 0.35rem 0.6rem;
  font-size: var(--font-size-meta);
  line-height: 1.4;
  color: var(--ink-muted);
  background: var(--card-soft);
}

.personal-project__disclosure {
  border-top: 1px solid var(--line);
}

.personal-project__summary {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  min-height: 3.5rem;
  padding-top: 0.5rem;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  cursor: pointer;
  list-style: none;
}

.personal-project__summary::-webkit-details-marker {
  display: none;
}

.personal-project__summary:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 5px;
}

.personal-project__toggle-icon {
  flex: none;
}

.personal-project__disclosure[open] .personal-project__toggle-icon {
  transform: rotate(45deg);
}

.personal-project__content,
.personal-project__details {
  display: grid;
  gap: var(--project-gap);
  min-width: 0;
  margin: 0;
}

.personal-project__content {
  padding-top: var(--project-gap);
}

.personal-project__text {
  color: var(--ink-muted);
}

.personal-project__label {
  margin: 0 0 0.5rem;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  line-height: 1.5;
}

.personal-project__links {
  display: grid;
  margin-top: auto;
}

.personal-project__link {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  min-height: 2.75rem;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  color: var(--card-accent);
}

@media (hover: hover) {
  .personal-project__summary:hover {
    color: var(--card-accent);
  }
}
</style>
