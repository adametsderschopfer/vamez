<script setup lang="ts">
import type { WorkCase } from '@/types/workCases'
import HomeCaseCard from './HomeCaseCard.vue'
import HomeCaseDeckNavigation from './HomeCaseDeckNavigation.vue'
import HomeCompanyTabs from './HomeCompanyTabs.vue'

const props = defineProps<{ companies: WorkCase[] }>()
const root = useTemplateRef<HTMLElement>('root')
const tabs = useTemplateRef<HTMLElement>('tabs')
const tabsHeight = shallowRef(0)
let tabsObserver: ResizeObserver | undefined

onMounted(() => {
  if (!tabs.value) return
  tabsHeight.value = tabs.value.offsetHeight
  tabsObserver = new ResizeObserver(() => {
    tabsHeight.value = tabs.value?.offsetHeight ?? 0
  })
  tabsObserver.observe(tabs.value)
})

onBeforeUnmount(() => tabsObserver?.disconnect())
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
    return {
      company,
      index,
      active
    }
  })
)
</script>

<template>
  <div ref="root" class="company-deck" :style="{ '--company-tabs-height': `${tabsHeight}px` }">
    <div ref="tabs" class="company-deck__tabs">
      <HomeCompanyTabs
        :companies="companies"
        :active-index="activeIndex"
        :busy="switching"
        @navigate="goTo"
      />
    </div>
    <ul class="company-deck__cards">
      <li
        v-for="card in cards"
        :key="card.company.key"
        class="company-deck__card"
        :class="{
          'company-deck__card--active': card.active,
          'company-deck__card--accent': card.company.tone === 'accent'
        }"
        :data-company-index="card.index"
      >
        <div
          class="company-deck__content"
          :inert="!card.active"
          :aria-hidden="!card.active"
          :tabindex="card.active ? 0 : -1"
          :aria-label="card.company.name"
        >
          <HomeCaseCard :company="card.company" tabbed />
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
  overflow-anchor: none;
  isolation: isolate;
}

.company-deck__tabs {
  position: sticky;
  top: var(--header-height);
  z-index: 20;
  background: var(--page-background);
}

.company-deck__cards {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  background: var(--card-surface);
}

.company-deck__card {
  --deck-card-surface: var(--card-surface);
  --deck-card-ink: var(--ink);

  display: none;
  min-width: 0;
  background: var(--deck-card-surface);
  transition: background-color var(--motion-fast) ease;
}

.company-deck__card--accent {
  --deck-card-surface: var(--card-accent);
  --deck-card-ink: var(--ink-on-accent);
}

.company-deck__card--active {
  display: block;
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
