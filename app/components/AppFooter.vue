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
  padding: 2rem 20px;
  padding-bottom: 8rem;
  margin-top: 4rem;
}

.app-footer__content {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin: 0 30px;
  border: 1px solid color-mix(in srgb, var(--glass-border) 82%, rgba(255, 255, 255, 0.08));
  border-radius: 2rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 24px 70px var(--glass-shadow);
  backdrop-filter: blur(28px);

  padding: clamp(2rem, 6vw, 4rem);

  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.app-footer__content::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(110deg, rgba(255, 255, 255, 0.05), transparent 34%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.08), transparent 36%);
  content: '';
  pointer-events: none;
}

.app-footer__text {
  position: relative;
  z-index: 1;
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
