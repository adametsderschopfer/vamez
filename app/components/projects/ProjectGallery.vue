<script setup lang="ts">
import type { WorkCase, WorkProject } from '@/types/workCases'
import CompanyRail from './CompanyRail.vue'
import ProjectFilters from './ProjectFilters.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectDialog from './ProjectDialog.vue'

const { t } = useI18n()
const { data: companies, error } = await useWorkCases()
if (error.value) throw createError(error.value)
const kind = shallowRef('all')
const selectedTechnologies = shallowRef<string[]>([])
const selected = shallowRef<{ project: WorkProject; company: WorkCase } | null>(null)
const root = useTemplateRef<HTMLElement>('root')
const technologies = computed(() =>
  [
    ...new Set(
      companies.value?.flatMap((company) =>
        company.projects.flatMap((project) => project.stack ?? [])
      )
    )
  ].sort()
)
const filtered = computed(() =>
  (companies.value ?? [])
    .map((company) => ({
      ...company,
      projects: company.projects.filter((project) => {
        const app =
          project.preview?.kind === 'app' ||
          project.stack?.some((item) =>
            ['React Native', 'Android', 'iOS', 'Flutter'].includes(item)
          )
        return (
          (kind.value === 'all' || (kind.value === 'app' ? app : !app)) &&
          (!selectedTechnologies.value.length ||
            project.stack?.some((item) => selectedTechnologies.value.includes(item)))
        )
      })
    }))
    .filter((company) => company.projects.length)
)
const count = computed(() =>
  filtered.value.reduce((sum, company) => sum + company.projects.length, 0)
)
const { active, navigate } = useCompanyScroll(root, () =>
  filtered.value.map((company) => company.key)
)
</script>

<template>
  <div class="project-gallery">
    <ProjectFilters
      v-model:kind="kind"
      v-model:selected-technologies="selectedTechnologies"
      :technologies="technologies"
      :count="count"
    />
    <div v-if="filtered.length" class="project-gallery__layout">
      <CompanyRail :companies="filtered" :active="active" @navigate="navigate" />
      <div ref="root" class="project-gallery__groups">
        <section
          v-for="company in filtered"
          :key="company.key"
          class="project-gallery__group"
          :data-company="company.key"
          :aria-labelledby="`company-${company.key}`"
          tabindex="-1"
        >
          <h2 :id="`company-${company.key}`" class="project-gallery__company">
            {{ company.name }} <span>{{ company.projects.length }}</span>
          </h2>
          <ul class="project-gallery__grid">
            <li v-for="project in company.projects" :key="project.key">
              <ProjectCard :project="project" @select="selected = { project, company }" />
            </li>
          </ul>
        </section>
      </div>
    </div>
    <p v-else class="project-gallery__empty">{{ t('portfolio.empty') }}</p>
    <ProjectDialog
      v-if="selected"
      :project="selected.project"
      :company="selected.company"
      @close="selected = null"
    />
  </div>
</template>

<style scoped>
.project-gallery {
  --gallery-gap: clamp(1rem, 2vw, 2rem);
  --company-group-gap: 3.5rem;

  padding-bottom: var(--company-group-gap);
}

.project-gallery__layout {
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr);
  gap: var(--gallery-gap);
  align-items: start;
}

.project-gallery__groups {
  min-width: 0;
}

.project-gallery__group {
  scroll-margin-top: 1.5rem;
}

.project-gallery__group + .project-gallery__group {
  margin-top: var(--company-group-gap);
}

.project-gallery__company {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  margin: 0 0 1.25rem;
  font-size: 1.25rem;
  font-weight: 500;
}

.project-gallery__company span {
  font-size: 0.875rem;
  color: var(--ink-muted);
}

.project-gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--gallery-gap);
  padding: 0;
  margin: 0;
  list-style: none;
}

.project-gallery__empty {
  padding: 4rem 0;
}

@media (max-width: 1400px) {
  .project-gallery__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1000px) {
  .project-gallery__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .project-gallery__layout {
    grid-template-columns: 4rem minmax(0, 1fr);
    gap: 0.75rem;
  }

  .project-gallery__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
