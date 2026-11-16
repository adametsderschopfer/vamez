<script setup lang="ts">
import TechnologySelect from './TechnologySelect.vue'

const kind = defineModel<string>('kind', { required: true })
const technology = defineModel<string>('technology', { required: true })
defineProps<{ technologies: string[]; count: number }>()
const { t } = useI18n()
const kinds = ['all', 'app', 'web']
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
    <TechnologySelect v-model="technology" :technologies="technologies" />
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

.project-filters__count {
  margin-left: auto;
  font-size: 0.875rem;
  color: var(--ink-muted);
}

@media (hover: hover) and (pointer: fine) {
  .project-filters__button:hover {
    background: var(--card-soft);
  }

  .project-filters__button[aria-pressed='true']:hover {
    background: color-mix(in srgb, var(--card-accent) 88%, var(--ink-on-accent));
  }
}
</style>
