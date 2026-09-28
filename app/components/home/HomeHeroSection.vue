<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight } from 'lucide-vue-next'
import { computed } from 'vue'
import SiteControls from '@/components/home/SiteControls.vue'

const { t } = useI18n()
const { scrollToSection } = useSectionScroll()
const emit = defineEmits<{ openContacts: [] }>()
const titleStart = computed(() => t('home.hero.titleStart'))
const titleAccent = computed(() => t('home.hero.titleAccent'))
const { startWords, accentWords, highlightDelay, highlightDuration } = useHeroTitleTyping(
  titleStart,
  titleAccent
)
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__intro">
      <div class="home-hero__copy">
        <h1
          id="home-hero-title"
          class="home-hero__title"
          :aria-label="`${titleStart} ${titleAccent}`"
        >
          <span class="home-hero__title-start" aria-hidden="true">
            <template v-for="(word, index) in startWords" :key="`${word.text}-${index}`">
              <span
                class="home-hero__title-word"
                :style="{
                  animationDelay: `${word.delay}ms`,
                  animationDuration: `${word.duration}ms`,
                  animationTimingFunction: `steps(${word.steps}, end)`
                }"
                >{{ word.text }}</span
              >{{ index < startWords.length - 1 ? ' ' : '' }} </template
            >{{ ' ' }}
          </span>
          <span
            class="home-hero__title-accent"
            aria-hidden="true"
            :style="{
              '--highlight-delay': `${highlightDelay}ms`,
              '--highlight-duration': `${highlightDuration}ms`
            }"
          >
            <template v-for="(word, index) in accentWords" :key="`${word.text}-${index}`">
              <span
                class="home-hero__title-word"
                :style="{
                  animationDelay: `${word.delay}ms`,
                  animationDuration: `${word.duration}ms`,
                  animationTimingFunction: `steps(${word.steps}, end)`
                }"
                >{{ word.text }}</span
              >{{ index < accentWords.length - 1 ? ' ' : '' }}
            </template>
          </span>
        </h1>
        <p class="home-hero__description">{{ t('home.hero.description') }}</p>
      </div>

      <div class="home-hero__actions">
        <button
          class="home-hero__primary-link"
          type="button"
          aria-controls="home-contact-links"
          aria-haspopup="dialog"
          @click="emit('openContacts')"
        >
          {{ t('home.hero.contactAction') }}
          <ArrowUpRight
            class="home-hero__primary-arrow"
            :size="18"
            :stroke-width="1.8"
            aria-hidden="true"
          />
        </button>
        <a
          class="home-hero__secondary-link"
          href="#about"
          @click.prevent="scrollToSection('about')"
        >
          {{ t('home.hero.aboutAction') }}
          <ArrowDownRight
            class="home-hero__secondary-arrow"
            :size="17"
            :stroke-width="1.8"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>

    <div class="home-hero__identity">
      <div class="home-hero__identity-top">
        <SiteControls class="home-hero__controls" />
      </div>
      <div class="home-hero__identity-copy">
        <span class="home-hero__identity-label">{{ t('home.hero.identityLabel') }}</span>
        <p class="home-hero__identity-name">
          {{ `${t('home.intro.firstName')} ${t('home.intro.lastName')}` }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(20rem, 1fr);
  gap: var(--grid-gap);
}

.home-hero__intro,
.home-hero__identity {
  min-height: clamp(30rem, 39vw, 36rem);
  padding: clamp(1.5rem, 3vw, 2.75rem);
  border-radius: var(--card-radius);
}

.home-hero__intro {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--card-surface);
  animation: home-hero-enter var(--home-reveal-duration) cubic-bezier(0.22, 1, 0.36, 1) both;
}

