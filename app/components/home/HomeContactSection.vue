<script setup lang="ts">
import HomeContactCard from './HomeContactCard.vue'

const { t } = useI18n()
</script>

<template>
  <section id="contacts" class="home-contact" aria-labelledby="home-contact-title">
    <div class="home-contact__copy">
      <h2 id="home-contact-title" class="home-contact__title">
        {{ t('home.contact.title') }}
      </h2>
      <p class="home-contact__description">{{ t('home.contact.description') }}</p>
    </div>

    <HomeContactCard />
  </section>
</template>

<style scoped>
.home-contact {
  --contact-content-gap: clamp(2.5rem, 5vw, 4rem);

  display: grid;
  gap: var(--contact-content-gap);
  padding: var(--section-space) 0;
  scroll-margin-top: var(--page-gutter);
  border-top: 1px solid var(--line);
}

.home-contact__copy {
  min-width: 0;
}

.home-contact__title {
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
  max-width: 38ch;
  margin: 1.5rem 0 0;
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  line-height: 1.6;
  color: var(--ink-muted);
}
</style>
