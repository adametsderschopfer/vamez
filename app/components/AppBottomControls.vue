<script setup lang="ts">
import type { AnchorItem } from '@/components/LiquidAnchorMenu.vue'

const { t } = useI18n()

const navItems = computed<AnchorItem[]>(() => [
  { id: 'home', to: '/', label: t('nav.im'), icon: 'User' },
  { id: 'blog', to: '/blog', label: t('nav.blog'), icon: 'FileText' }
])
</script>

<template>
  <div class="app-bottom-controls">
    <LiquidAnchorMenu :items="navItems" />
    <AppQuickMenu />
  </div>
</template>

<style scoped>
.app-bottom-controls {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  z-index: 30;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  transform: translateX(-50%);
}

@media (max-width: 960px) {
  .app-bottom-controls {
    bottom: 1rem;
    justify-content: center;
    width: calc(100% - 1rem);
  }
}

@media (max-width: 640px) {
  .app-bottom-controls {
    right: 0.5rem;
    left: 0.5rem;
    gap: 0.5rem;
    width: calc(100% - 1rem);
    transform: none;
  }
}
</style>
