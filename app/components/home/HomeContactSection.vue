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
  --contact-column-gap: clamp(2.5rem, 6vw, 6rem);

  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: var(--contact-column-gap);
  padding: var(--section-space) 0;
  scroll-margin-top: var(--page-gutter);
  border-top: 1px solid var(--line);
}

.home-contact__copy {
  min-width: 0;
}

.home-contact__title {
  max-width: 13ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4.4vw, 4.8rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.home-contact__description {
  max-width: 29rem;
  margin: 1.5rem 0 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--ink-muted);
}

@media (max-width: 900px) {
  .home-contact {
    grid-template-columns: 1fr;
  }
}
</style>
