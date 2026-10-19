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
    <h2 :id="`projects-year-${year}`" class="projects-year__number">{{ year }}</h2>
    <ul class="projects-year__list">
      <li v-for="project in projects" :key="project.id" class="projects-year__item">
        <button
          class="projects-year__project"
          type="button"
          :aria-label="`${t('projects.openProject')}: ${project.title}`"
          @click="selectProject(project, $event)"
        >
          <span class="projects-year__category">{{ project.category }}</span>
          <span class="projects-year__content">
            <span class="projects-year__title">{{ project.title }}</span>
            <span class="projects-year__summary">{{ project.description }}</span>
            <span class="projects-year__technologies">
              <span
                v-for="technology in project.technologies"
                :key="technology"
                class="projects-year__technology"
              >
                {{ technology }}
              </span>
            </span>
          </span>
          <ArrowUpRight
            class="projects-year__arrow"
            :size="24"
            :stroke-width="1.5"
            aria-hidden="true"
          />
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.projects-year {
  --archive-column-gap: clamp(2rem, 5vw, 5rem);
  --archive-row-space: clamp(1.5rem, 2.5vw, 2rem);
  --archive-row-inset: 1rem;

  display: grid;
  grid-template-columns: minmax(6rem, 0.18fr) minmax(0, 1fr);
  gap: var(--archive-column-gap);
  padding-top: var(--archive-row-space);
  border-top: 1px solid var(--line);
}

.projects-year__number {
  position: sticky;
  top: var(--page-gutter);
  align-self: start;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  letter-spacing: -0.04em;
}

.projects-year__list {
  min-width: 0;
  padding: 0;
  margin: 0;
  list-style: none;
}

.projects-year__item {
  border-bottom: 1px solid var(--line);
}

.projects-year__project {
  display: grid;
  grid-template-columns: minmax(6.5rem, 0.28fr) minmax(0, 1fr) auto;
  gap: clamp(1rem, 2vw, 2rem);
  align-items: start;
  width: 100%;
  padding: var(--archive-row-space) var(--archive-row-inset);
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: var(--control-radius);
}

.projects-year__project:active {
  background: var(--card-soft);
}

.projects-year__project:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 0.2rem;
}

.projects-year__category {
  padding-top: 0.25rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--ink-muted);
}

.projects-year__content {
  display: grid;
  gap: 0.75rem;
  min-width: 0;
}

.projects-year__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.4vw, 2.4rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.projects-year__summary {
  max-width: 60ch;
  font-size: 0.95rem;
  line-height: 1.6;
}

.projects-year__technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  margin-top: 0.5rem;
}

.projects-year__technology {
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--ink-muted);
}

.projects-year__arrow {
  margin-top: 0.25rem;
  transition: transform var(--motion-fast) var(--ease-out);
}

.projects-year__project:focus-visible .projects-year__title,
.projects-year__project:focus-visible .projects-year__arrow {
  color: var(--card-accent);
}

@media (hover: hover) and (pointer: fine) {
  .projects-year__project:hover {
    background: var(--card-surface);
  }

  .projects-year__project:hover .projects-year__title,
  .projects-year__project:hover .projects-year__arrow {
    color: var(--card-accent);
  }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .projects-year__project:hover .projects-year__arrow {
    transform: translate(0.25rem, -0.25rem);
  }
}

@media (max-width: 900px) {
  .projects-year {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .projects-year__number {
    position: static;
  }
}

@media (max-width: 560px) {
  .projects-year__project {
    grid-template-columns: minmax(0, 1fr) auto;
    row-gap: 1rem;
    padding-right: 0;
    padding-left: 0;
  }

  .projects-year__category {
    grid-column: 1;
    padding: 0;
  }

  .projects-year__content {
    grid-row: 2;
    grid-column: 1 / -1;
  }

  .projects-year__arrow {
    grid-row: 1;
    grid-column: 2;
    margin: 0;
  }
}
</style>
