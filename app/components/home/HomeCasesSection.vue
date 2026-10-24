<script setup lang="ts">
import HomeCompanyDeck from './HomeCompanyDeck.vue'

const { t } = useI18n()
const { data: workCases, error } = await useAsyncData('work-cases', async () => {
  const [companies, projects] = await Promise.all([
    queryCollection('companies').order('order', 'ASC').all(),
    queryCollection('projects').order('order', 'ASC').all()
  ])

  return companies.map((company) => ({
    ...company,
    projects: projects.filter((project) => project.company === company.key)
  }))
})

if (error.value) throw createError(error.value)
</script>

<template>
  <section id="cases" class="home-cases" aria-labelledby="home-cases-title">
    <div class="home-cases__intro">
      <h2 id="home-cases-title" class="home-cases__title">{{ t('home.cases.title') }}</h2>
      <div class="home-cases__context">
        <p class="home-cases__notice">{{ t('home.cases.notice') }}</p>
      </div>
    </div>

    <HomeCompanyDeck v-if="workCases?.length" :companies="workCases" />
  </section>
</template>

<style scoped>
.home-cases {
  --case-sticky-inset: 1.5rem;

  position: relative;
  padding: var(--section-space) 0;
  isolation: isolate;
}

.home-cases__intro {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: clamp(2rem, 5vw, 4rem);
}

.home-cases__title {
  flex-shrink: 0;
  margin: 0;
  font-size: clamp(2.75rem, 6vw, 6rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.04em;
  white-space: nowrap;
}

.home-cases__context {
  max-width: 28rem;
}

.home-cases__notice {
  margin: 0;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  line-height: 1.6;
  color: var(--ink-muted);
}

@media (max-width: 799px) {
  .home-cases__title {
    font-size: clamp(1.5rem, 7vw, 3.25rem);
  }

  .home-cases__intro {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
