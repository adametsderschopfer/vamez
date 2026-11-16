<script setup lang="ts">
import { Globe, LayoutGrid, Smartphone, X } from 'lucide-vue-next'
import TechnologySelect from './TechnologySelect.vue'

const kind = defineModel<string>('kind', { required: true })
const selectedTechnologies = defineModel<string[]>('selectedTechnologies', { required: true })
defineProps<{ technologies: string[]; count: number }>()
const { t } = useI18n()
const kinds = [
  { value: 'all', icon: LayoutGrid },
  { value: 'app', icon: Smartphone },
  { value: 'web', icon: Globe }
] as const
const technologiesFilter = useTemplateRef<HTMLElement>('technologiesFilter')
const technologySelect = useTemplateRef<InstanceType<typeof TechnologySelect>>('technologySelect')

async function resetTechnologies() {
  selectedTechnologies.value = []
  await nextTick()
  technologySelect.value?.focus()
}

async function removeTechnology(technology: string, index: number, event: MouseEvent) {
  selectedTechnologies.value = selectedTechnologies.value.filter((item) => item !== technology)
  if (event.detail !== 0) return

  await nextTick()
  const filter = technologiesFilter.value
  const chips = filter?.querySelectorAll<HTMLButtonElement>('.project-filters__chip')
  const nextButton = chips?.[index] ?? chips?.[index - 1]
  if (nextButton) nextButton.focus()
  else technologySelect.value?.focus()
}
</script>

<template>
  <div ref="technologiesFilter" class="project-filters">
    <div class="project-filters__kinds" role="group" :aria-label="t('portfolio.filters')">
      <button
        v-for="{ value, icon } in kinds"
        :key="value"
        class="project-filters__button"
        type="button"
        :aria-pressed="kind === value"
        @click="kind = value"
      >
        <component :is="icon" :size="16" aria-hidden="true" />
        {{ t(`portfolio.${value}`) }}
      </button>
    </div>
    <TechnologySelect
      ref="technologySelect"
      v-model="selectedTechnologies"
      class="project-filters__technologies"
      :technologies="technologies"
    />
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
    <span class="project-filters__count" role="status">{{ t('portfolio.count', { count }) }}</span>
  </div>
</template>

<style scoped>
.project-filters {
  --filters-gap: 0.5rem;
  --filter-height: 2.75rem;

  display: grid;
  grid-template-areas:
    'kinds technologies count'
    'chips chips chips';
  grid-template-columns: max-content minmax(0, 1fr) max-content;
  gap: 0 var(--filters-gap);
  align-items: center;
  padding: clamp(0.625rem, 2vw, 1rem);
  margin-block: 1.5rem clamp(1.5rem, 4vw, 2.5rem);
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-radius: 1.125rem;
}

.project-filters__kinds {
  display: flex;
  grid-area: kinds;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--card-soft);
  border-radius: 0.875rem;
}

.project-filters__button {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  min-height: var(--filter-height);
  padding-inline: clamp(0.5rem, 1.5vw, 0.875rem);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink-muted);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 0.625rem;
  transition: background-color var(--motion-fast) ease;
}

.project-filters__button[aria-pressed='true'] {
  color: var(--ink-on-accent);
  background: var(--card-accent);
}

.project-filters__technologies {
  grid-area: technologies;
  justify-self: start;
  min-width: 0;
}

.project-filters__chips {
  display: flex;
  flex-wrap: wrap;
  grid-area: chips;
  gap: var(--filters-gap);
  align-items: center;
  padding: 0.75rem 0 0;
  margin: 0.75rem 0 0;
  list-style: none;
  border-top: 1px solid var(--line);
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
  grid-area: count;
  justify-self: end;
  padding-inline: 0.375rem;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  color: var(--ink-muted);
}

@media (max-width: 600px) {
  .project-filters {
    grid-template-areas:
      'kinds kinds'
      'technologies count'
      'chips chips';
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .project-filters__kinds {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: var(--filters-gap);
  }

  .project-filters__count {
    text-align: end;
  }
}

@media (hover: hover) and (pointer: fine) {
  .project-filters__chip:hover {
    border-color: var(--card-accent);
  }

  .project-filters__button:hover {
    color: var(--ink);
    background: var(--card-surface);
  }

  .project-filters__button[aria-pressed='true']:hover {
    color: var(--ink-on-accent);
    background: color-mix(in srgb, var(--card-accent) 88%, var(--ink-on-accent));
  }
}
</style>
