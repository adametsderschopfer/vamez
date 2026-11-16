<script setup lang="ts">
import type { WorkProject } from '@/types/workCases'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectDialog from '@/components/projects/ProjectDialog.vue'
import HomeUpcomingProjectCard from './HomeUpcomingProjectCard.vue'

const { t } = useI18n()
const selected = shallowRef<WorkProject | null>(null)
const { data: projects, error } = await useAsyncData('personal-projects', () =>
  queryCollection('projects').where('company', '=', 'personal').order('order', 'ASC').all()
)

if (error.value) throw createError(error.value)
</script>

<template>
  <section
    id="personal-projects"
    class="personal-projects"
    aria-labelledby="personal-projects-title"
  >
    <div class="personal-projects__intro">
      <h2 id="personal-projects-title" class="personal-projects__title">
        {{ t('home.personalProjects.title') }}
      </h2>
      <p class="personal-projects__description">{{ t('home.personalProjects.description') }}</p>
    </div>
    <ul v-if="projects?.length" class="personal-projects__list">
      <li v-for="project in projects" :key="project.key" class="personal-projects__item">
        <ProjectCard :project="project" show-website @select="selected = project" />
      </li>
      <li class="personal-projects__item">
        <HomeUpcomingProjectCard />
      </li>
    </ul>
    <ProjectDialog v-if="selected" :project="selected" @close="selected = null" />
  </section>
</template>

<style scoped>
.personal-projects {
  --personal-gap: clamp(1rem, 2vw, 2rem);

  padding: var(--section-space) 0;
}

.personal-projects__intro {
  display: flex;
  gap: var(--personal-gap);
  align-items: flex-end;
  justify-content: space-between;
}

.personal-projects__title {
  max-width: 12ch;
  margin: 0;
  font-size: clamp(2.75rem, 6vw, 6rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.04em;
}

.personal-projects__description {
  max-width: 30ch;
  margin: 0;
  font-size: var(--font-size-body);
  line-height: 1.6;
}

.personal-projects__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--personal-gap);
  padding: 0;
  margin: clamp(2rem, 5vw, 4rem) 0 0;
  list-style: none;
}

.personal-projects__item {
  display: flex;
  min-width: 0;
}

@media (min-width: 1200px) {
  .personal-projects__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 799px) {
  .personal-projects__list {
    grid-template-columns: minmax(0, 1fr);
  }

  .personal-projects__intro {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 599px) {
  .personal-projects__title {
    font-size: clamp(2.25rem, 10vw, 3.5rem);
  }
}
</style>
