<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import HomeCaseLogo from './HomeCaseLogo.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: companies, error } = await useWorkCases()
if (error.value) throw createError(error.value)
</script>

<template>
  <section id="cases" class="home-cases" aria-labelledby="home-cases-title">
    <NuxtLink class="home-cases__link" :to="localePath('/projects')">
      <div class="home-cases__intro">
        <h2 id="home-cases-title" class="home-cases__title">{{ t('home.cases.navigation') }}</h2>
        <ArrowUpRight class="home-cases__arrow" :size="72" aria-hidden="true" />
      </div>
      <p class="home-cases__notice">{{ t('home.cases.notice') }}</p>
      <div class="home-cases__companies" aria-hidden="true">
        <HomeCaseLogo
          v-for="company in companies"
          :key="company.key"
          :src="company.logo"
          :src-dark="company.logoDark"
          :name="company.name"
          :kind="company.logoKind"
          :monochrome="company.logoMonochrome"
          compact
        />
      </div>
      <span class="home-cases__action">{{ t('portfolio.open') }}</span>
    </NuxtLink>
  </section>
</template>

<style scoped>
.home-cases {
  padding: 0 0 var(--section-space);
}

.home-cases__link {
  display: block;
  padding: clamp(1.5rem, 4vw, 4rem);
  color: var(--ink);
  text-decoration: none;
  background: var(--card-surface);
  border: 1px solid var(--line);
  transition: background-color var(--motion-state);
}

.home-cases__intro {
  display: flex;
  gap: var(--grid-gap);
  align-items: center;
  justify-content: space-between;
}

.home-cases__title {
  margin: 0;
  font-size: clamp(3rem, 8vw, 8rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.home-cases__arrow {
  flex: none;
  width: clamp(2.5rem, 6vw, 5rem);
  transition: transform var(--motion-state);
}

.home-cases__notice {
  max-width: 38ch;
  margin: 1.5rem 0 2.5rem;
  font-size: var(--font-size-body);
  line-height: 1.6;
  color: var(--ink-muted);
}

.home-cases__companies {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.home-cases__action {
  display: inline-block;
  margin-top: 3rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.3em;
}

@media (hover: hover) {
  .home-cases__link:hover {
    background: var(--card-soft);
  }

  .home-cases__link:hover .home-cases__arrow {
    transform: translate(4px, -4px);
  }
}
</style>
