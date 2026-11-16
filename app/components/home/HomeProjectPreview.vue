<script setup lang="ts">
import type { ProjectPreview } from '@/types/workCases'

defineProps<{ preview: ProjectPreview; framed?: boolean }>()
const { locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
</script>

<template>
  <figure
    class="project-preview"
    :class="[
      `project-preview--${preview.kind}`,
      { 'project-preview--device': preview.screen, 'project-preview--framed': framed }
    ]"
    :data-tone="preview.screen?.tone"
  >
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
      :alt="preview.screen ? '' : preview.alt[language]"
      :width="preview.width"
      :height="preview.height"
      loading="lazy"
      decoding="async"
    />
    <HomeProjectPhonePreview v-if="preview.screen" :screen="preview.screen" />
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

.project-preview--marketplace {
  background: #132957;
}

.project-preview--device {
  --device-backdrop-light: #f4eee9;
  --device-backdrop-dark: #d4ccc4;

  background: radial-gradient(
    ellipse at 50% 25%,
    var(--device-backdrop-light) 10%,
    var(--device-backdrop-dark) 92%
  );
  isolation: isolate;
}

.project-preview--device[data-tone='leaf'] {
  --device-backdrop-light: #ecf1da;
  --device-backdrop-dark: #93aa83;
}

.project-preview--device[data-tone='rose'] {
  --device-backdrop-light: #faeee9;
  --device-backdrop-dark: #c49dab;
}

.project-preview--device .project-preview__image {
  object-fit: cover;
  opacity: 0.16;
  filter: blur(1.5rem);
  transform: scale(1.12);
}

.project-preview--app .project-preview__image {
  padding: clamp(1rem, 3vw, 2rem);
  object-fit: contain;
}

.project-preview--framed {
  --frame-padding: clamp(0.75rem, 2.5vw, 1.5rem);
  --frame-outline: rgb(27 35 43 / 14%);

  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  padding: var(--frame-padding);
  background: linear-gradient(145deg, #f4f5f6, #dce0e4);
}

.project-preview--framed .project-preview__image {
  position: static;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  padding: 0;
  object-fit: contain;
  border-radius: 0.375rem;
  box-shadow:
    0 0 0 1px var(--frame-outline),
    0 0.375rem 1rem rgb(27 35 43 / 14%);
}
</style>
