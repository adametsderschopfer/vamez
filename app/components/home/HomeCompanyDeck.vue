<script setup lang="ts">
import type { WorkCase } from '@/types/workCases'
import HomeCaseCard from './HomeCaseCard.vue'
import HomeCaseDeckNavigation from './HomeCaseDeckNavigation.vue'

const props = defineProps<{ companies: WorkCase[] }>()
const { t } = useI18n()
const root = useTemplateRef<HTMLElement>('root')
const { activeIndex, switching, goTo } = useCompanyDeckTransition(
  root,
  () => props.companies.length
)
useFloatingMotion(root, {
  selector: '.company-deck__navigation',
  driftDistance: 5,
  rotationRange: 1
})

const cards = computed(() =>
  props.companies.map((company, index) => {
    const depth = index === activeIndex.value ? 0 : index < activeIndex.value ? index + 1 : index
    return {
      company,
      index,
      active: depth === 0,
      style: {
        zIndex: props.companies.length - depth,
        '--deck-depth': depth,
        '--deck-label-position': index
      }
    }
  })
)

async function activate(index: number) {
  await goTo(index)
  root.value
    ?.querySelector<HTMLElement>('.company-deck__card--active .company-deck__content')
    ?.focus({ preventScroll: true })
}
</script>

<template>
  <div
    ref="root"
    class="company-deck"
    :style="{ '--deck-back-count': companies.length - 1, '--deck-count': companies.length }"
  >
    <ul class="company-deck__cards">
      <li
        v-for="card in cards"
        :key="card.company.key"
        class="company-deck__card"
        :class="{
          'company-deck__card--active': card.active,
          'company-deck__card--accent': card.company.tone === 'accent'
        }"
        :style="card.style"
        :data-company-index="card.index"
      >
        <div
          class="company-deck__content"
          :inert="!card.active"
          :aria-hidden="!card.active"
          :tabindex="card.active ? 0 : -1"
          :aria-label="card.company.name"
        >
          <HomeCaseCard :company="card.company" />
        </div>
        <span v-if="card.active" class="company-deck__label" :title="card.company.name">
          <span class="company-deck__number">{{ String(card.index + 1).padStart(2, '0') }}</span>
          <span class="company-deck__name">{{ card.company.name }}</span>
        </span>
        <button
          v-if="!card.active"
          class="company-deck__select"
          type="button"
          :disabled="switching"
          :aria-label="t('home.cases.selectCompany', { company: card.company.name })"
          @click="activate(card.index)"
        >
          <span class="company-deck__label" :title="card.company.name">
            <span class="company-deck__number">{{ String(card.index + 1).padStart(2, '0') }}</span>
            <span class="company-deck__name">{{ card.company.name }}</span>
          </span>
        </button>
      </li>
    </ul>
    <div class="company-deck__navigation">
      <HomeCaseDeckNavigation
        :active-index="activeIndex"
        :count="companies.length"
        :busy="switching"
        @navigate="goTo"
      />
    </div>
  </div>
</template>

<style scoped>
.company-deck {
  --deck-step: 0.5rem;
  --deck-label-height: 1.75rem;
  --deck-label-slot: min(14rem, calc(100% / var(--deck-count)));
  --deck-top-space: calc(
    var(--deck-back-count) * var(--deck-step) + var(--deck-label-height) + 1rem
  );

  position: relative;
  padding: var(--deck-top-space) 0 1rem;
  scroll-margin-top: 1rem;
  isolation: isolate;
}

.company-deck__number {
  font-size: var(--font-size-meta);
  font-variant-numeric: tabular-nums;
  opacity: 0.65;
}

.company-deck__cards {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
}

.company-deck__card {
  --deck-card-surface: var(--card-surface);
  --deck-card-ink: var(--ink);
  --deck-rest-transform: translateY(calc(var(--deck-depth) * var(--deck-step) * -1));

  position: absolute;
  inset: 0;
  min-width: 0;
  background: var(--deck-card-surface);
  box-shadow: 0 0.5rem 2rem #0002;
  transform: var(--deck-rest-transform);
  transform-origin: top left;
  transition: background-color var(--motion-fast) ease;
}

.company-deck__card--accent {
  --deck-card-surface: var(--card-accent);
  --deck-card-ink: var(--ink-on-accent);
}

.company-deck__card:not(.company-deck__card--active) {
  border: 1px solid var(--line);
}

.company-deck__card:not(.company-deck__card--active) .company-deck__content {
  visibility: hidden;
}

.company-deck__card--active {
  position: relative;
  inset: auto;
}

.company-deck__content:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 4px;
}

.company-deck__select {
  position: absolute;
  inset: 0;
  width: 100%;
  padding: 0;
  color: var(--ink);
  background: transparent;
  border: 0;
}

.company-deck__label {
  position: absolute;
  top: calc(1px - var(--deck-label-height));
  left: calc(var(--deck-label-position) * var(--deck-label-slot));
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: calc(var(--deck-label-slot) - 0.75rem);
  height: var(--deck-label-height);
  padding: 0 0.875rem;
  font-family: var(--font-body);
  font-size: var(--font-size-meta);
  font-weight: 600;
  color: var(--deck-card-ink);
  white-space: nowrap;
  background: var(--deck-card-surface);
  border: 1px solid var(--line);
  border-bottom: 0;
  border-radius: 0.375rem 0.375rem 0 0;
  transition:
    color var(--motion-fast) ease,
    background-color var(--motion-fast) ease;
}

.company-deck__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 560px) {
  .company-deck__label {
    padding: 0 0.5rem;
    font-size: 0.75rem;
  }

  .company-deck__number {
    display: none;
  }
}

.company-deck__select:focus-visible .company-deck__label {
  outline: 3px solid var(--ink);
  outline-offset: 4px;
}

.company-deck__card:has(.company-deck__select:focus-visible) {
  --deck-card-surface: var(--card-hover);
  --deck-card-ink: var(--ink-on-card-hover);
}

.company-deck__navigation {
  position: sticky;
  bottom: 1rem;
  z-index: 10;
  width: fit-content;
  margin: 2.5rem auto 0;
}

@media (hover: hover) and (pointer: fine) {
  .company-deck__card:not(.company-deck__card--active):has(
      .company-deck__select:enabled .company-deck__label:hover
    ) {
    --deck-card-surface: var(--card-hover);
    --deck-card-ink: var(--ink-on-card-hover);
  }
}
</style>
