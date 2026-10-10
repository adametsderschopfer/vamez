<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="home-projects" aria-labelledby="home-projects-title">
    <h2 id="home-projects-title" class="home-projects__title">
      {{ t('projects.teaser.title') }}
    </h2>
    <div class="home-projects__body">
      <p class="home-projects__description">
        {{ t('projects.teaser.soonDescription') }}
      </p>
      <p class="home-projects__notice">
        {{ t('projects.teaser.soon') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.home-projects {
  --projects-strip-space: clamp(1.75rem, 3vw, 2.5rem);

  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: center;
  min-width: 0;
  min-height: 13rem;
  padding: var(--projects-strip-space) 0;
  border-top: 1px solid var(--line);
}

.home-projects__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
}

.home-projects__body {
  display: grid;
  gap: 1rem;
}

.home-projects__description {
  max-width: 35ch;
  margin: 0;
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  line-height: 1.5;
}

.home-projects__notice {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--ink-muted);
}

@media (max-width: 760px) {
  .home-projects {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    min-height: 0;
  }
}
</style>
