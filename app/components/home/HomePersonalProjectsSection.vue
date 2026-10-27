<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    id="personal-projects"
    class="personal-projects"
    aria-labelledby="personal-projects-title"
  >
    <div class="personal-projects__intro">
      <h2 id="personal-projects-title" class="personal-projects__title">
        {{ t('home.personalProjects.title') }}
      </h2>
      <p class="personal-projects__description">{{ t('home.personalProjects.description') }}</p>
    </div>
    <div class="personal-projects__placeholder">
      <h3 class="personal-projects__placeholder-title">
        {{ t('home.personalProjects.comingSoon') }}
      </h3>
      <p class="personal-projects__notice">{{ t('home.personalProjects.notice') }}</p>
    </div>
  </section>
</template>

<style scoped>
.personal-projects {
  --personal-gap: clamp(1rem, 2vw, 2rem);

  padding: var(--section-space) 0;
}

.personal-projects__intro {
  display: flex;
  gap: var(--personal-gap);
  align-items: flex-end;
  justify-content: space-between;
}

.personal-projects__title {
  max-width: 12ch;
  margin: 0;
  font-size: clamp(2.75rem, 6vw, 6rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.04em;
}

.personal-projects__description {
  max-width: 30ch;
  margin: 0;
  font-size: var(--font-size-body);
  line-height: 1.6;
}

.personal-projects__placeholder {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--personal-gap);
  justify-items: center;
  padding: var(--section-space) 0;
  text-align: center;
}

.personal-projects__placeholder-title {
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.personal-projects__notice {
  max-width: 48ch;
  margin: 0;
  font-size: var(--font-size-body);
  line-height: 1.6;
  color: var(--ink-muted);
}

@media (max-width: 599px) {
  .personal-projects__intro {
    flex-direction: column;
    align-items: flex-start;
  }

  .personal-projects__title {
    font-size: clamp(2.25rem, 10vw, 3.5rem);
  }
}
</style>
