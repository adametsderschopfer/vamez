<script setup lang="ts">
const { t } = useI18n()

const currentYear = new Date().getFullYear()
const footerText = `${t('footer.madeWith')} ${currentYear}`
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__content">
      <p class="app-footer__text">{{ footerText }}</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  position: relative;
  width: 100%;
  padding: 3rem 20px;
  padding-bottom: 8rem;
  margin-top: 4rem;
  background: var(--glass-bg);
}

.app-footer__content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.app-footer__text {
  margin: 0;
  color: var(--color-text-soft);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  text-align: left;
  font-weight: 500;
  letter-spacing: 0.02em;
}

@media (max-width: 640px) {
  .app-footer {
    padding: 2rem 14px;
    padding-bottom: 7rem;
    margin-top: 2rem;
  }

  .app-footer__text {
    font-size: clamp(0.9rem, 2vw, 1rem);
  }
}
</style>
