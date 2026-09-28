<script setup lang="ts">
defineProps<{
  technologies: string[]
  selectedTechnology: string | null
  visibleCount: number
  totalCount: number
}>()

const emit = defineEmits<{ select: [technology: string | null] }>()
const { t } = useI18n()
</script>

<template>
  <section class="projects-filter" :aria-label="t('projects.filter.title')">
    <div class="projects-filter__heading">
      <div class="projects-filter__intro">
        <h2 class="projects-filter__title">{{ t('projects.filter.title') }}</h2>
      </div>
      <span class="projects-filter__count" role="status" aria-live="polite">
        {{ t('projects.filter.count', { visible: visibleCount, total: totalCount }) }}
      </span>
    </div>
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
  </section>
</template>

<style scoped>
.projects-filter {
  display: grid;
  gap: 1rem;
  padding: clamp(1.2rem, 2vw, 1.8rem);
  background: var(--card-surface);
  border-radius: var(--card-radius);
}

.projects-filter__heading {
  display: flex;
  gap: 1rem;
  align-items: end;
  justify-content: space-between;
}

.projects-filter__intro {
  display: grid;
  gap: 0.6rem;
}

.projects-filter__count {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.projects-filter__title {
  margin: 0;
  font-size: clamp(1.45rem, 2vw, 2rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.07em;
}

.projects-filter__options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.projects-filter__option {
  min-height: 2.1rem;
  padding: 0.35rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--ink);
  cursor: pointer;
  background: var(--card-soft);
  border: 1px solid transparent;
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
}

@media (max-width: 560px) {
  .projects-filter__heading {
    align-items: start;
  }

  .projects-filter__count {
    max-width: 7rem;
    text-align: right;
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-filter__option {
    transition: none;
  }
}
</style>
