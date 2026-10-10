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
      <a class="home-header__link" href="#about" @click="scrollToSection('about', $event)">
        {{ t('home.summary.title') }}
      </a>
      <a class="home-header__link" href="#contacts" @click="scrollToSection('contacts', $event)">
        {{ t('home.contacts.title') }}
      </a>
    </nav>
    <SiteControls />
  </header>
</template>

<style scoped>
.home-header {
  display: flex;
  gap: var(--grid-gap);
  align-items: center;
  min-height: 6rem;
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
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
}

.home-header__link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .home-header {
    min-height: 5rem;
  }

  .home-header__nav {
    display: none;
  }

  .home-header :deep(.site-controls) {
    margin-left: auto;
  }
}
</style>
