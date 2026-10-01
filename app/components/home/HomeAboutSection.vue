<script setup lang="ts">
import { Boxes, Braces, Workflow } from 'lucide-vue-next'
import HomeCuriosityCard from '@/components/home/HomeCuriosityCard.vue'

const { t } = useI18n()

const focusItems = [
  { key: 'engineering', icon: Braces },
  { key: 'systems', icon: Workflow },
  { key: 'interfaces', icon: Boxes }
] as const
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
          <component
            :is="item.icon"
            class="home-about__focus-icon"
            :size="20"
            :stroke-width="1.5"
            aria-hidden="true"
          />
          <span class="home-about__focus-name">{{ t(`home.about.focus.${item.key}`) }}</span>
        </li>
      </ul>
    </div>

    <HomeCuriosityCard class="home-about__curiosity home-about__reveal" data-reveal="idle" />
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
.home-about__focus {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 24rem;
  padding: clamp(1.5rem, 2.5vw, 2.3rem);
  border: 1px solid var(--panel-border);
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
  --focus-row-height: 3.85rem;
  --focus-column-width: 1.5rem;
  --focus-column-gap: 0.75rem;
  --focus-row-padding: 0.85rem;
  --focus-heading-gap: 1.25rem;

  gap: var(--focus-heading-gap);
  justify-content: flex-start;
  background: var(--card-surface);
  transition-delay: 0.09s;
}

.home-about__curiosity {
  --home-about-reveal-delay: 0.18s;

  transition-delay: 0.18s;
}

.home-about__card-heading {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.home-about__card-title {
  margin: 0;
  font-size: clamp(1.25rem, 1.6vw, 1.5rem);
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

.home-about__focus-list {
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
}

.home-about__focus-item {
  display: grid;
  grid-template-columns: var(--focus-column-width) var(--focus-column-width) minmax(0, 1fr);
  gap: var(--focus-column-gap);
  align-items: center;
  min-height: var(--focus-row-height);
  padding: var(--focus-row-padding) 0;
  border-top: 1px solid var(--line);
}

.home-about__focus-number {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--ink-muted);
}

.home-about__focus-icon {
  justify-self: center;
  color: var(--ink-muted);
}

.home-about__focus-name {
  font-size: clamp(0.95rem, 1.1vw, 1.1rem);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.025em;
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

  .home-about__curiosity {
    grid-column: 1 / -1;
  }
}

@media (max-width: 700px) {
  .home-about {
    grid-template-columns: 1fr;
  }

  .home-about__intro {
    grid-column: auto;
    min-height: 21rem;
  }

  .home-about__focus {
    grid-column: auto;
    min-height: 0;
  }

  .home-about__curiosity {
    grid-column: auto;
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
