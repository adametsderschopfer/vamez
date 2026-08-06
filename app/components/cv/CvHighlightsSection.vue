<script setup lang="ts">
import { cvHighlights, cvProfile } from '@/data/cv'
</script>

<template>
  <section class="cv-highlights">
    <div class="cv-highlights__header">
      <p class="cv-highlights__eyebrow">Профиль</p>
      <h2 class="cv-highlights__title">Чем полезен команде</h2>
    </div>

    <div class="cv-highlights__grid">
      <article v-for="item in cvHighlights" :key="item" class="cv-highlights__item">
        {{ item }}
      </article>
    </div>

    <div class="cv-highlights__focus" aria-label="Основные направления">
      <span v-for="item in cvProfile.focus" :key="item" class="cv-highlights__tag">
        {{ item }}
      </span>
    </div>
  </section>
</template>

<style scoped>
.cv-highlights {
  --cv-section-padding: clamp(1.6rem, 5vw, 4.4rem);
  --cv-section-gap: clamp(1rem, 2vw, 1.25rem);

  padding: var(--cv-section-padding) clamp(1.25rem, 5vw, 5.6rem);
}

.cv-highlights__header {
  display: grid;
  gap: 0.65rem;
  margin-bottom: clamp(1.4rem, 4vw, 2.7rem);
}

.cv-highlights__eyebrow {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.cv-highlights__title {
  max-width: 12ch;
  margin: 0;
  font-size: clamp(2.3rem, 7vw, 5.4rem);
  line-height: 1;
}

.cv-highlights__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--cv-section-gap);
}

.cv-highlights__item {
  min-height: 11rem;
  padding: clamp(1rem, 2vw, 1.35rem);
  font-size: clamp(0.96rem, 1.25vw, 1.05rem);
  font-weight: 500;
  line-height: 1.65;
  color: var(--color-text);
  background: color-mix(in srgb, var(--glass-bg) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 90%, transparent);
  border-radius: 1.15rem;
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-white) 18%, transparent);
}

.cv-highlights__focus {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
}

.cv-highlights__tag {
  padding: 0.55rem 0.8rem;
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--color-text-soft);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--glass-border) 92%, transparent);
  border-radius: 999px;
}

@media (max-width: 1100px) {
  .cv-highlights__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .cv-highlights {
    padding-right: 0.9rem;
    padding-left: 0.9rem;
  }

  .cv-highlights__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .cv-highlights__item {
    min-height: auto;
  }
}
</style>
