<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import HomeProjectPreview from '@/components/home/HomeProjectPreview.vue'
import type { ProjectPreview } from '@/types/workCases'

const { screenshots } = defineProps<{ screenshots: ProjectPreview[]; framed?: boolean }>()
const { t, locale } = useI18n()
const index = shallowRef(0)
const screenshot = computed(() => screenshots[index.value])
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))

function move(offset: number) {
  index.value = (index.value + offset + screenshots.length) % screenshots.length
}
</script>

<template>
  <div class="project-screenshots">
    <div class="project-screenshots__slides">
      <div
        v-for="(slide, position) in screenshots"
        :key="slide.src"
        class="project-screenshots__slide"
        :class="{ 'project-screenshots__slide--active': position === index }"
        :aria-hidden="position !== index"
      >
        <HomeProjectPreview :preview="slide" :framed="framed" />
      </div>
    </div>
    <div class="project-screenshots__controls">
      <button
        class="project-screenshots__button"
        type="button"
        :aria-label="t('portfolio.previousScreenshot')"
        @click="move(-1)"
      >
        <ChevronLeft :size="20" aria-hidden="true" />
      </button>
      <span class="project-screenshots__caption" aria-live="polite">
        {{ screenshot?.alt[language] }} · {{ index + 1 }} / {{ screenshots.length }}
      </span>
      <button
        class="project-screenshots__button"
        type="button"
        :aria-label="t('portfolio.nextScreenshot')"
        @click="move(1)"
      >
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.project-screenshots__slides {
  display: grid;
  isolation: isolate;
}

.project-screenshots__slide {
  grid-area: 1 / 1;
  min-width: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 280ms ease;
}

.project-screenshots__slide--active {
  opacity: 1;
}

.project-screenshots__controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  color: var(--ink-muted);
}

.project-screenshots__caption {
  font-size: 0.875rem;
  text-align: center;
}

.project-screenshots__button {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  color: var(--ink);
  cursor: pointer;
  background: var(--card-soft);
  border: 1px solid var(--line);
  border-radius: 50%;
}

@media (prefers-reduced-motion: reduce) {
  .project-screenshots__slide {
    transition: none;
  }
}
</style>
