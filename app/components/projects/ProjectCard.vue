<script setup lang="ts">
import { ArrowUpRight, Sparkles } from 'lucide-vue-next'
import type { WorkProject } from '@/types/workCases'
import HomeProjectPreview from '@/components/home/HomeProjectPreview.vue'
import ProjectCardFrame from './ProjectCardFrame.vue'

defineProps<{ project: WorkProject; showWebsite?: boolean }>()
defineEmits<{ select: [] }>()
const { t, locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
</script>

<template>
  <ProjectCardFrame class="project-card" interactive>
    <template #visual>
      <HomeProjectPreview
        v-if="project.preview"
        :preview="project.preview"
        :framed="project.company === 'legacy-agency'"
      />
      <div v-else class="project-card__cover">
        <img
          v-if="project.logo"
          :src="project.logo.src"
          alt=""
          class="project-card__logo"
          loading="lazy"
        />
        <span v-else>{{ project.title[language] }}</span>
      </div>
      <span v-if="project.url || showWebsite" class="project-card__open" aria-hidden="true"
        ><ArrowUpRight :size="22"
      /></span>
    </template>
    <template #default>
      <span v-if="project.isPlaceholder" class="project-card__meta">{{
        t('home.cases.placeholder')
      }}</span>
      <span v-else-if="project.label" class="project-card__meta project-card__meta--label">
        {{ project.label[language] }}
      </span>
      <h3 class="project-card__title">
        <button
          class="project-card__trigger"
          type="button"
          aria-haspopup="dialog"
          @click="$emit('select')"
        >
          {{ project.title[language] }}
          <Sparkles
            v-if="project.key === 'iwe-code'"
            class="project-card__sparkles"
            aria-hidden="true"
          />
        </button>
      </h3>
      <a
        v-if="showWebsite && project.url"
        class="project-card__website"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('home.personalProjects.visitWebsite') }}
        <ArrowUpRight :size="16" aria-hidden="true" />
      </a>
      <p class="project-card__description">{{ project.description[language] }}</p>
    </template>
  </ProjectCardFrame>
</template>

<style scoped>
.project-card :deep(.project-preview) {
  height: var(--preview-height);
  border: 0;
  border-radius: 0.8rem;
}

.project-card__cover {
  display: grid;
  place-items: center;
  height: var(--preview-height);
  padding: 1.5rem;
  font-size: clamp(1.5rem, 2.4vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.04em;
  background: var(--card-soft);
  border-radius: 0.8rem;
}

.project-card__logo {
  max-width: 80%;
  max-height: 8rem;
}

.project-card__open {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--ink);
  background: var(--card-surface);
  border-radius: 50%;
}

.project-card__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
}

.project-card__trigger {
  padding: 0;
  font: inherit;
  color: inherit;
  text-align: inherit;
  cursor: pointer;
  background: none;
  border: 0;
}

.project-card__trigger::after {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: '';
  border-radius: var(--project-card-radius);
}

.project-card__trigger:focus-visible {
  outline: none;
}

.project-card__trigger:focus-visible::after {
  outline: 2px solid var(--card-accent);
  outline-offset: 2px;
}

.project-card__website {
  position: relative;
  z-index: 2;
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  min-height: 1.75rem;
  margin-top: 0.25rem;
  font-size: var(--font-size-meta);
  font-weight: var(--font-weight-label);
  color: var(--card-accent);
}

.project-card__sparkles {
  width: 0.65em;
  height: 0.65em;
  margin-inline-start: 0.1em;
  vertical-align: 0.3em;
  color: var(--card-accent);
}

.project-card__description {
  display: -webkit-box;
  margin: 0.6rem 0 0;
  overflow: hidden;
  -webkit-line-clamp: 2;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--ink-muted);
  -webkit-box-orient: vertical;
}

.project-card__meta {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--ink-muted);
}

.project-card__meta--label {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  font-weight: 500;
  line-height: 1.5;
  border: 1px solid var(--line);
  border-radius: 1rem;
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .project-card:hover .project-card__sparkles {
    animation: project-card-twinkle 800ms ease-in-out;
  }
}

@keyframes project-card-twinkle {
  25% {
    opacity: 0.65;
  }

  60% {
    filter: drop-shadow(0 0 0.15em currentColor);
  }
}
</style>
