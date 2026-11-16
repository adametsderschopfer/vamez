<script setup lang="ts">
import HomeCaseLogo from './HomeCaseLogo.vue'

const { t } = useI18n()
const track = useTemplateRef<HTMLElement>('track')
const { setHover, scrollLogos } = useMarqueeMotion(track)

const { data } = await useAsyncData('home-company-logos', () =>
  queryCollection('companies')
    .order('order', 'ASC')
    .select('key', 'name', 'url', 'logo', 'logoDark', 'logoKind', 'logoMonochrome')
    .all()
)

const companies = computed(() => [
  ...(data.value ?? []),
  {
    key: 'labteacher',
    name: t('home.companyMarquee.labteacher'),
    url: 'https://labteacher.ru/',
    logo: '/images/companies/labteacher.svg',
    logoDark: '/images/companies/labteacher.svg',
    logoKind: 'symbol' as const,
    logoMonochrome: false
  }
])
</script>

<template>
  <section class="company-marquee" aria-labelledby="company-marquee-title">
    <div class="company-marquee__header">
      <h3 id="company-marquee-title" class="company-marquee__title">
        {{ t('home.companyMarquee.title') }}
      </h3>
    </div>
    <div
      class="company-marquee__viewport"
      @pointerenter="setHover($event, true)"
      @pointerleave="setHover($event, false)"
      @wheel="scrollLogos"
    >
      <div ref="track" class="company-marquee__track">
        <ul
          v-for="copy in 2"
          :key="copy"
          class="company-marquee__group"
          :class="{ 'company-marquee__group--clone': copy === 2 }"
          :aria-hidden="copy === 2 ? true : undefined"
        >
          <li v-for="company in companies" :key="company.key" class="company-marquee__item">
            <component
              :is="company.key === 'geptop' ? 'span' : 'a'"
              class="company-marquee__logo"
              :class="{ 'company-marquee__logo--labteacher': company.key === 'labteacher' }"
              :href="company.key === 'geptop' ? undefined : company.url"
              :target="company.key === 'geptop' ? undefined : '_blank'"
              :rel="company.key === 'geptop' ? undefined : 'noopener'"
              :aria-label="company.key === 'geptop' ? undefined : company.name"
              :tabindex="copy === 2 && company.key !== 'geptop' ? -1 : undefined"
            >
              <HomeCaseLogo
                :src="company.logo"
                :src-dark="company.logoDark ?? company.logo"
                :name="company.name"
                :kind="company.logoKind"
                :monochrome="company.logoMonochrome"
                natural-size
              />
            </component>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.company-marquee {
  --marquee-width: 100cqw;
  --marquee-logo-height: clamp(2.5rem, 4vw, 3.75rem);
  --marquee-logo-max-width: min(18rem, 75cqw);
  --marquee-item-padding: clamp(1rem, 2vw, 1.75rem);
  --marquee-cycle: 42s;

  padding-block: clamp(1rem, 2vw, 1.5rem) 0.5rem;
  border-top: 1px solid var(--cases-divider);
}

.company-marquee__header {
  padding-inline: var(--cases-padding);
  margin-bottom: 0.5rem;
}

.company-marquee__title {
  margin: 0;
  font-size: clamp(1.15rem, 1.55vw, 1.5rem);
  font-weight: 600;
}

.company-marquee__viewport {
  overflow: clip;
}

.company-marquee__track {
  display: flex;
  width: max-content;
}

.company-marquee__group {
  display: flex;
  flex: none;
  justify-content: space-around;
  min-width: var(--marquee-width);
  padding: 0;
  margin: 0;
  list-style: none;
}

.company-marquee__item {
  display: grid;
  flex: none;
  place-items: center;
}

.company-marquee__logo {
  position: relative;
  display: grid;
  place-items: center;
  padding: var(--marquee-item-padding);
  color: inherit;
  text-decoration: none;
  outline-offset: -3px;
  isolation: isolate;
}

.company-marquee__logo[href]::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  content: '';
  background: radial-gradient(
    ellipse closest-side,
    color-mix(in srgb, var(--card-accent) 18%, transparent),
    transparent
  );
  opacity: var(--marquee-highlight-opacity, 0);
  transition: opacity var(--motion-state) var(--ease-out);
}

.company-marquee__logo :deep(.case-logo) {
  width: auto;
  max-width: var(--marquee-logo-max-width);
  height: auto;
  opacity: var(--marquee-logo-opacity, 0.82);
  transform: translateY(var(--marquee-logo-lift, 0));
  transition:
    opacity var(--motion-state) var(--ease-out),
    transform var(--motion-state) var(--ease-out);
}

.company-marquee__logo :deep(.case-logo__image) {
  flex-shrink: 0;
  width: auto;
  max-width: var(--marquee-logo-max-width);
  height: var(--marquee-logo-height);
  object-position: center;
}

.company-marquee__logo :deep(.case-logo--symbol) {
  flex-wrap: wrap;
}

.company-marquee__logo--labteacher :deep(.case-logo--symbol) {
  flex-wrap: nowrap;
  max-width: calc(var(--marquee-width) - 2 * var(--marquee-item-padding));
}

.company-marquee__logo--labteacher :deep(.case-logo__image) {
  width: var(--marquee-logo-height);
}

.company-marquee__logo :deep(.case-logo__name) {
  font-size: clamp(1rem, 1.8vw, 1.35rem);
}

@keyframes company-marquee-slide {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .company-marquee__viewport:not(:has(:focus-visible)) {
    mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
  }

  .company-marquee__track {
    animation: company-marquee-slide var(--marquee-cycle) linear infinite;
  }
}

.company-marquee__logo:focus-visible {
  --marquee-highlight-opacity: 1;
  --marquee-logo-opacity: 1;
}

@media (hover: hover) and (pointer: fine) {
  .company-marquee__logo[href]:hover {
    --marquee-highlight-opacity: 1;
    --marquee-logo-opacity: 1;
  }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .company-marquee__logo[href]:hover {
    --marquee-logo-lift: -4px;
  }
}

.company-marquee__viewport:has(:focus-visible) .company-marquee__track {
  animation: none;
}

.company-marquee__viewport:has(:focus-visible) .company-marquee__group {
  flex-wrap: wrap;
  width: var(--marquee-width);
}

.company-marquee__viewport:has(:focus-visible) .company-marquee__group--clone {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .company-marquee__group {
    flex-wrap: wrap;
    width: var(--marquee-width);
  }

  .company-marquee__group--clone {
    display: none;
  }
}
</style>
