<script setup lang="ts">
const { t } = useI18n()
const { containerRef, isRevealed } = useScrollReveal()
</script>

<template>
  <section id="summary" ref="containerRef" class="summary-section" data-anchor>
    <div class="summary-section__container" :class="{ 'is-revealed': isRevealed }">
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
  overflow: hidden;
}

.summary-section__container {
  padding: clamp(2rem, 6vw, 4rem) 0;
}

.summary-section__header {
  padding: 0 70px;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.summary-section__container.is-revealed .summary-section__header {
  opacity: 1;
  transform: translateY(0);
}

.summary-section__title {
  margin: 0;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
}

.summary-section__content {
  padding: 0 70px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out 0.15s,
    transform 0.6s ease-out 0.15s;
}

.summary-section__container.is-revealed .summary-section__content {
  opacity: 1;
  transform: translateY(0);
}

.summary-section__text {
  max-width: 80ch;
  margin: 0;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.9;
  color: var(--color-text-soft);
}

@media (max-width: 768px) {
  .summary-section__header,
  .summary-section__content {
    padding: 0 20px;
  }
}
</style>
