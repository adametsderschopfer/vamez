<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="home-web" aria-labelledby="home-web-title">
    <div class="home-web__heading">
      <h2 id="home-web-title" class="home-web__title">{{ t('home.web.title') }}</h2>
    </div>
    <p class="home-web__description">{{ t('home.web.description') }}</p>
  </section>
</template>

<style scoped>
.home-web {
  --home-web-padding: clamp(1.5rem, 3vw, 2.75rem);

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: end;
  min-height: 15rem;
  padding: var(--home-web-padding);
  background: var(--card-soft);
  border: 1px solid var(--panel-border);
  border-radius: var(--card-radius);
}

.home-web__title {
  margin: 0;
  font-size: clamp(2.1rem, 3.6vw, 4rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.07em;
}

.home-web__description {
  --home-web-copy-delay: 0.1s;

  max-width: 35rem;
  padding-left: clamp(1.5rem, 3vw, 3rem);
  margin: 0;
  font-size: clamp(0.95rem, 1.2vw, 1.15rem);
  line-height: 1.65;
  color: var(--ink-muted);
  border-left: 1px solid var(--line);
}

.home-web[data-reveal='idle'] .home-web__heading,
.home-web[data-reveal='visible'] .home-web__heading,
.home-web[data-reveal='idle'] .home-web__description,
.home-web[data-reveal='visible'] .home-web__description {
  animation: home-web-copy-enter var(--home-reveal-duration) cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--home-web-copy-delay, 0s);
}

@keyframes home-web-copy-enter {
  from {
    opacity: 0.85;
    transform: translateY(0.5rem);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 700px) {
  .home-web {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    min-height: 0;
  }

  .home-web__description {
    padding-top: 1.5rem;
    padding-left: 0;
    border-top: 1px solid var(--line);
    border-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-web__heading,
  .home-web__description {
    animation: none;
  }
}
</style>
