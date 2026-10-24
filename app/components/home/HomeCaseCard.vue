<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { WorkCase } from '@/types/workCases'
import HomeCaseLogo from './HomeCaseLogo.vue'
import HomeProjectGrid from './HomeProjectGrid.vue'

defineProps<{ company: WorkCase; tabbed?: boolean }>()
const { t, locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
</script>

<template>
  <article
    class="case-study"
    :class="[
      `case-study--${company.tone}`,
      { 'case-study--company-only': !company.projects.length, 'case-study--tabbed': tabbed }
    ]"
    :aria-labelledby="`case-title-${company.key}`"
  >
    <div class="case-study__body">
      <div class="case-study__identity">
        <header class="case-study__header">
          <span>{{ company.industry[language] }}</span>
          <span v-if="company.period" class="case-study__period">{{
            company.period[language]
          }}</span>
        </header>
        <h3 :id="`case-title-${company.key}`" class="case-study__company">
          <HomeCaseLogo
            :src="company.logo"
            :src-dark="company.logoDark"
            :name="company.name"
            :kind="company.logoKind"
            :monochrome="company.logoMonochrome"
            :size="company.logoSize"
          />
        </h3>
        <p v-if="company.role" class="case-study__role">{{ company.role[language] }}</p>
        <span v-if="company.status === 'closed'" class="case-study__status">
          {{ t('home.cases.closed') }}
        </span>
        <p class="case-study__statement">{{ company.statement[language] }}</p>
        <p v-if="company.summary" class="case-study__summary">{{ company.summary[language] }}</p>
        <a
          v-if="company.status !== 'closed'"
          class="case-study__link"
          :href="company.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('home.cases.companyWebsite') }}
          <ArrowUpRight :size="16" aria-hidden="true" />
        </a>
      </div>

      <HomeProjectGrid
        v-if="company.projects.length"
        :projects="company.projects"
        :company-id="company.key"
      />
    </div>
  </article>
</template>

<style scoped>
.case-study {
  --case-background: var(--deck-card-surface, var(--card-surface));
  --case-ink: var(--deck-card-ink, var(--ink));
  --case-padding: clamp(1.25rem, 2.5vw, 2.5rem);
  --case-rule: color-mix(in srgb, var(--case-ink) 24%, transparent);

  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2vw, 2rem);
  padding: var(--case-padding);
  color: var(--case-ink);
  background: var(--case-background);
  border: 1px solid var(--case-rule);
  isolation: isolate;
  transition:
    background-color var(--motion-fast) ease,
    color var(--motion-fast) ease;
}

.case-study--accent {
  --case-background: var(--deck-card-surface, var(--card-accent));
  --case-ink: var(--deck-card-ink, var(--ink-on-accent));
}

.case-study--tabbed {
  border-color: var(--line);
  border-top: 0;
}

.case-study__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  line-height: 1.5;
}

.case-study__body {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

.case-study__identity {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.case-study--company-only .case-study__body {
  grid-template-columns: 1fr;
}

.case-study--company-only .case-study__statement {
  max-width: 36ch;
}

.case-study--company-only .case-study__summary {
  max-width: 65ch;
}

.case-study__company {
  width: 100%;
  margin: 0;
}

.case-study__role {
  margin: 1rem 0 0;
  font-size: var(--font-size-label);
  font-weight: 600;
  line-height: 1.5;
}

.case-study__status {
  padding: 0.35rem 0.6rem;
  margin-top: 1rem;
  font-size: var(--font-size-meta);
  font-weight: var(--font-weight-meta);
  line-height: 1.4;
  border: 1px dashed var(--case-rule);
}

.case-study__statement {
  max-width: 21ch;
  margin: 1.25rem 0 1.5rem;
  font-size: clamp(1.25rem, 1.8vw, 1.75rem);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.case-study__link {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  line-height: 1.6;
  color: inherit;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.3em;
}

.case-study__summary {
  max-width: 36ch;
  margin: 0 0 1.5rem;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  line-height: 1.6;
}

.case-study__link:focus-visible {
  outline: 2px solid currentcolor;
  outline-offset: 0.35rem;
}

@media (hover: hover) {
  .case-study__link:hover {
    text-decoration: none;
  }
}

@media (min-width: 800px) and (min-height: 700px) {
  .case-study__identity {
    position: sticky;
    top: calc(var(--header-height) + var(--company-tabs-height, 0px) + var(--case-sticky-inset));
  }
}

@media (max-width: 799px) {
  .case-study {
    --case-padding: 1rem;
  }

  .case-study__body {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .case-study__header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .case-study__period {
    text-align: left;
  }

  .case-study__statement {
    max-width: 100%;
  }

  .case-study__summary {
    max-width: 100%;
    overflow-wrap: anywhere;
  }
}
</style>
