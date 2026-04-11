<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="summary" class="summary-section" data-anchor>
    <div class="summary-section__container">
      <div class="summary-section__panel">
        <div class="summary-section__inner">
          <h2 class="summary-section__title">{{ t('home.summary.title') }}</h2>
          <p class="summary-section__text">{{ t('home.summary.text') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.summary-section {
  padding: 0 20px;
}

.summary-section__container {
  padding: clamp(2rem, 6vw, 4rem) 0;
}

.summary-section__panel {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--glass-border) 82%, rgba(255, 255, 255, 0.08));
  border-radius: 2rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 24px 70px var(--glass-shadow);
  backdrop-filter: blur(28px);
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.summary-section__panel::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(110deg, rgba(255, 255, 255, 0.05), transparent 34%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.08), transparent 36%);
  content: '';
  pointer-events: none;
}

.summary-section__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: clamp(2rem, 6vw, 4rem);
}

.summary-section__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
}

.summary-section__text {
  margin: 0;
  color: var(--color-text-soft);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.8;
  max-width: 72ch;
}

@media (max-width: 640px) {
  .summary-section {
    padding: 0 14px;
  }

  .summary-section__panel {
    border-radius: 1.5rem;
  }
}
</style>
