<script setup lang="ts">
import type { ProjectPreview } from '@/types/workCases'

const props = defineProps<{ screen: NonNullable<ProjectPreview['screen']> }>()
const { locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))

const screenStyle = computed(() => {
  const { width, height, crop } = props.screen

  return {
    '--screen-width': `${(width / crop.width) * 100}%`,
    '--screen-offset-x': `${(-crop.x / width) * 100}%`,
    '--screen-offset-y': `${(-crop.y / height) * 100}%`
  }
})
</script>

<template>
  <div class="project-phone">
    <div class="project-phone__viewport">
      <img
        class="project-phone__screen"
        :src="screen.src"
        :alt="screen.alt[language]"
        :width="screen.width"
        :height="screen.height"
        :style="screenStyle"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</template>

<style scoped>
.project-phone {
  --phone-frame-width: 0.25rem;
  --phone-corner-radius: 1.05rem;

  position: absolute;
  inset-block: 7%;
  inset-inline-start: 50%;
  aspect-ratio: 1 / 1.72;
  padding: var(--phone-frame-width);
  background: #202124;
  border: 1px solid #5c5e60;
  border-radius: var(--phone-corner-radius);
  box-shadow:
    0 0.25rem 0.45rem #27211f26,
    0 0.85rem 2rem #27211f40;
  transform: translateX(-50%);
}

.project-phone__viewport {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: calc(var(--phone-corner-radius) - var(--phone-frame-width));
}

.project-phone__screen {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  width: var(--screen-width);
  max-width: none;
  height: auto;
  transform: translate(var(--screen-offset-x), var(--screen-offset-y));
}
</style>
