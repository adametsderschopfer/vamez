<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import type { WorkCase } from '@/types/workCases'
import HomeCaseLogo from '@/components/home/HomeCaseLogo.vue'
import DevelopmentBadge from './DevelopmentBadge.vue'

defineProps<{ companies: WorkCase[]; active: string }>()
const emit = defineEmits<{ navigate: [key: string] }>()
const { t, locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))

function selectCompany(event: Event) {
  if (event.target instanceof HTMLSelectElement) emit('navigate', event.target.value)
}
</script>

<template>
  <nav class="company-rail" :aria-label="t('home.cases.deckNavigation')">
    <div class="company-rail__mobile">
      <select
        class="company-rail__select"
        :aria-label="t('home.cases.deckNavigation')"
        :value="active || companies[0]?.key"
        @change="selectCompany"
      >
        <option v-for="company in companies" :key="company.key" :value="company.key">
          {{ company.name }} ({{ company.projects.length }})
        </option>
      </select>
      <ChevronDown :size="16" class="company-rail__chevron" aria-hidden="true" />
    </div>
    <div class="company-rail__panel">
      <button
        v-for="company in companies"
        :key="company.key"
        type="button"
        class="company-rail__item"
        :aria-current="active === company.key ? 'true' : undefined"
        :aria-label="t('home.cases.selectCompany', { company: company.name })"
        :title="
          company.developmentMode
            ? t(`portfolio.development.${company.developmentMode}`)
            : undefined
        "
        @click="$emit('navigate', company.key)"
      >
        <span class="company-rail__mark" aria-hidden="true"
          ><HomeCaseLogo
            :src="company.key === 'mozen' ? '/images/companies/mozen-mark-ink.svg' : company.logo"
            :src-dark="
              company.key === 'mozen' ? '/images/companies/mozen-mark.svg' : company.logoDark
            "
            :name="company.name"
            :kind="company.key === 'mozen' ? 'symbol' : company.logoKind"
            :monochrome="company.logoMonochrome"
            compact
          />
        </span>
        <span class="company-rail__details">
          <span class="company-rail__details-content"
            ><strong>{{ company.name }}</strong
            ><span v-if="company.role">{{ company.role[language] }}</span
            ><span v-if="company.period">{{ company.period[language] }}</span>
            <DevelopmentBadge v-if="company.developmentMode" :mode="company.developmentMode" />
          </span>
        </span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.company-rail {
  --rail-width: 5.5rem;
  --rail-expanded-width: min(24rem, calc(100vw - 2rem));

  position: sticky;
  top: calc(var(--header-height) + 1rem);
  z-index: 5;
  align-self: start;
  width: var(--rail-width);
}

.company-rail__panel {
  width: var(--rail-width);
  max-height: calc(100dvh - var(--header-height) - 2rem);
  padding: 0.5rem;
  overflow: hidden auto;
  scrollbar-width: none;
  background: var(--page-background);
  border: 1px solid var(--line);
  border-radius: 1rem;
  transition:
    width var(--motion-state) var(--ease-out),
    box-shadow var(--motion-state);
}

.company-rail__mobile {
  display: none;
}

.company-rail__panel:hover,
.company-rail__panel:focus-within {
  width: var(--rail-expanded-width);
  box-shadow: 1rem 1rem 3rem rgb(0 0 0 / 30%);
}

.company-rail__item {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  min-height: 4.25rem;
  padding: 0.5rem;
  color: var(--ink-muted);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 0.5rem;
  transition:
    background-color var(--motion-fast) ease,
    color var(--motion-fast) ease;
}

.company-rail__item[aria-current='true'] {
  color: var(--ink);
  background: var(--card-soft);
}

@media (hover: hover) and (pointer: fine) {
  .company-rail__item:hover {
    color: var(--ink);
    background: var(--card-soft);
  }

  .company-rail__panel:has(.company-rail__item:hover)
    .company-rail__item[aria-current='true']:not(:hover) {
    background: transparent;
  }
}

.company-rail__mark {
  display: grid;
  flex: none;
  place-items: center;
  width: 3.25rem;
}

.company-rail__mark :deep(.case-logo) {
  max-width: 3rem;
}

.company-rail__details {
  display: grid;
  flex: none;
  grid-template-rows: 0fr;
  width: calc(var(--rail-expanded-width) - 7rem);
  font-size: 0.75rem;
  line-height: 1.35;
  opacity: 0;
  transition:
    grid-template-rows var(--motion-state) var(--ease-out),
    opacity var(--motion-state) ease;
}

.company-rail__details-content {
  display: grid;
  gap: 0.3rem;
  min-height: 0;
  overflow: hidden;
}

.company-rail__details strong {
  font-size: 0.875rem;
  color: var(--ink);
}

.company-rail__panel:hover .company-rail__details,
.company-rail__panel:focus-within .company-rail__details {
  grid-template-rows: 1fr;
  opacity: 1;
}

@media (max-width: 799px) {
  .company-rail {
    top: var(--header-height);
    width: 100%;
    padding-block: var(--company-picker-space);
    background: var(--page-background);
  }

  .company-rail__panel {
    display: none;
  }

  .company-rail__mobile {
    position: relative;
    display: block;
  }

  .company-rail__select {
    width: 100%;
    height: var(--company-picker-height);
    padding-inline: 1rem 2.5rem;
    font: inherit;
    color: var(--ink);
    appearance: none;
    cursor: pointer;
    background: var(--card-surface);
    border: 1px solid var(--line);
    border-radius: 0.75rem;
  }

  .company-rail__chevron {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-end: 1rem;
    color: var(--ink-muted);
    pointer-events: none;
    transform: translateY(-50%);
  }
}
</style>
