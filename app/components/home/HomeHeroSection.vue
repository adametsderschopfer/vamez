<script setup lang="ts">
import { ArrowDown } from 'lucide-vue-next'
import HomeHeroPrimitives from './HomeHeroPrimitives.vue'

const { t, locale } = useI18n()
const { scrollToSection } = useSectionScroll()
const careerStartYear = 2020
const currentYear = useState('career-current-year', () => new Date().getFullYear())
const experienceDuration = computed(() =>
  new Intl.NumberFormat(locale.value, { style: 'unit', unit: 'year', unitDisplay: 'long' }).format(
    currentYear.value - careerStartYear
  )
)

onMounted(() => {
  currentYear.value = new Date().getFullYear()
})
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <HomeHeroPrimitives />
    <div class="home-hero__body">
      <div class="home-hero__identity">
        <h1 id="home-hero-title" class="home-hero__name">
          <span class="home-hero__first-name">{{ t('home.intro.firstName') }}{{ ' ' }}</span>
          <span class="home-hero__last-name">{{ t('home.intro.lastName') }}</span>
        </h1>
      </div>
      <div class="home-hero__summary">
        <i18n-t
          keypath="home.hero.description"
          tag="p"
          class="home-hero__description"
          scope="global"
        >
          <template #lineBreak><br /></template>
          <template #experience>
            <strong class="home-hero__experience">{{ experienceDuration }}</strong>
          </template>
          <template #outcome>
            <strong class="home-hero__outcome">{{ t('home.hero.outcome') }}</strong>
          </template>
        </i18n-t>
        <a class="home-hero__contact" href="#contacts" @click="scrollToSection('contacts', $event)">
          {{ t('home.hero.contactAction') }}
          <ArrowDown
            class="home-hero__contact-arrow"
            :size="23"
            :stroke-width="1.8"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  --hero-space: clamp(2rem, 4vw, 4rem);
  --hero-title-gap: clamp(1.5rem, 3vw, 2.5rem);
  --hero-summary-gap: clamp(1.25rem, 2vw, 1.5rem);

  position: relative;
  isolation: isolate;
}

.home-hero__body {
  position: relative;
  z-index: 1;
  display: grid;
  gap: var(--hero-title-gap);
  align-content: center;
  justify-items: center;
  min-height: calc(100svh - var(--header-height));
  padding: var(--hero-space) 0;
}

.home-hero__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5.6vw, 6.5rem);
  font-weight: 800;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.home-hero__summary {
  display: grid;
  gap: var(--hero-summary-gap);
  justify-items: center;
  width: min(100%, 40rem);
  text-align: center;
}

.home-hero__identity {
  display: grid;
  gap: 1.5rem;
  justify-items: center;
  min-width: 0;
}

.home-hero__description {
  max-width: 48ch;
  margin: 0;
  font-size: clamp(1rem, 1.35vw, 1.25rem);
  line-height: 1.65;
  color: var(--ink-muted);
  text-wrap: pretty;
}

.home-hero__experience {
  font-weight: 600;
  color: var(--card-accent);
  white-space: nowrap;
}

.home-hero__outcome {
  font-weight: 600;
  color: var(--ink);
}

.home-hero__contact {
  display: inline-flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  min-width: min(100%, 14rem);
  min-height: 3.75rem;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--line);
  transition:
    transform var(--motion-fast) var(--ease-out),
    background-color var(--motion-fast) ease,
    color var(--motion-fast) ease;
}

.home-hero__contact:focus-visible {
  color: var(--ink-on-accent);
  background: var(--card-accent);
  border-color: var(--card-accent);
}

.home-hero__contact-arrow {
  transition: transform var(--motion-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .home-hero__contact:hover {
    color: var(--ink-on-accent);
    background: var(--card-accent);
    border-color: var(--card-accent);
  }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .home-hero__contact:hover .home-hero__contact-arrow {
    transform: translateY(0.25rem);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .home-hero__contact:active {
    transform: scale(0.97);
  }
}

@media (max-width: 600px) {
  .home-hero__body {
    min-height: 0;
  }

  .home-hero__name {
    font-size: clamp(1.75rem, 8.3vw, 3.125rem);
  }

  .home-hero__description {
    max-width: 36ch;
  }
}
</style>
