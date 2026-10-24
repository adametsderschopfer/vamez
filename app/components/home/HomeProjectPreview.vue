<script setup lang="ts">
import type { ProjectPreview } from '@/types/workCases'

defineProps<{ preview: ProjectPreview }>()
const { locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
</script>

<template>
  <figure class="project-preview" :class="`project-preview--${preview.kind}`">
    <img
      class="project-preview__image"
      :src="preview.src"
      :srcset="
        preview.srcSmall ? `${preview.srcSmall} 640w, ${preview.src} ${preview.width}w` : undefined
      "
      :sizes="
        preview.kind === 'app'
          ? '200px'
          : '(max-width: 799px) calc(100vw - 5rem), (max-width: 1988px) 60vw, 1200px'
      "
      :alt="preview.alt[language]"
      :width="preview.width"
      :height="preview.height"
      loading="lazy"
      decoding="async"
    />
  </figure>
</template>

<style scoped>
.project-preview {
  position: relative;
  display: grid;
  place-items: center;
  height: clamp(11rem, 18vw, 15rem);
  margin: 0;
  overflow: hidden;
  background: #fff3f8;
  border-bottom: 1px solid var(--case-rule);
}

.project-preview__image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: contain;
}

.project-preview--app {
  background: #dfe8ff;
}

.project-preview--brand {
  --preview-brand-background: linear-gradient(100deg, #00acef, #0874e3 55%, #00a5bb);

  background: var(--preview-brand-background);
}

.project-preview--brand .project-preview__image {
  position: relative;
  inset: auto;
  width: auto;
  max-width: 100%;
  mask-image: linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent);
}

.project-preview--photo .project-preview__image {
  object-fit: cover;
}

.project-preview--app .project-preview__image {
  padding: clamp(1rem, 3vw, 2rem);
  object-fit: contain;
}
</style>
