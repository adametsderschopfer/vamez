<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '@/types/projects'

defineProps<{
  year: number
  projects: Project[]
}>()

const emit = defineEmits<{ select: [project: Project, trigger: HTMLButtonElement] }>()
const { t } = useI18n()

function selectProject(project: Project, event: MouseEvent) {
  if (event.currentTarget instanceof HTMLButtonElement) {
    emit('select', project, event.currentTarget)
  }
}
</script>

<template>
  <section class="projects-year" :aria-labelledby="`projects-year-${year}`">
    <div class="projects-year__marker">
      <h2 :id="`projects-year-${year}`" class="projects-year__number">{{ year }}</h2>
    </div>
    <div class="projects-year__grid">
      <button
        v-for="project in projects"
        :key="project.id"
        class="projects-year__card"
        :class="`projects-year__card--${project.tone}`"
        type="button"
        :aria-label="`${t('projects.openProject')}: ${project.title}`"
        @click="selectProject(project, $event)"
      >
        <span class="projects-year__card-topline">
          <span>{{ project.category }}</span>
          <ArrowUpRight
            class="projects-year__arrow"
            :size="19"
            :stroke-width="1.6"
            aria-hidden="true"
          />
        </span>
        <span class="projects-year__card-content">
          <span class="projects-year__card-title">{{ project.title }}</span>
          <span class="projects-year__card-summary">{{ project.description }}</span>
        </span>
        <span class="projects-year__card-tags" aria-hidden="true">
          <span v-for="technology in project.technologies" :key="technology">{{ technology }}</span>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.projects-year {
  display: grid;
  grid-template-columns: minmax(9rem, 0.26fr) minmax(0, 1fr);
  gap: var(--grid-gap);
  padding-top: clamp(1.5rem, 3vw, 2.75rem);
  border-top: 1px solid var(--line);
}

.projects-year__marker {
  position: sticky;
  top: var(--page-gutter);
  z-index: 1;
  align-self: start;
}

.projects-year__number {
  margin: 0;
  font-size: clamp(3.4rem, 6vw, 6.5rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.09em;
}

.projects-year__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--grid-gap);
}

.projects-year__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  min-height: clamp(16rem, 22vw, 20rem);
  padding: clamp(1.25rem, 2.25vw, 2rem);
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  border: 0;
  border-radius: var(--card-radius);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.projects-year__card:hover,
.projects-year__card:focus-visible {
  transform: translateY(-4px);
}

.projects-year__card--accent {
  color: var(--ink-on-accent);
  background: var(--card-accent);
}

.projects-year__card--soft {
  background: var(--card-soft);
}

.projects-year__card--purple {
  background: var(--card-purple);
}

.projects-year__card--surface {
  background: var(--card-surface);
}

.projects-year__card-topline {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.projects-year__arrow {
  flex: none;
  transition: transform 0.22s ease;
}

.projects-year__card:hover .projects-year__arrow,
.projects-year__card:focus-visible .projects-year__arrow {
  transform: translate(2px, -2px);
}

.projects-year__card-content {
  display: grid;
  gap: 0.8rem;
  margin: 2.5rem 0;
}

.projects-year__card-title {
  font-size: clamp(1.6rem, 2.3vw, 2.5rem);
  font-weight: 700;
  line-height: 1.03;
  letter-spacing: -0.07em;
}

.projects-year__card-summary {
  max-width: 29ch;
  font-size: 0.85rem;
  line-height: 1.5;
}

.projects-year__card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.projects-year__card-tags span {
  padding: 0.35rem 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  border: 1px solid currentcolor;
  border-radius: 999px;
}

@media (max-width: 1100px) {
  .projects-year__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 800px) {
  .projects-year {
    grid-template-columns: 1fr;
  }

  .projects-year__marker {
    top: 0;
    padding: 0.75rem 0;
    background: var(--page-background);
  }

  .projects-year__number {
    font-size: clamp(2.8rem, 9vw, 3.7rem);
  }
}

@media (max-width: 560px) {
  .projects-year__grid {
    grid-template-columns: 1fr;
  }

  .projects-year__card {
    min-height: 17rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-year__card,
  .projects-year__arrow {
    transition: none;
  }
}
</style>
