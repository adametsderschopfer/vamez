<script setup lang="ts">
import HomeCuriosityCard from '@/components/home/HomeCuriosityCard.vue'

const { t } = useI18n()
const focusItems = ['engineering', 'systems', 'interfaces'] as const
</script>

<template>
  <section id="about" class="home-about" aria-labelledby="home-about-title">
    <div class="home-about__intro">
      <h2 id="home-about-title" class="home-about__title">{{ t('home.about.title') }}</h2>
      <p class="home-about__description">{{ t('home.about.description') }}</p>
    </div>

    <div class="home-about__focus">
      <h3 class="home-about__focus-title">{{ t('home.about.focusLabel') }}</h3>
      <ul class="home-about__focus-list">
        <li v-for="item in focusItems" :key="item" class="home-about__focus-item">
          <h4 class="home-about__focus-name">{{ t(`home.about.focus.${item}`) }}</h4>
          <p class="home-about__focus-description">
            {{ t(`home.about.focusDescription.${item}`) }}
          </p>
        </li>
      </ul>
      <HomeCuriosityCard class="home-about__curiosity" />
    </div>
  </section>
</template>

<style scoped>
.home-about {
  --about-column-gap: clamp(2.5rem, 6vw, 6rem);
  --about-row-space: clamp(1.5rem, 3vw, 2.5rem);

  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: var(--about-column-gap);
  padding-top: var(--about-row-space);
  padding-bottom: var(--section-space);
  scroll-margin-top: var(--page-gutter);
  border-top: 1px solid var(--line);
}

.home-about__title {
  max-width: 13ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4.9vw, 4.5rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.home-about__description {
  max-width: 49ch;
  margin: var(--about-row-space) 0 0;
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  line-height: 1.65;
}

.home-about__focus-title {
  margin: 0 0 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--ink-muted);
}

.home-about__focus-list {
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
}

.home-about__focus-item {
  display: grid;
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
}

.home-about__focus-name {
  margin: 0;
  font-size: clamp(1.25rem, 2.1vw, 1.9rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.025em;
}

.home-about__focus-description {
  max-width: 40ch;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.55;
  color: var(--ink-muted);
}

.home-about__focus-item:first-child {
  padding-top: 0;
}

.home-about__curiosity {
  margin-top: var(--about-row-space);
}

@media (max-width: 760px) {
  .home-about {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .home-about__title {
    max-width: 16ch;
  }

  .home-about__description {
    max-width: 60ch;
  }
}
</style>
