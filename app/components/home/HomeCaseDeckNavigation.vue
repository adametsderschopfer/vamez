<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

defineProps<{ activeIndex: number; count: number }>()
defineEmits<{ navigate: [index: number] }>()
const { t } = useI18n()
</script>

<template>
  <nav class="case-navigation" :aria-label="t('home.cases.deckNavigation')">
    <button
      class="case-navigation__button"
      type="button"
      :disabled="activeIndex === 0"
      :aria-label="t('home.cases.previousCompany')"
      @click="$emit('navigate', activeIndex - 1)"
    >
      <ArrowLeft :size="22" aria-hidden="true" />
    </button>
    <span class="case-navigation__count">
      {{ String(activeIndex + 1).padStart(2, '0') }}
      <span class="case-navigation__total">/ {{ String(count).padStart(2, '0') }}</span>
    </span>
    <button
      class="case-navigation__button"
      type="button"
      :disabled="activeIndex === count - 1"
      :aria-label="t('home.cases.nextCompany')"
      @click="$emit('navigate', activeIndex + 1)"
    >
      <ArrowRight :size="22" aria-hidden="true" />
    </button>
  </nav>
</template>

<style scoped>
.case-navigation {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.375rem;
  color: var(--ink);
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-radius: 4rem;
  box-shadow: 0 0.5rem 2rem #0002;
}

.case-navigation__button {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 50%;
  transition:
    color var(--motion-fast) ease,
    background-color var(--motion-fast) ease;
}

.case-navigation__button:disabled {
  opacity: 0.25;
}

.case-navigation__button:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}

.case-navigation__count {
  min-width: 5rem;
  font-size: var(--font-size-label);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.case-navigation__total {
  color: var(--ink-muted);
}

@media (hover: hover) {
  .case-navigation__button:enabled:hover {
    color: var(--ink-on-accent);
    background: var(--card-accent);
  }
}
</style>
