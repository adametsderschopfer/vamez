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
  display: grid;
  gap: 0.5rem;
  max-width: 47ch;
}

.home-curiosity__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}

.home-curiosity__description {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--ink-muted);
}
</style>
