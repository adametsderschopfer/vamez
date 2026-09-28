<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { Project, ProjectLanguage } from '@/data/projects'

defineProps<{ project: Project; language: ProjectLanguage }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const dialogRef = ref<HTMLElement | null>(null)
const closeRef = ref<HTMLButtonElement | null>(null)

function focusClose() {
  closeRef.value?.focus()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }

  if (event.key !== 'Tab') return
  const focusable = dialogRef.value?.querySelectorAll<HTMLElement>('button, a[href]')
  if (!focusable?.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

defineExpose({ focusClose })
</script>

<template>
  <Teleport to="body">
    <div class="project-dialog__backdrop" @click="emit('close')" />
    <article
      ref="dialogRef"
      class="project-dialog"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`project-dialog-title-${project.id}`"
      :aria-describedby="`project-dialog-lead-${project.id}`"
      @keydown="handleKeydown"
    >
      <div class="project-dialog__topline">
        <span>{{ t('projects.example') }} / {{ project.year }}</span>
        <button
          ref="closeRef"
          class="project-dialog__close"
          type="button"
          :aria-label="t('projects.close')"
          @click="emit('close')"
        >
          <X :size="21" :stroke-width="1.7" aria-hidden="true" />
        </button>
      </div>
      <div class="project-dialog__header">
        <span class="project-dialog__category">{{ project.category[language] }}</span>
        <h2 :id="`project-dialog-title-${project.id}`" class="project-dialog__title">
          {{ project.title[language] }}
        </h2>
        <p :id="`project-dialog-lead-${project.id}`" class="project-dialog__lead">
          {{ project.article.lead[language] }}
        </p>
      </div>
      <div class="project-dialog__content">
        <section
          v-for="section in project.article.sections"
          :key="section.heading[language]"
          class="project-dialog__section"
        >
          <h3 class="project-dialog__section-title">{{ section.heading[language] }}</h3>
          <p class="project-dialog__section-body">{{ section.body[language] }}</p>
        </section>
      </div>
      <div class="project-dialog__tags">
        <span v-for="technology in project.technologies" :key="technology">{{ technology }}</span>
      </div>
    </article>
  </Teleport>
</template>

<style scoped>
.project-dialog__backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(8, 13, 10, 0.7);
  backdrop-filter: blur(0.35rem);
}

.project-dialog {
  --project-dialog-padding: clamp(1.4rem, 3vw, 2.75rem);

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 101;
  width: min(49rem, calc(100vw - var(--page-gutter) - var(--page-gutter)));
  max-height: calc(100dvh - var(--page-gutter) - var(--page-gutter));
  padding: var(--project-dialog-padding);
  overflow-y: auto;
  color: var(--ink);
  background: var(--card-surface);
  border-radius: var(--card-radius);
  transform: translate(-50%, -50%);
  view-transition-name: project-article;
}

.project-dialog__topline {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-dialog__close {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.7rem;
  aspect-ratio: 1;
  color: var(--ink);
  cursor: pointer;
  background: var(--card-soft);
  border: 0;
  border-radius: 50%;
}

.project-dialog__header {
  padding: clamp(2rem, 5vw, 4rem) 0;
  border-bottom: 1px solid var(--line);
}

.project-dialog__category {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-dialog__title {
  margin: 1rem 0;
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.085em;
}

.project-dialog__lead {
  max-width: 37rem;
  margin: 0;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.55;
}

.project-dialog__content {
  display: grid;
  gap: 1.5rem;
  padding: clamp(1.5rem, 3vw, 2.75rem) 0;
}

.project-dialog__section {
  display: grid;
  grid-template-columns: minmax(8rem, 0.35fr) minmax(0, 1fr);
  gap: 1rem;
}

.project-dialog__section-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.project-dialog__section-body {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--ink-muted);
}

.project-dialog__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-dialog__tags span {
  padding: 0.45rem 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  background: var(--card-soft);
  border-radius: 999px;
}

@media (max-width: 600px) {
  .project-dialog__section {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
