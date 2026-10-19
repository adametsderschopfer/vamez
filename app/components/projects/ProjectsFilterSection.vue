<script setup lang="ts">
defineProps<{
  technologies: string[]
  selectedTechnology: string | null
}>()

const emit = defineEmits<{ select: [technology: string | null] }>()
const { t } = useI18n()
</script>

<template>
  <div class="projects-filter" role="group" :aria-label="t('projects.filter.title')">
    <span class="projects-filter__label">{{ t('projects.filter.title') }}</span>
    <div class="projects-filter__options">
      <button
        class="projects-filter__option"
        :class="{ 'projects-filter__option--selected': selectedTechnology === null }"
        type="button"
        :aria-pressed="selectedTechnology === null"
        @click="emit('select', null)"
      >
        {{ t('projects.filter.all') }}
      </button>
      <button
        v-for="technology in technologies"
        :key="technology"
        class="projects-filter__option"
        :class="{ 'projects-filter__option--selected': selectedTechnology === technology }"
        type="button"
        :aria-pressed="selectedTechnology === technology"
        @click="emit('select', selectedTechnology === technology ? null : technology)"
      >
        {{ technology }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.projects-filter {
  --filter-target-size: 2.75rem;
  --filter-gap: 0.5rem;

  display: grid;
  gap: 1rem;
  min-width: 0;
}

.projects-filter__label {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
}

.projects-filter__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--filter-gap);
  min-width: 0;
}

.projects-filter__option {
  min-width: var(--filter-target-size);
  min-height: var(--filter-target-size);
  padding: 0.65rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--ink);
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: var(--control-radius);
  transition: transform var(--motion-fast) var(--ease-out);
}

.projects-filter__option:active {
  background: var(--card-surface);
  border-color: var(--ink);
}

.projects-filter__option:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 0.2rem;
}

.projects-filter__option--selected {
  color: var(--ink-on-accent);
  background: var(--card-accent);
  border-color: var(--card-accent);
}

@media (hover: hover) and (pointer: fine) {
  .projects-filter__option:hover {
    background: var(--card-surface);
    border-color: var(--ink);
  }

  .projects-filter__option--selected:hover {
    background: var(--card-accent);
    border-color: var(--ink);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .projects-filter__option:active {
    transform: scale(0.97);
  }
}
</style>
