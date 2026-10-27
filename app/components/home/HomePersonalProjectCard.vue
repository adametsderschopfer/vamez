<script setup lang="ts">
import type { PersonalProject } from '@/data/personalProjects'
import HomePersonalProjectPreview from './HomePersonalProjectPreview.vue'

defineProps<{ project: PersonalProject }>()
const { t } = useI18n()
</script>

<template>
  <article class="personal-project" :aria-labelledby="`personal-project-${project.key}`">
    <HomePersonalProjectPreview :kind="project.key" />
    <div class="personal-project__meta">
      <span>{{ t(`home.personalProjects.${project.key}.category`) }}</span>
      <span class="personal-project__status">{{ t('home.personalProjects.demo') }}</span>
    </div>
    <h3 :id="`personal-project-${project.key}`" class="personal-project__title">
      {{ t(`home.personalProjects.${project.key}.title`) }}
    </h3>
    <p class="personal-project__description">
      {{ t(`home.personalProjects.${project.key}.description`) }}
    </p>
  </article>
</template>

<style scoped>
.personal-project__meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1.25rem;
  font-size: var(--font-size-meta);
  line-height: 1.5;
  color: var(--ink-muted);
}

.personal-project__status {
  font-weight: 600;
}

.personal-project__title {
  margin: 0.625rem 0;
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.personal-project__description {
  max-width: 42ch;
  margin: 0;
  font-size: var(--font-size-body);
  line-height: 1.6;
}
</style>
