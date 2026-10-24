<script setup lang="ts">
import type { WorkCase } from '@/types/workCases'

const props = defineProps<{
  companies: WorkCase[]
  activeIndex: number
  busy: boolean
}>()
defineEmits<{ navigate: [index: number] }>()
const { t } = useI18n()
const row = useTemplateRef<HTMLElement>('row')

watch(
  () => props.activeIndex,
  async () => {
    await nextTick()
    const element = row.value
    const selected = element?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!element || !selected) return
    const start = selected.offsetLeft
    const end = start + selected.offsetWidth
    const visibleEnd = element.scrollLeft + element.clientWidth
    const left =
      start < element.scrollLeft ? start : end > visibleEnd ? end - element.clientWidth : null
    if (left === null) return
    element.scrollTo({
      left,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    })
  }
)
</script>

<template>
  <nav ref="row" class="company-tabs" :aria-label="t('home.cases.deckNavigation')">
    <button
      v-for="(company, index) in companies"
      :key="company.key"
      class="company-tabs__button"
      :class="{ 'company-tabs__button--active': index === activeIndex }"
      type="button"
      :disabled="busy"
      :aria-current="index === activeIndex ? 'true' : undefined"
      :aria-label="t('home.cases.selectCompany', { company: company.name })"
      @click="$emit('navigate', index)"
    >
      <span class="company-tabs__number">{{ String(index + 1).padStart(2, '0') }}</span>
      <span>{{ company.name }}</span>
    </button>
  </nav>
</template>

<style scoped>
.company-tabs {
  position: relative;
  z-index: 20;
  display: flex;
  gap: 0.375rem;
  justify-content: flex-start;
  max-width: 100%;
  padding: 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-padding-inline: 0;
  scrollbar-color: var(--line) transparent;
  scrollbar-width: thin;
}

.company-tabs__button {
  display: inline-flex;
  flex: none;
  gap: 0.625rem;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: var(--font-size-label);
  font-weight: 600;
  line-height: 1.25;
  color: var(--ink);
  white-space: nowrap;
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-bottom: 0;
  border-radius: 0;
  transition:
    color var(--motion-fast) ease,
    background-color var(--motion-fast) ease;
}

.company-tabs__button:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: -3px;
}

.company-tabs__number {
  font-size: var(--font-size-meta);
  font-variant-numeric: tabular-nums;
  opacity: 0.65;
}

@media (max-width: 799px) {
  .company-tabs__button {
    gap: 0.5rem;
    padding-inline: 0.875rem;
    font-size: 0.875rem;
  }

  .company-tabs__number {
    display: none;
  }
}

@media (hover: hover) and (pointer: fine) {
  .company-tabs__button:enabled:not(.company-tabs__button--active):hover {
    color: var(--ink-on-card-hover);
    background: var(--card-hover);
  }
}
</style>
