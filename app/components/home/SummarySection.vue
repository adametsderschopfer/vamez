<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="summary" class="summary-section" data-anchor>
    <div class="summary-section__container">
      <div class="summary-section__header">
        <h2 class="summary-section__title">{{ t('home.summary.title') }}</h2>
      </div>
      <div class="summary-section__content">
        <p class="summary-section__text">{{ t('home.summary.text') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.summary-section {
  position: relative;
  padding: 0 20px;
}

.summary-section__container {
  padding: clamp(2rem, 6vw, 4rem) 0;
}

.summary-section__header {
  margin-bottom: 3rem;
  padding: 0 70px;
  animation: fadeInUp 0.6s ease-out 0.2s forwards;
}

.summary-section__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
}

.summary-section__content {
  padding: 0 70px;
  animation: fadeInUp 0.6s ease-out 0.35s forwards;
  opacity: 0;
}

.summary-section__text {
  margin: 0;
  color: var(--color-text-soft);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.9;
  max-width: 80ch;
}

@media (max-width: 768px) {
  .summary-section__header,
  .summary-section__content {
    padding: 0 20px;
  }
}
</style>
