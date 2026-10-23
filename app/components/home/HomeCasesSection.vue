<script setup lang="ts">
import HomeCaseCard from './HomeCaseCard.vue'

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

    <ul class="home-cases__list">
      <li v-for="company in workCases" :key="company.key" class="home-cases__item">
        <HomeCaseCard :company="company" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.home-cases {
  --case-sticky-inset: 1.5rem;
  --case-section-gap: clamp(1.5rem, 3vw, 3rem);

  padding: var(--section-space) 0;
}

.home-cases__intro {
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: clamp(2rem, 5vw, 4rem);
}

.home-cases__title {
  max-width: 10ch;
  margin: 0;
  font-size: clamp(2.75rem, 6vw, 6rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.04em;
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

.home-cases__list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.home-cases__item {
  margin-bottom: var(--case-section-gap);
}

.home-cases__item:last-child {
  margin-bottom: 0;
}

@media (max-width: 799px) {
  .home-cases {
    --case-section-gap: 1.5rem;
  }

  .home-cases__intro {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
