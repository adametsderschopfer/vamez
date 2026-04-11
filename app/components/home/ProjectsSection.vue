<script setup lang="ts">
import { ExternalLink, Github } from 'lucide-vue-next'

interface ProjectItem {
  id: string
  order: number
  title: string
  description: string
  stack: string[]
  link: string | null
  github: string | null
}

interface ProjectsContent {
  locale: 'ru' | 'en'
  items: ProjectItem[]
}

const { t, locale } = useI18n()
const { containerRef, isRevealed } = useScrollReveal()

const { data } = await useAsyncData(
  () => `projects-${locale.value}`,
  () => queryCollection('projects').where('locale', '=', locale.value).first(),
  { watch: [locale] }
)

const projects = computed<ProjectItem[]>(() => {
  const content = data.value as ProjectsContent | null
  if (!content || !Array.isArray(content.items)) return []
  return [...content.items].sort((a, b) => a.order - b.order)
})
</script>

<template>
  <section id="projects" ref="containerRef" class="projects-section" data-anchor>
    <div class="projects-section__container" :class="{ 'is-revealed': isRevealed }">
      <div class="projects-section__header">
        <h2 class="projects-section__title">{{ t('home.projects.title') }}</h2>
      </div>

      <div class="projects-section__grid">
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          class="project-card"
          :style="{ transitionDelay: `${0.1 + i * 0.1}s` }"
        >
          <div class="project-card__body">
            <h3 class="project-card__title">{{ project.title }}</h3>
            <p class="project-card__description">{{ project.description }}</p>

            <div v-if="project.stack.length" class="project-card__stack">
              <span v-for="tech in project.stack" :key="tech" class="project-card__tag">{{
                tech
              }}</span>
            </div>
          </div>

          <div v-if="project.link || project.github" class="project-card__links">
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noreferrer"
              class="project-card__link"
            >
              <ExternalLink :size="16" />
              <span>Live</span>
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noreferrer"
              class="project-card__link"
            >
              <Github :size="16" />
              <span>Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  padding: 0 20px;
}

.projects-section__container {
  padding: clamp(2rem, 6vw, 4rem) 0;
}

.projects-section__header {
  padding: 0 70px;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.projects-section__container.is-revealed .projects-section__header {
  opacity: 1;
  transform: translateY(0);
}

.projects-section__title {
  margin: 0;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
}

.projects-section__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  padding: 0 70px;
}

.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.75rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  opacity: 0;
  backdrop-filter: blur(16px);
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.projects-section__container.is-revealed .project-card {
  opacity: 1;
  transform: translateY(0);
}

.project-card:hover {
  border-color: rgba(159, 202, 60, 0.4);
  box-shadow: 0 8px 32px var(--glass-shadow);
}

.project-card__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-card__title {
  margin: 0;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.project-card__description {
  margin: 0;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  line-height: 1.7;
  color: var(--color-text-soft);
}

.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.project-card__tag {
  padding: 0.25rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-text-soft);
  white-space: nowrap;
  background: color-mix(in srgb, var(--glass-bg) 60%, transparent);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
}

.project-card__links {
  display: flex;
  gap: 0.75rem;
  padding-top: 1.25rem;
  margin-top: 1.25rem;
  border-top: 1px solid var(--glass-border);
}

.project-card__link {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-soft);
  text-decoration: none;
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.project-card__link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-1px);
}

.project-card__link:active {
  transform: scale(0.97);
}

@media (max-width: 768px) {
  .projects-section__header {
    padding: 0 20px;
  }

  .projects-section__grid {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
}

@media (max-width: 640px) {
  .project-card {
    padding: 1.25rem;
  }
}
</style>
