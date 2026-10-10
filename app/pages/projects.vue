<script setup lang="ts">
import ProjectsHeroSection from '@/components/projects/ProjectsHeroSection.vue'
import ProjectsYearSection from '@/components/projects/ProjectsYearSection.vue'
import ProjectsArticleDialog from '@/components/projects/ProjectsArticleDialog.vue'
import ProjectsFilterSection from '@/components/projects/ProjectsFilterSection.vue'

const showProjects = import.meta.dev
const { locale, t } = useI18n()
const { data: projectContent } = await useAsyncData('projects', () =>
  showProjects ? queryCollection('projects').all() : Promise.resolve([])
)
const projects = computed(() =>
  (projectContent.value ?? [])
    .filter((project) => project.locale === locale.value)
    .sort((first, second) => second.year - first.year || first.order - second.order)
)
const projectTechnologies = computed(() =>
  [...new Set(projects.value.flatMap((project) => project.technologies))].sort()
)
const selectedTechnology = ref<string | null>(null)
const filteredProjects = computed(() => {
  const technology = selectedTechnology.value
  return technology
    ? projects.value.filter((project) => project.technologies.includes(technology))
    : projects.value
})
const visibleYears = computed(() =>
  [...new Set(filteredProjects.value.map((project) => project.year))].sort((a, b) => b - a)
)
const { selectedProject, dialogRef, openProject, closeProject } = useProjectDialog()

function projectsForYear(year: number) {
  return filteredProjects.value.filter((project) => project.year === year)
}
</script>

<template>
  <div class="projects-page">
    <div class="projects-page__content" :inert="selectedProject ? true : undefined">
      <main id="main-content" class="projects-page__main">
        <ProjectsHeroSection :show-projects="showProjects" />
        <div v-if="showProjects" class="projects-page__archive">
          <ProjectsFilterSection
            :technologies="projectTechnologies"
            :selected-technology="selectedTechnology"
            @select="selectedTechnology = $event"
          />
          <div class="projects-page__years" :aria-label="t('projects.title')">
            <ProjectsYearSection
              v-for="year in visibleYears"
              :key="year"
              :year="year"
              :projects="projectsForYear(year)"
              @select="openProject"
            />
          </div>
        </div>
      </main>
      <footer class="projects-page__footer">
        <span>© {{ new Date().getFullYear() }} · {{ t('seo.ogTitle') }}</span>
        <span v-if="showProjects">{{ t('projects.footer') }}</span>
      </footer>
    </div>
    <ProjectsArticleDialog
      v-if="showProjects && selectedProject"
      ref="dialogRef"
      :project="selectedProject"
      @close="closeProject"
    />
  </div>
</template>

<style scoped>
.projects-page {
  min-height: 100dvh;
  background: var(--page-background);
}

.projects-page__content {
  display: grid;
  gap: clamp(2rem, 4vw, 4rem);
  width: min(100%, var(--content-width));
  padding: 0 var(--page-gutter);
  margin: 0 auto;
}

.projects-page__main {
  display: grid;
  gap: var(--section-space);
}

.projects-page__archive {
  display: grid;
  gap: clamp(1.25rem, 2vw, 2rem);
}

.projects-page__years {
  display: grid;
  gap: clamp(3rem, 6vw, 5rem);
}

.projects-page__footer {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 1.5rem 0;
  font-size: 0.8125rem;
  color: var(--ink-muted);
  border-top: 1px solid var(--line);
}

@media (max-width: 560px) {
  .projects-page__footer {
    flex-direction: column;
  }
}
</style>
