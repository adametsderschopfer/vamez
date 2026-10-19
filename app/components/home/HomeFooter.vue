<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'

const { t } = useI18n()
const { scrollToSection } = useSectionScroll()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="home-footer">
    <div class="home-footer__wordmark" aria-hidden="true">vamez.</div>
    <div class="home-footer__meta">
      <span class="home-footer__copyright">© {{ year }} · {{ t('footer.rightsReserved') }}</span>
      <a class="home-footer__top" href="#top" @click="scrollToSection('top', $event)">
        {{ t('home.footer.backToTop') }}
        <ArrowUp class="home-footer__top-arrow" :size="18" :stroke-width="1.7" aria-hidden="true" />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.home-footer {
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
  padding: 0 0 2rem;
  overflow: clip;
}

.home-footer__wordmark {
  margin-left: -0.04em;
  font-size: clamp(5rem, 28vw, 32rem);
  font-weight: 800;
  line-height: 0.85;
  letter-spacing: -0.075em;
}

.home-footer__meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
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
  .home-footer__meta {
    align-items: flex-start;
  }

  .home-footer__copyright {
    max-width: 22ch;
  }
}
</style>
