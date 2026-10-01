<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="home-curiosity">
    <h3 class="home-curiosity__title">{{ t('home.about.curiosityTitle') }}</h3>
    <p class="home-curiosity__description">{{ t('home.about.curiosityDescription') }}</p>
  </div>
</template>

<style scoped>
.home-curiosity {
  --home-curiosity-padding: clamp(1.5rem, 2.5vw, 2.3rem);
  --home-curiosity-gap: 2rem;

  display: flex;
  flex-direction: column;
  gap: var(--home-curiosity-gap);
  justify-content: space-between;
  min-height: 24rem;
  padding: var(--home-curiosity-padding);
  background: var(--card-purple);
  border: 1px solid var(--panel-border);
  border-radius: var(--card-radius);
}

.home-curiosity__title {
  min-width: 0;
  max-width: 18ch;
  margin: 0;
  font-size: clamp(1.9rem, 2.3vw, 2.7rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.065em;
}

.home-curiosity__description {
  max-width: 35rem;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 1100px) {
  .home-curiosity {
    min-height: 11rem;
  }
}

@media (max-width: 700px) {
  .home-curiosity {
    min-height: 17rem;
  }
}
</style>
