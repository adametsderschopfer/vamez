<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'

const { t } = useI18n()
const { scrollToSection } = useSectionScroll()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="home-footer">
    <span class="home-footer__copyright">© {{ year }} · {{ t('footer.rightsReserved') }}</span>
    <a class="home-footer__top" href="#top" @click.prevent="scrollToSection('top')">
      {{ t('home.footer.backToTop') }}
      <ArrowUp class="home-footer__top-arrow" :size="15" :stroke-width="1.7" aria-hidden="true" />
    </a>
  </footer>
</template>

<style scoped>
.home-footer {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  min-height: 5rem;
  padding: 1rem 0;
}

.home-footer__copyright,
.home-footer__top {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--ink-muted);
}

.home-footer__top {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  color: var(--ink);
  text-decoration: none;
}

.home-footer__top-arrow {
  transition: transform 0.22s ease;
}

.home-footer__top:hover .home-footer__top-arrow,
.home-footer__top:focus-visible .home-footer__top-arrow {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .home-footer__top-arrow {
    transition: none;
  }
}
</style>
