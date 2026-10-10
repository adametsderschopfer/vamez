<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()
const { scrollToSection } = useSectionScroll()
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__body">
      <h1 id="home-hero-title" class="home-hero__title">
        <span class="home-hero__title-line">{{ t('home.hero.titleStart') }}{{ ' ' }}</span>
        <span class="home-hero__title-line">{{ t('home.hero.titleAccent') }}</span>
      </h1>
      <div class="home-hero__summary">
        <div class="home-hero__identity">
          <p class="home-hero__name">
            {{ t('home.intro.firstName') }} {{ t('home.intro.lastName') }}
          </p>
          <p class="home-hero__role">{{ t('home.hero.identityLabel') }}</p>
        </div>
        <p class="home-hero__description">{{ t('home.hero.description') }}</p>
        <a class="home-hero__contact" href="#contacts" @click="scrollToSection('contacts', $event)">
          {{ t('home.hero.contactAction') }}
          <ArrowUpRight :size="23" :stroke-width="1.8" aria-hidden="true" />
        </a>
      </div>
      <a class="home-hero__more" href="#about" @click="scrollToSection('about', $event)">
        {{ t('home.hero.aboutAction') }}
        <ArrowDownRight :size="18" :stroke-width="1.8" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  --hero-space: clamp(3rem, 7vw, 7rem);
}

.home-hero__body {
  padding: var(--hero-space) 0 clamp(2.5rem, 5vw, 5rem);
}

.home-hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.25rem, 9vw, 8rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.04em;
}

.home-hero__title-line {
  display: block;
}

.home-hero__summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) auto;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: start;
  padding-top: clamp(2.5rem, 5vw, 5rem);
}

.home-hero__identity {
  padding-top: 0.25rem;
}

.home-hero__name {
  margin: 0;
  font-size: clamp(1rem, 1.3vw, 1.25rem);
  font-weight: 700;
}

.home-hero__role {
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: var(--ink-muted);
}

.home-hero__description {
  max-width: 42ch;
  margin: 0;
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  line-height: 1.65;
}

.home-hero__contact {
  display: inline-flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  min-height: 3.75rem;
  padding: 1rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink-on-accent);
  text-decoration: none;
  cursor: pointer;
  background: var(--card-accent);
  border: 0;
}

.home-hero__contact:hover {
  background: color-mix(in srgb, var(--card-accent) 85%, var(--ink));
}

.home-hero__more {
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
  min-height: 2.75rem;
  margin-top: clamp(2.5rem, 5vw, 5rem);
  font-size: 0.875rem;
  color: var(--ink-muted);
  text-decoration: none;
}

.home-hero__more:hover {
  color: var(--ink);
  text-decoration: underline;
}

@media (max-width: 900px) {
  .home-hero__summary {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  }

  .home-hero__contact {
    grid-column: 2;
    justify-self: start;
  }
}

@media (max-width: 600px) {
  .home-hero__title {
    font-size: clamp(2.5rem, 8.7vw, 3.5rem);
    line-height: 1.08;
  }

  .home-hero__summary {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .home-hero__contact {
    grid-column: auto;
    width: 100%;
  }

  .home-hero__description {
    max-width: 38ch;
  }

  .home-hero__more {
    margin-top: 1.5rem;
  }
}
</style>
