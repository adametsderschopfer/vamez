<script setup lang="ts">
import SiteControls from './SiteControls.vue'

const { t } = useI18n()
const { scrollToSection } = useSectionScroll()
</script>

<template>
  <header class="home-header">
    <a
      class="home-header__brand"
      href="#top"
      :aria-label="`Vamez — ${t('home.footer.backToTop')}`"
      @click="scrollToSection('top', $event)"
    >
      vamez<span class="home-header__brand-dot">.</span>
    </a>
    <nav class="home-header__nav" :aria-label="t('home.navigation')">
      <a class="home-header__link" href="#contacts" @click="scrollToSection('contacts', $event)">
        {{ t('home.contacts.title') }}
      </a>
    </nav>
    <SiteControls />
  </header>
</template>

<style scoped>
.home-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: var(--grid-gap);
  align-items: center;
  min-height: var(--header-height);
  background: var(--page-background);
  border-bottom: 1px solid var(--ink);
}

.home-header__brand {
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1;
  color: var(--ink);
  letter-spacing: -0.04em;
  text-decoration: none;
}

.home-header__brand:hover,
.home-header__brand:focus-visible {
  color: var(--card-accent);
}

.home-header__brand-dot {
  color: var(--card-accent);
}

.home-header__nav {
  display: flex;
  gap: clamp(1rem, 3vw, 3rem);
  align-items: center;
  margin-left: auto;
}

.home-header__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
}

.home-header__link::after {
  position: absolute;
  right: 0;
  bottom: 0.4rem;
  left: 0;
  height: 1px;
  content: '';
  background: var(--card-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--motion-fast) var(--ease-out);
}

.home-header__link:focus-visible::after {
  transform: scaleX(1);
}

@media (hover: hover) and (pointer: fine) {
  .home-header__link:hover {
    color: var(--card-accent);
  }

  .home-header__link:hover::after {
    transform: scaleX(1);
  }
}

@media (max-width: 600px) {
  .home-header__nav {
    display: none;
  }

  .home-header :deep(.site-controls) {
    margin-left: auto;
  }
}
</style>
