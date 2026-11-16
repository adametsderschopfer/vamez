<script setup lang="ts">
import { X } from 'lucide-vue-next'
import TechnologySelect from './TechnologySelect.vue'

const kind = defineModel<string>('kind', { required: true })
const selectedTechnologies = defineModel<string[]>('selectedTechnologies', { required: true })
defineProps<{ technologies: string[]; count: number }>()
const { t } = useI18n()
const kinds = ['all', 'app', 'web']
const technologiesFilter = useTemplateRef<HTMLElement>('technologiesFilter')

async function resetTechnologies() {
  selectedTechnologies.value = []
  await nextTick()
  technologiesFilter.value?.querySelector('button')?.focus()
}

async function removeTechnology(technology: string, index: number, event: MouseEvent) {
  selectedTechnologies.value = selectedTechnologies.value.filter((item) => item !== technology)
  if (event.detail !== 0) return

  await nextTick()
  const filter = technologiesFilter.value
  const chips = filter?.querySelectorAll<HTMLButtonElement>('.project-filters__chip')
  const nextButton = chips?.[index] ?? chips?.[index - 1] ?? filter?.querySelector('button')
  nextButton?.focus()
}
</script>

<template>
  <div class="project-filters">
    <div class="project-filters__kinds" role="group" :aria-label="t('portfolio.filters')">
      <button
        v-for="value in kinds"
        :key="value"
        class="project-filters__button"
        type="button"
        :aria-pressed="kind === value"
        @click="kind = value"
      >
        {{ t(`portfolio.${value}`) }}
      </button>
    </div>
    <div ref="technologiesFilter" class="project-filters__technologies">
      <TechnologySelect v-model="selectedTechnologies" :technologies="technologies" />
      <ul v-if="selectedTechnologies.length" class="project-filters__chips">
        <li v-for="(technology, index) in selectedTechnologies" :key="technology">
          <button
            class="project-filters__chip"
            type="button"
            :aria-label="t('portfolio.removeTechnology', { technology })"
            @click="removeTechnology(technology, index, $event)"
          >
            {{ technology }}
            <X :size="14" aria-hidden="true" />
          </button>
        </li>
        <li>
          <button class="project-filters__reset" type="button" @click="resetTechnologies">
            {{ t('portfolio.resetTechnologies') }}
          </button>
        </li>
      </ul>
    </div>
    <span class="project-filters__count" role="status">{{ t('portfolio.count', { count }) }}</span>
  </div>
</template>

<style scoped>
.project-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem 0 2.5rem;
}

.project-filters__kinds {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-filters__button {
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  color: var(--ink);
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 2rem;
  transition: background-color var(--motion-fast) ease;
}

.project-filters__button[aria-pressed='true'] {
  color: var(--ink-on-accent);
  background: var(--card-accent);
  border-color: var(--card-accent);
}

.project-filters__technologies,
.project-filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  min-width: 0;
}

.project-filters__chips {
  padding: 0;
  margin: 0;
  list-style: none;
}

.project-filters__chip {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  min-height: 2rem;
  padding: 0.3rem 0.65rem;
  font-size: 0.875rem;
  color: var(--ink);
  cursor: pointer;
  background: var(--card-soft);
  border: 1px solid var(--line);
  border-radius: 2rem;
}

.project-filters__reset {
  min-height: 2rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.875rem;
  color: var(--card-accent);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.project-filters__count {
  margin-left: auto;
  font-size: 0.875rem;
  color: var(--ink-muted);
}

@media (max-width: 600px) {
  .project-filters__kinds {
    width: 100%;
  }
}

@media (hover: hover) and (pointer: fine) {
  .project-filters__chip:hover {
    border-color: var(--card-accent);
  }

  .project-filters__button:hover {
    background: var(--card-soft);
  }

  .project-filters__button[aria-pressed='true']:hover {
    background: color-mix(in srgb, var(--card-accent) 88%, var(--ink-on-accent));
  }
}
</style>
