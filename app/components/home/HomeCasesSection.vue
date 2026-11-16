<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import HomeCasesIllustration from './HomeCasesIllustration.vue'
import HomeCompanyMarquee from './HomeCompanyMarquee.vue'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section id="cases" class="home-cases" aria-labelledby="home-cases-title">
    <NuxtLink
      class="home-cases__link"
      :to="localePath('/projects')"
      aria-labelledby="home-cases-action"
      aria-describedby="home-cases-notice"
    >
      <div class="home-cases__intro">
        <h2 id="home-cases-title" class="home-cases__title">{{ t('home.cases.navigation') }}</h2>
        <p id="home-cases-notice" class="home-cases__notice">{{ t('home.cases.notice') }}</p>
        <span id="home-cases-action" class="home-cases__action">
          {{ t('portfolio.open') }}
          <ArrowUpRight :size="20" aria-hidden="true" />
        </span>
      </div>
      <HomeCasesIllustration class="home-cases__illustration" />
    </NuxtLink>
    <HomeCompanyMarquee />
  </section>
</template>

<style scoped>
.home-cases {
  --cases-padding: clamp(1.5rem, 4.75vw, 5rem);
  --cases-surface: #e4e9fc;
  --cases-spotlight: #cbd5fa;
  --cases-title: #171d40;
  --cases-copy: #333e66;
  --cases-button: #263791;
  --cases-button-hover: #171d40;
  --cases-button-ink: #fff;
  --cases-divider: #a8b4df;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-bottom: var(--section-space);
  container-type: inline-size;
  overflow: clip;
  color: var(--cases-title);
  background: radial-gradient(ellipse at 83% 34%, var(--cases-spotlight), var(--cases-surface) 72%);
  border-radius: clamp(1rem, 2vw, 1.75rem);
}

[data-theme='dark'] .home-cases {
  --cases-surface: #171d40;
  --cases-spotlight: #282f66;
  --cases-title: #f6f5ff;
  --cases-copy: #d8ddf6;
  --cases-button: #d5deff;
  --cases-button-hover: #f6f5ff;
  --cases-button-ink: #171d40;
  --cases-divider: #465181;
}

.home-cases__link {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 44%);
  gap: var(--grid-gap);
  align-items: center;
  min-height: clamp(16rem, 28vw, 26rem);
  padding: var(--cases-padding);
  color: inherit;
  text-decoration: none;
}

.home-cases__link:focus-visible {
  outline-offset: -3px;
}

.home-cases__intro {
  display: grid;
  gap: 0.875rem;
}

.home-cases__title {
  margin: 0;
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.home-cases__notice {
  max-width: 42ch;
  margin: 0;
  font-size: var(--font-size-body);
  line-height: 1.6;
  color: var(--cases-copy);
}

.home-cases__action {
  display: inline-flex;
  gap: 0.65rem;
  align-items: center;
  justify-self: start;
  padding: 0.75rem 1rem 0.75rem 1.2rem;
  margin-top: 0.75rem;
  font-weight: 600;
  color: var(--cases-button-ink);
  background: var(--cases-button);
  border-radius: 999px;
}

.home-cases__illustration {
  display: block;
  justify-self: end;
  width: min(100%, 32rem);
  height: auto;
}

@media (hover: hover) {
  .home-cases__link:hover .home-cases__action {
    background: var(--cases-button-hover);
  }
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .home-cases__action {
    transition: background-color var(--motion-state);
  }

  .home-cases__illustration {
    transition: transform var(--motion-state) var(--ease-out);
  }

  .home-cases__link:hover .home-cases__illustration {
    transform: translateY(-0.35rem);
  }
}

@container (max-width: 64rem) {
  .home-cases__link {
    grid-template-columns: minmax(0, 1fr) minmax(0, 38%);
    min-height: auto;
  }

  .home-cases__title {
    font-size: clamp(2.5rem, 6.5cqi, 4rem);
  }

  .home-cases__illustration {
    width: min(100%, 21rem);
  }
}

@container (max-width: 40rem) {
  .home-cases__link {
    grid-template-areas:
      'title art'
      'notice notice'
      'action action';
    grid-template-columns: minmax(0, 1fr) minmax(0, 34%);
    gap: 0.875rem;
  }

  .home-cases__intro {
    display: contents;
  }

  .home-cases__title {
    grid-area: title;
    font-size: clamp(1.625rem, 8cqi, 3rem);
  }

  .home-cases__notice {
    grid-area: notice;
  }

  .home-cases__action {
    grid-area: action;
    margin-top: 0.25rem;
  }

  .home-cases__illustration {
    grid-area: art;
    width: min(100%, 10rem);
  }
}
</style>
