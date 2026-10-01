<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="home-projects" aria-labelledby="home-projects-title">
    <div class="home-projects__card">
      <div class="home-projects__body">
        <div class="home-projects__copy">
          <h2 id="home-projects-title" class="home-projects__title">
            {{ t('projects.teaser.title') }}
          </h2>
          <p class="home-projects__description">
            {{ t('projects.teaser.soonDescription') }}
          </p>
        </div>
        <span class="home-projects__notice">
          {{ t('projects.teaser.soon') }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-projects {
  min-width: 0;
}

.home-projects__card {
  --home-projects-padding: clamp(1.5rem, 3vw, 2.75rem);

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: clamp(21rem, 30vw, 32rem);
  padding: var(--home-projects-padding);
  overflow: hidden;
  color: var(--ink);
  text-decoration: none;
  background: var(--card-purple);
  border: 1px solid var(--panel-border);
  border-radius: var(--card-radius);
  isolation: isolate;
}

.home-projects__notice {
  flex: none;
  max-width: 13rem;
  padding: 0.75rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  line-height: 1.5;
  color: var(--ink-on-accent);
  text-align: center;
  background: var(--card-accent);
  border-radius: var(--control-radius);
}

.home-projects__body {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: end;
  justify-content: space-between;
  margin-top: 4rem;
}

.home-projects__copy {
  position: relative;
  z-index: 1;
  flex: 1 1 24rem;
}

.home-projects__title {
  margin: 0;
  font-size: clamp(3.7rem, 9vw, 10rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.085em;
}

.home-projects__description {
  max-width: 31rem;
  margin: 1.5rem 0 0;
  font-size: clamp(0.92rem, 1.1vw, 1.05rem);
  line-height: 1.6;
}

@media (max-width: 600px) {
  .home-projects__body {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
    margin-top: 5rem;
  }

  .home-projects__title {
    font-size: clamp(3.2rem, 13vw, 5rem);
  }

  .home-projects__copy {
    flex: auto;
  }
}
</style>
