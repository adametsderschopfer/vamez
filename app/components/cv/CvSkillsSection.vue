<script setup lang="ts">
import { cvEducation, cvProjects, cvSkillGroups } from '@/data/cv'
</script>

<template>
  <section class="cv-skills">
    <div class="cv-skills__header">
      <p class="cv-skills__eyebrow">Навыки</p>
      <h2 class="cv-skills__title">Стек и база</h2>
    </div>

    <div class="cv-skills__layout">
      <div class="cv-skills__groups">
        <article v-for="group in cvSkillGroups" :key="group.title" class="cv-skills__group">
          <h3 class="cv-skills__group-title">{{ group.title }}</h3>
          <div class="cv-skills__tags">
            <span v-for="item in group.items" :key="item" class="cv-skills__tag">{{ item }}</span>
          </div>
        </article>
      </div>

      <aside class="cv-skills__side">
        <section class="cv-skills__side-section">
          <h3 class="cv-skills__side-title">Образование</h3>
          <div class="cv-skills__education">
            <article
              v-for="item in cvEducation"
              :key="item.title"
              class="cv-skills__education-item"
            >
              <span class="cv-skills__education-period">{{ item.period }}</span>
              <h4 class="cv-skills__education-title">{{ item.title }}</h4>
              <p class="cv-skills__education-place">{{ item.place }}</p>
              <p class="cv-skills__education-status">{{ item.status }}</p>
            </article>
          </div>
        </section>

        <section class="cv-skills__side-section">
          <h3 class="cv-skills__side-title">Open source</h3>
          <div class="cv-skills__projects">
            <a
              v-for="project in cvProjects"
              :key="project.href"
              class="cv-skills__project"
              :href="project.href"
              target="_blank"
              rel="noreferrer"
            >
              <strong class="cv-skills__project-title">{{ project.title }}</strong>
              <span class="cv-skills__project-description">{{ project.description }}</span>
            </a>
          </div>
        </section>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.cv-skills {
  --cv-section-padding: clamp(1.6rem, 5vw, 4.4rem);

  padding: var(--cv-section-padding) clamp(1.25rem, 5vw, 5.6rem) 8rem;
}

.cv-skills__header {
  display: grid;
  gap: 0.65rem;
  margin-bottom: clamp(1.4rem, 4vw, 2.7rem);
}

.cv-skills__eyebrow {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.cv-skills__title {
  margin: 0;
  font-size: clamp(2.3rem, 7vw, 5.4rem);
  line-height: 1;
}

.cv-skills__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.42fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: start;
}

.cv-skills__groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.cv-skills__group,
.cv-skills__side-section {
  padding: clamp(1.1rem, 2.4vw, 1.5rem);
  background: color-mix(in srgb, var(--glass-bg) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 90%, transparent);
  border-radius: 1.15rem;
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-white) 18%, transparent);
}

.cv-skills__group-title,
.cv-skills__side-title {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  line-height: 1.2;
}

.cv-skills__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cv-skills__tag {
  padding: 0.45rem 0.68rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-text-soft);
  border: 1px solid color-mix(in srgb, var(--glass-border) 86%, transparent);
  border-radius: 999px;
}

.cv-skills__side {
  display: grid;
  gap: 1rem;
}

.cv-skills__education,
.cv-skills__projects {
  display: grid;
  gap: 0.9rem;
}

.cv-skills__education-item {
  display: grid;
  gap: 0.35rem;
}

.cv-skills__education-period {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--color-accent);
}

.cv-skills__education-title {
  margin: 0;
  font-size: 1rem;
  line-height: 1.35;
}

.cv-skills__education-place,
.cv-skills__education-status {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--color-text-soft);
}

.cv-skills__education-status {
  opacity: 0.76;
}

.cv-skills__project {
  display: grid;
  gap: 0.35rem;
  color: inherit;
  text-decoration: none;
  transition:
    color 0.22s ease,
    transform 0.22s ease;
}

.cv-skills__project-title {
  font-size: 1rem;
}

.cv-skills__project-description {
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--color-text-soft);
}

@media (hover: hover) and (pointer: fine) {
  .cv-skills__project:hover {
    color: var(--color-accent);
    transform: translateX(3px);
  }
}

@media (max-width: 1050px) {
  .cv-skills__layout,
  .cv-skills__groups {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .cv-skills {
    padding-right: 0.9rem;
    padding-left: 0.9rem;
  }
}
</style>
