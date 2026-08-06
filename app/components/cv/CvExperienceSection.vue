<script setup lang="ts">
import { cvExperiences } from '@/data/cv'
</script>

<template>
  <section class="cv-experience">
    <div class="cv-experience__header">
      <p class="cv-experience__eyebrow">Опыт</p>
      <h2 class="cv-experience__title">Рабочий путь</h2>
    </div>

    <div class="cv-experience__timeline">
      <article
        v-for="experience in cvExperiences"
        :key="`${experience.company}-${experience.period}`"
        class="cv-experience__item"
      >
        <div class="cv-experience__marker" aria-hidden="true" />

        <div class="cv-experience__body">
          <div class="cv-experience__topline">
            <div class="cv-experience__main">
              <h3 class="cv-experience__role">{{ experience.role }}</h3>
              <p class="cv-experience__company">
                {{ experience.company }} · {{ experience.location }}
              </p>
            </div>
            <div class="cv-experience__dates">
              <span class="cv-experience__period">{{ experience.period }}</span>
              <span class="cv-experience__duration">{{ experience.duration }}</span>
            </div>
          </div>

          <p class="cv-experience__summary">{{ experience.summary }}</p>

          <div class="cv-experience__stack" aria-label="Стек">
            <span v-for="tech in experience.stack" :key="tech" class="cv-experience__tag">
              {{ tech }}
            </span>
          </div>

          <div class="cv-experience__columns">
            <div class="cv-experience__block">
              <h4 class="cv-experience__block-title">Зона ответственности</h4>
              <ul class="cv-experience__list">
                <li
                  v-for="item in experience.responsibilities"
                  :key="item"
                  class="cv-experience__list-item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="experience.achievements.length" class="cv-experience__block">
              <h4 class="cv-experience__block-title cv-experience__block-title--accent">
                Результаты
              </h4>
              <ul class="cv-experience__list">
                <li
                  v-for="item in experience.achievements"
                  :key="item"
                  class="cv-experience__list-item cv-experience__list-item--accent"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.cv-experience {
  --cv-section-padding: clamp(1.6rem, 5vw, 4.4rem);
  --cv-line-offset: clamp(1.25rem, 4vw, 4.4rem);

  padding: var(--cv-section-padding) clamp(1.25rem, 5vw, 5.6rem);
}

.cv-experience__header {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: clamp(1.6rem, 4vw, 3rem);
}

.cv-experience__eyebrow {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.cv-experience__title {
  margin: 0;
  font-size: clamp(2.3rem, 7vw, 5.4rem);
  line-height: 1;
}

.cv-experience__timeline {
  position: relative;
  display: grid;
  gap: 1rem;
  padding-left: var(--cv-line-offset);
}

.cv-experience__timeline::before {
  position: absolute;
  top: 0.6rem;
  bottom: 0;
  left: 0.35rem;
  width: 1px;
  content: '';
  background: linear-gradient(180deg, var(--color-accent), transparent);
  opacity: 0.45;
}

.cv-experience__item {
  position: relative;
}

.cv-experience__marker {
  position: absolute;
  top: 1.35rem;
  left: calc(var(--cv-line-offset) * -1 - 0.04rem);
  width: 0.82rem;
  height: 0.82rem;
  background: var(--color-accent);
  border: 3px solid var(--color-surface);
  border-radius: 999px;
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--color-accent) 16%, transparent);
}

.cv-experience__body {
  padding: clamp(1.1rem, 2.5vw, 1.6rem);
  background: color-mix(in srgb, var(--glass-bg) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 90%, transparent);
  border-radius: 1.15rem;
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-white) 18%, transparent);
}

.cv-experience__topline {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(12rem, auto);
  gap: 1rem;
  align-items: start;
}

.cv-experience__role {
  margin: 0;
  font-size: clamp(1.25rem, 2.4vw, 1.8rem);
  line-height: 1.12;
}

.cv-experience__company {
  margin: 0.35rem 0 0;
  font-size: 0.98rem;
  color: var(--color-text-soft);
}

.cv-experience__dates {
  display: grid;
  gap: 0.3rem;
  justify-items: end;
  color: var(--color-text-soft);
}

.cv-experience__period,
.cv-experience__duration {
  font-size: 0.88rem;
  line-height: 1.35;
}

.cv-experience__duration {
  opacity: 0.72;
}

.cv-experience__summary {
  max-width: 82ch;
  margin: 1rem 0 0;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text-soft);
}

.cv-experience__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;
}

.cv-experience__tag {
  padding: 0.42rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text);
  background: color-mix(in srgb, var(--glass-bg) 76%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 82%, transparent);
  border-radius: 999px;
}

.cv-experience__columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2.4vw, 2rem);
  margin-top: 1.2rem;
}

.cv-experience__block-title {
  margin: 0 0 0.65rem;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.cv-experience__block-title--accent {
  color: color-mix(in srgb, var(--color-accent) 82%, var(--color-text));
}

.cv-experience__list {
  display: grid;
  gap: 0.55rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.cv-experience__list-item {
  position: relative;
  padding-left: 1rem;
  font-size: 0.95rem;
  line-height: 1.62;
  color: var(--color-text-soft);
}

.cv-experience__list-item::before {
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 0.35rem;
  height: 0.35rem;
  content: '';
  background: currentColor;
  border-radius: 999px;
  opacity: 0.35;
}

.cv-experience__list-item--accent::before {
  color: var(--color-accent);
  opacity: 0.8;
}

@media (max-width: 860px) {
  .cv-experience__topline,
  .cv-experience__columns {
    grid-template-columns: minmax(0, 1fr);
  }

  .cv-experience__dates {
    justify-items: start;
  }
}

@media (max-width: 640px) {
  .cv-experience {
    --cv-line-offset: 1rem;

    padding-right: 0.9rem;
    padding-left: 0.9rem;
  }

  .cv-experience__timeline {
    padding-left: 1.4rem;
  }

  .cv-experience__marker {
    left: -1.45rem;
  }
}
</style>
