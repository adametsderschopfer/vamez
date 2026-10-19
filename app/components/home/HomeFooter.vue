<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'

const { t } = useI18n()
const { scrollToSection } = useSectionScroll()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="home-footer">
    <span class="home-footer__copyright">© {{ year }} · {{ t('footer.rightsReserved') }}</span>
    <a class="home-footer__top" href="#top" @click="scrollToSection('top', $event)">
      {{ t('home.footer.backToTop') }}
      <ArrowUp class="home-footer__top-arrow" :size="18" :stroke-width="1.7" aria-hidden="true" />
    </a>
  </footer>
</template>

<style scoped>
.home-footer {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0 2rem;
  border-top: 1px solid var(--line);
}

.home-footer__copyright,
.home-footer__top {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--ink-muted);
}

.home-footer__top {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  color: var(--ink);
  text-decoration: none;
}

.home-footer__top:focus-visible {
  color: var(--card-accent);
}

.home-footer__top-arrow {
  transition: transform var(--motion-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .home-footer__top:hover {
    color: var(--card-accent);
  }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .home-footer__top:hover .home-footer__top-arrow {
    transform: translateY(-0.25rem);
  }
}

@media (max-width: 560px) {
  .home-footer {
    align-items: flex-start;
  }

  .home-footer__copyright {
    max-width: 22ch;
  }
}
</style>
