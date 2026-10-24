<script setup lang="ts">
import type { WorkCase } from '@/types/workCases'
import HomeCaseCard from './HomeCaseCard.vue'
import HomeCaseDeckNavigation from './HomeCaseDeckNavigation.vue'
import HomeCompanyTabs from './HomeCompanyTabs.vue'

const props = defineProps<{ companies: WorkCase[] }>()
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
    const active = index === activeIndex.value
    const depth = active ? 0 : index < activeIndex.value ? index + 1 : index
    return {
      company,
      index,
      active,
      style: { zIndex: props.companies.length - depth }
    }
  })
)
</script>

<template>
  <div ref="root" class="company-deck">
    <HomeCompanyTabs
      :companies="companies"
      :active-index="activeIndex"
      :busy="switching"
      @navigate="goTo"
    />
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
  position: relative;
  min-width: 0;
  padding-bottom: 1rem;
  scroll-margin-top: 1rem;
  isolation: isolate;
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

  position: absolute;
  inset: 0;
  min-width: 0;
  background: var(--deck-card-surface);
  transform-origin: top left;
  transition: background-color var(--motion-fast) ease;
}

.company-deck__card--accent {
  --deck-card-surface: var(--card-accent);
  --deck-card-ink: var(--ink-on-accent);
}

.company-deck__content {
  visibility: hidden;
}

.company-deck__card--active {
  position: relative;
  inset: auto;
}

.company-deck__card--active .company-deck__content,
.company-deck__card--leaving .company-deck__content {
  visibility: visible;
}

.company-deck__content:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 4px;
}

.company-deck__navigation {
  position: sticky;
  bottom: 1rem;
  z-index: 10;
  width: fit-content;
  margin: 2.5rem auto 0;
}
</style>
