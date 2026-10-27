<script setup lang="ts">
import { Bookmark, Layers, Pause } from 'lucide-vue-next'
import type { PersonalProject } from '@/data/personalProjects'

defineProps<{ kind: PersonalProject['key'] }>()
const { t } = useI18n()
const swatches = ['#1938BB', '#91A5ED', '#D8D8D3', '#F4F4F0']
</script>

<template>
  <div class="personal-preview" :class="`personal-preview--${kind}`" aria-hidden="true">
    <template v-if="kind === 'shelf'">
      <div class="personal-preview__brand">
        <Bookmark :size="24" />
        <span>{{ t('home.personalProjects.shelf.title') }}</span>
      </div>
      <p class="personal-preview__headline">{{ t('home.personalProjects.shelf.previewTitle') }}</p>
      <div class="personal-preview__collection">
        <span class="personal-preview__collection-label">{{
          t('home.personalProjects.shelf.collection')
        }}</span>
        <div
          v-for="item in ['itemOne', 'itemTwo', 'itemThree']"
          :key="item"
          class="personal-preview__bookmark"
        >
          <Bookmark :size="16" />
          <span>{{ t(`home.personalProjects.shelf.${item}`) }}</span>
        </div>
      </div>
    </template>
    <template v-else-if="kind === 'pause'">
      <div class="personal-preview__brand">
        <Pause :size="24" />
        <span>{{ t('home.personalProjects.pause.title') }}</span>
      </div>
      <p class="personal-preview__focus">{{ t('home.personalProjects.pause.previewTitle') }}</p>
      <span class="personal-preview__timer">25:00</span>
      <span class="personal-preview__session">{{ t('home.personalProjects.pause.session') }}</span>
      <div class="personal-preview__intervals"><i /><i /><i /><i /></div>
    </template>
    <template v-else>
      <div class="personal-preview__brand">
        <Layers :size="24" />
        <span>{{ t('home.personalProjects.spectrum.title') }}</span>
      </div>
      <p class="personal-preview__headline">
        {{ t('home.personalProjects.spectrum.previewTitle') }}
      </p>
      <div class="personal-preview__swatches">
        <div
          v-for="color in swatches"
          :key="color"
          class="personal-preview__swatch"
          :style="{ '--swatch': color }"
        />
      </div>
      <span class="personal-preview__palette">{{
        t('home.personalProjects.spectrum.palette')
      }}</span>
    </template>
  </div>
</template>

<style scoped>
.personal-preview {
  --preview-padding: clamp(1.25rem, 2.5vw, 2.5rem);
  --preview-paper: #f4f4f0;
  --preview-ink: #141414;
  --preview-cobalt: #1938bb;

  display: flex;
  flex-direction: column;
  height: clamp(23rem, 32vw, 34rem);
  padding: var(--preview-padding);
  container-type: inline-size;
  overflow: hidden;
  color: var(--preview-ink);
  background: var(--preview-paper);
}

.personal-preview--shelf {
  color: var(--preview-paper);
  background: var(--preview-cobalt);
}

.personal-preview--pause {
  background: #ead7b0;
}

.personal-preview__brand {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
}

.personal-preview__headline {
  margin: 1.5rem 0;
  font-size: clamp(1.5rem, 10cqi, 3.5rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.personal-preview__collection {
  padding: 0.75rem;
  margin-top: auto;
  color: var(--preview-ink);
  background: var(--preview-paper);
  transform: rotate(-3deg);
}

.personal-preview__collection-label {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.personal-preview__bookmark {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.625rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
  border-top: 1px solid #babbb4;
}

.personal-preview__bookmark svg {
  flex: none;
}

.personal-preview__focus {
  max-width: 12ch;
  margin: auto 0 1.5rem;
  font-size: clamp(1.5rem, 10cqi, 3rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.personal-preview__timer {
  font-size: clamp(2.5rem, 25cqi, 8rem);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  letter-spacing: -0.04em;
}

.personal-preview__session {
  margin: 1rem 0 auto;
  font-size: 0.875rem;
  line-height: 1.5;
}

.personal-preview__intervals {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
}

.personal-preview__intervals i {
  flex: 1;
  height: 0.25rem;
  background: color-mix(in srgb, var(--preview-ink) 20%, transparent);
}

.personal-preview__intervals i:first-child {
  background: var(--preview-ink);
}

.personal-preview__swatches {
  display: flex;
  flex: 1;
  min-height: 7rem;
  margin-top: auto;
}

.personal-preview__swatch {
  flex: 1;
  background: var(--swatch);
}

.personal-preview__swatch:last-child {
  border: 1px solid #babbb4;
}

.personal-preview__palette {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
