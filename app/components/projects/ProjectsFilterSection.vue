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
    <div class="projects-filter__options" role="group" :aria-label="t('projects.filter.title')">
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
  display: flex;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
  align-items: center;
  min-width: 0;
}

.projects-filter__label {
  flex: none;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.projects-filter__options {
  display: flex;
  gap: 0.35rem;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.projects-filter__options::-webkit-scrollbar {
  display: none;
}

.projects-filter__option {
  flex: none;
  min-height: 1.9rem;
  padding: 0.25rem 0.6rem;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--ink);
  white-space: nowrap;
  cursor: pointer;
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-radius: 999px;
  transition:
    background-color 0.22s ease,
    border-color 0.22s ease;
}

.projects-filter__option:hover,
.projects-filter__option:focus-visible {
  border-color: var(--ink-muted);
}

.projects-filter__option--selected {
  color: var(--ink-on-accent);
  background: var(--card-accent);
  border-color: var(--card-accent);
}

@media (max-width: 560px) {
  .projects-filter__label {
    font-size: 0.62rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-filter__option {
    transition: none;
  }
}
</style>