.home-hero__identity-label {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.home-hero__copy {
  max-width: 55rem;
  padding: 2rem 0;
  margin: auto 0;
}

.home-hero__title {
  max-width: 15ch;
  margin: 0;
  font-size: clamp(3.2rem, 5.1vw, 5.8rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.055em;
}

.home-hero__title-start,
.home-hero__title-accent {
  display: block;
}

.home-hero__title-word {
  position: relative;
  z-index: 1;
  display: inline-block;
  animation-name: home-hero-type-word;
  animation-fill-mode: both;
}

.home-hero__title-accent {
  --selection-text: var(--ink-on-dark);
  --selection-background: var(--card-dark);

  position: relative;
  width: fit-content;
  max-width: 100%;
  padding: 0.02em 0.08em 0.08em;
  margin-top: 0.12em;
  color: var(--ink-on-accent);
  border-radius: 0.12em;
  isolation: isolate;
}

.home-hero__title-accent::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  content: '';
  background: var(--card-accent);
  border-radius: inherit;
  transform-origin: left;
  animation: home-hero-highlight var(--highlight-duration) cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--highlight-delay);
}

.home-hero__description {
  max-width: 31rem;
  margin: clamp(1.25rem, 2vw, 2rem) 0 0;
  font-size: clamp(0.95rem, 1.2vw, 1.15rem);
  line-height: 1.65;
  color: var(--ink-muted);
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
}

.home-hero__primary-link,
.home-hero__secondary-link {
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  font-size: 0.84rem;
  font-weight: 700;
  text-decoration: none;
}

.home-hero__primary-arrow,
.home-hero__secondary-arrow {
  flex: none;
  transition: transform 0.22s ease;
}

.home-hero__primary-link:hover .home-hero__primary-arrow,
.home-hero__primary-link:focus-visible .home-hero__primary-arrow {
  transform: translate(2px, -2px);
}

.home-hero__secondary-link:hover .home-hero__secondary-arrow,
.home-hero__secondary-link:focus-visible .home-hero__secondary-arrow {
  transform: translate(2px, 2px);
}

.home-hero__primary-link {
  min-height: 3.3rem;
  padding: 0 1.25rem;
  color: var(--primary-button-text);
  cursor: pointer;
  background: var(--primary-button-background);
  border: 0;
  border-radius: 999px;
}

.home-hero__secondary-link {
  color: var(--ink);
}

.home-hero__identity {
  --selection-text: var(--ink-on-dark);
  --selection-background: var(--card-dark);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  overflow: hidden;
  color: var(--ink-on-accent);
  background: var(--card-accent);
  animation: home-hero-enter var(--home-reveal-duration) cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 0.1s;
}

.home-hero__identity-top {
  display: flex;
  justify-content: flex-end;
}

.home-hero__controls {
  flex: none;
}

.home-hero__identity-copy {
  display: grid;
  gap: 0.75rem;
  justify-items: start;
}

.home-hero__identity-name {
  max-width: 10ch;
  margin: 0;
  font-size: clamp(2.7rem, 4.1vw, 4.8rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.045em;
}

@keyframes home-hero-enter {
  from {
    opacity: 0.85;
    transform: translateY(var(--home-reveal-distance));
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes home-hero-type-word {
  from {
    clip-path: inset(0 100% 0 0);
  }

  to {
    clip-path: inset(0);
  }
}

@keyframes home-hero-highlight {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

@media (max-width: 900px) {
  .home-hero {
    grid-template-columns: 1fr;
  }

  .home-hero__intro {
    min-height: 30rem;
  }

  .home-hero__identity {
    min-height: 22rem;
  }
}

@media (max-width: 600px) {
  .home-hero__intro {
    min-height: 31rem;
  }

  .home-hero__title {
    font-size: clamp(2.75rem, 10vw, 4rem);
  }

  .home-hero__identity {
    min-height: 19rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__intro,
  .home-hero__identity {
    animation: none;
  }

  .home-hero__title-word,
  .home-hero__title-accent::before {
    animation: none;
  }

  .home-hero__primary-arrow,
  .home-hero__secondary-arrow {
    transition: none;
  }
}
</style>
