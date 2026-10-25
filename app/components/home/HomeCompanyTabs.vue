<script setup lang="ts">
import type { WorkCase } from '@/types/workCases'
import HomeCaseLogo from './HomeCaseLogo.vue'

const props = defineProps<{
  companies: WorkCase[]
  activeIndex: number
}>()
defineEmits<{ navigate: [index: number] }>()
const { t } = useI18n()
const row = useTemplateRef<HTMLElement>('row')
const tabLogos = computed(() =>
  props.companies.map((company) => {
    if (company.key !== 'mozen') {
      return { src: company.logo, srcDark: company.logoDark, kind: company.logoKind }
    }
    return {
      src: '/images/companies/mozen-mark-ink.svg',
      srcDark: '/images/companies/mozen-mark.svg',
      kind: 'symbol' as const
    }
  })
)

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
      :class="{
        'company-tabs__button--active': index === activeIndex,
        'company-tabs__button--accent': index === activeIndex && company.tone === 'accent'
      }"
      type="button"
      :aria-current="index === activeIndex ? 'true' : undefined"
      :aria-label="t('home.cases.selectCompany', { company: company.name })"
      @click="$emit('navigate', index)"
    >
      <span
        v-if="tabLogos[index]?.src"
        class="company-tabs__logo"
        :class="{ 'company-tabs__logo--symbol': tabLogos[index]?.kind === 'symbol' }"
        aria-hidden="true"
      >
        <HomeCaseLogo
          :src="tabLogos[index]?.src"
          :src-dark="tabLogos[index]?.srcDark"
          :kind="tabLogos[index]?.kind"
          :monochrome="company.logoMonochrome"
          :name="company.name"
          compact
        />
      </span>
      <span>{{ company.name }}</span>
    </button>
  </nav>
</template>

<style scoped>
.company-tabs {
  --tab-logo-gap: 0.625rem;
  --tab-idle-surface: color-mix(in srgb, var(--card-surface) 70%, var(--page-background));
  --tab-idle-ink: color-mix(in srgb, var(--ink) 72%, var(--card-surface));
  --tab-idle-border: color-mix(in srgb, var(--line) 75%, var(--page-background));
  --tab-contact-shadow: rgb(0 0 0 / 18%);

  position: relative;
  z-index: 20;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  max-width: 100%;
  padding: 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-padding-inline: 0;
  scrollbar-width: none;
  background: linear-gradient(var(--line), var(--line)) bottom / 100% 1px no-repeat;
}

.company-tabs::-webkit-scrollbar {
  display: none;
}

.company-tabs__button {
  display: inline-flex;
  flex: none;
  gap: 0;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: var(--font-size-label);
  font-weight: 600;
  line-height: 1.25;
  color: var(--tab-idle-ink);
  white-space: nowrap;
  background: var(--tab-idle-surface);
  border: 1px solid var(--tab-idle-border);
  border-radius: 0;
  box-shadow: inset 0 -0.375rem 0.5rem -0.375rem var(--tab-contact-shadow);
  transition:
    color var(--motion-fast) ease,
    background-color var(--motion-fast) ease;
}

.company-tabs__button--active {
  color: var(--ink);
  background: var(--card-surface);
  border-color: var(--line);
  border-bottom-color: transparent;
  box-shadow: none;
}

.company-tabs__button--accent {
  color: var(--ink-on-accent);
  background: var(--card-accent);
}

.company-tabs__button:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: -3px;
}

.company-tabs__logo {
  --tab-logo-width: 3.5rem;

  display: inline-flex;
  flex: none;
  align-items: center;
  width: calc(var(--tab-logo-width) + var(--tab-logo-gap));
  height: 1.5rem;
  overflow: hidden;
  opacity: 1;
  transition:
    width var(--motion-fast) ease,
    opacity var(--motion-fast) ease;
}

.company-tabs__logo--symbol {
  --tab-logo-width: 1.5rem;
}

.company-tabs__button--active .company-tabs__logo {
  width: 0;
  opacity: 0;
}

@media (max-width: 799px) {
  .company-tabs {
    --tab-logo-gap: 0.5rem;
  }

  .company-tabs__button {
    padding-inline: 0.875rem;
    font-size: 0.875rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .company-tabs__logo {
    transition: none;
  }
}

@media (hover: hover) and (pointer: fine) {
  .company-tabs__button:enabled:not(.company-tabs__button--active):hover {
    color: var(--ink-on-card-hover);
    background: var(--card-hover);
  }
}
</style>
