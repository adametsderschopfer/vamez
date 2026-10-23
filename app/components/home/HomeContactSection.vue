<script setup lang="ts">
import HomeContactCard from './HomeContactCard.vue'

const { t } = useI18n()
</script>

<template>
  <section id="contacts" class="home-contact" aria-labelledby="home-contact-title">
    <div class="home-contact__copy">
      <h2 id="home-contact-title" class="home-contact__title">
        <span>{{ t('home.contact.title') }}</span>
      </h2>
      <p class="home-contact__description">{{ t('home.contact.description') }}</p>
    </div>

    <HomeContactCard />
  </section>
</template>

<style scoped>
.home-contact {
  --contact-content-gap: clamp(2.5rem, 5vw, 4rem);
  --contact-bottom-space: clamp(2rem, 4vw, 4rem);

  display: grid;
  gap: var(--contact-content-gap);
  padding: 0 0 var(--contact-bottom-space);
  scroll-margin-top: var(--page-gutter);
}

.home-contact__copy {
  min-width: 0;
}

.home-contact__title {
  display: flex;
  gap: 0.3em;
  align-items: center;
  max-width: 18ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.home-contact__description {
  max-width: 65ch;
  margin: 1.5rem 0 0;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  line-height: 1.6;
  color: var(--ink-muted);
}
</style>
