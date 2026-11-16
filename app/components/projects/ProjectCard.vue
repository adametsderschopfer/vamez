<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { WorkProject } from '@/types/workCases'
import HomeProjectPreview from '@/components/home/HomeProjectPreview.vue'

defineProps<{ project: WorkProject }>()
defineEmits<{ select: [] }>()
const { t, locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
</script>

<template>
  <button class="project-card" type="button" aria-haspopup="dialog" @click="$emit('select')">
    <div class="project-card__visual">
      <HomeProjectPreview v-if="project.preview" :preview="project.preview" />
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
      <span v-if="project.url" class="project-card__open" aria-hidden="true"
        ><ArrowUpRight :size="22"
      /></span>
    </div>
    <div class="project-card__body">
      <span v-if="project.isPlaceholder" class="project-card__meta">{{
        t('home.cases.placeholder')
      }}</span>
      <h3 class="project-card__title">{{ project.title[language] }}</h3>
      <p class="project-card__description">{{ project.description[language] }}</p>
    </div>
  </button>
</template>

<style scoped>
.project-card {
  --preview-height: clamp(12rem, 20vw, 19rem);

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-radius: 1.25rem;
  transition:
    border-color var(--motion-fast),
    box-shadow var(--motion-fast);
}

.project-card__visual {
  position: relative;
  width: 100%;
  padding: 0.65rem;
}

.project-card__visual :deep(.project-preview) {
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

.project-card__body {
  padding: 0.75rem 1.25rem 1.5rem;
}

.project-card__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
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

@media (hover: hover) {
  .project-card:hover {
    border-color: var(--card-accent);
    box-shadow: 0 0.75rem 2rem rgb(0 0 0 / 15%);
  }
}

@media (max-width: 600px) {
  .project-card {
    --preview-height: 15rem;
  }
}
</style>
