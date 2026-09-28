<script setup lang="ts">
import { Boxes, Braces, Workflow } from 'lucide-vue-next'

const { t } = useI18n()

const focusItems = [
  { key: 'engineering', icon: Braces },
  { key: 'systems', icon: Workflow },
  { key: 'interfaces', icon: Boxes }
] as const

const technologies = ['TypeScript', 'Vue / Nuxt', 'React / Next', 'Node.js', 'Python']
</script>

<template>
  <section id="about" class="home-about" aria-labelledby="home-about-title">
    <div class="home-about__intro home-about__reveal" data-reveal="idle">
      <div>
        <h2 id="home-about-title" class="home-about__title">{{ t('home.about.title') }}</h2>
        <p class="home-about__description">{{ t('home.about.description') }}</p>
      </div>
    </div>

    <div class="home-about__focus home-about__reveal" data-reveal="idle">
      <div class="home-about__card-heading">
        <h3 class="home-about__card-title">{{ t('home.about.focusLabel') }}</h3>
      </div>
      <ul class="home-about__focus-list">
        <li v-for="(item, index) in focusItems" :key="item.key" class="home-about__focus-item">
          <span class="home-about__focus-number">0{{ index + 1 }}</span>
          <component :is="item.icon" :size="23" :stroke-width="1.5" aria-hidden="true" />
          <span class="home-about__focus-name">{{ t(`home.about.focus.${item.key}`) }}</span>
        </li>
      </ul>
    </div>

    <div class="home-about__stack home-about__reveal" data-reveal="idle">
      <div class="home-about__card-heading home-about__card-heading--stack">
        <h3 class="home-about__stack-title">{{ t('home.about.stackTitle') }}</h3>
        <span class="home-about__stack-symbol">✳</span>
      </div>
      <ul class="home-about__technologies" :aria-label="t('home.about.stackLabel')">
        <li v-for="technology in technologies" :key="technology">{{ technology }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.home-about {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: var(--grid-gap);
  scroll-margin-top: 1rem;
}

.home-about__intro,
.home-about__focus,
.home-about__stack {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 24rem;
  padding: clamp(1.5rem, 2.5vw, 2.3rem);
  border-radius: var(--card-radius);
}

.home-about__reveal {
  transition:
    opacity var(--home-reveal-duration) ease,
    transform var(--home-reveal-duration) cubic-bezier(0.22, 1, 0.36, 1);
}

.home-about__reveal[data-reveal='idle'] {
  animation: home-about-enter var(--home-reveal-duration) cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--home-about-reveal-delay, 0s);
}

.home-about__reveal[data-reveal='pending'] {
  opacity: 0.8;
  transform: translateY(var(--home-reveal-distance));
}

.home-about__intro {
  --selection-text: var(--ink-on-dark);
  --selection-background: var(--card-dark);

  justify-content: flex-start;
  color: var(--ink-on-accent);
  background: var(--card-accent);
}

.home-about__focus {
  --home-about-reveal-delay: 0.09s;

  background: var(--card-surface);
  transition-delay: 0.09s;
}

.home-about__stack {
  --home-about-reveal-delay: 0.18s;

  background: var(--card-purple);
  transition-delay: 0.18s;
}

.home-about__card-heading {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.home-about__card-heading--stack {
  align-items: flex-start;
}

.home-about__card-title {
  margin: 0;
  font-size: clamp(1.3rem, 1.8vw, 1.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.055em;
}

.home-about__title {
  max-width: 11ch;
  margin: 0 0 1rem;
  font-size: clamp(2.4rem, 3.2vw, 4rem);
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -0.07em;
}

.home-about__description {
  max-width: 27rem;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.home-about__focus-list,
.home-about__technologies {
  padding: 0;
  margin: 0;
  list-style: none;
}

.home-about__focus-list {
  display: grid;
  margin-top: 2rem;
}

.home-about__focus-item {
  display: grid;
  grid-template-columns: 2rem 2rem minmax(0, 1fr);
  gap: 0.5rem;
  align-items: center;
  min-height: 5rem;
  border-top: 1px solid var(--line);
}

.home-about__focus-number {
  align-self: start;
  padding-top: 1.2rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--ink-muted);
}

.home-about__focus-name {
  font-size: clamp(0.95rem, 1.2vw, 1.2rem);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.home-about__stack-symbol {
  flex: none;
  margin-left: auto;
  font-size: 1.3rem;
}

.home-about__stack-title {
  min-width: 0;
  max-width: 18ch;
  margin: 0;
  font-size: clamp(1.9rem, 2.3vw, 2.7rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.065em;
}

.home-about__technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: auto;
}

.home-about__technologies li {
  padding: 0.55rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  border: 1px solid var(--line);
  border-radius: 999px;
}

@keyframes home-about-enter {
  from {
    opacity: 0.85;
    transform: translateY(var(--home-reveal-distance));
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 1100px) {
  .home-about {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-about__stack {
    grid-column: 1 / -1;
    min-height: 11rem;
  }
}

@media (max-width: 700px) {
  .home-about {
    grid-template-columns: 1fr;
  }

  .home-about__intro,
  .home-about__focus,
  .home-about__stack {
    grid-column: auto;
    min-height: 21rem;
  }

  .home-about__stack {
    min-height: 17rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-about__reveal {
    transition: none;
  }

  .home-about__reveal[data-reveal='idle'] {
    animation: none;
  }

  .home-about__reveal[data-reveal='pending'] {
    opacity: 1;
    transform: none;
  }
}
</style>
