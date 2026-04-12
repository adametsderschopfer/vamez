<script setup lang="ts">
import type { AnchorItem } from '@/components/LiquidAnchorMenu.vue'

withDefaults(
  defineProps<{
    showMenu?: boolean
  }>(),
  { showMenu: false }
)

const SECTION_IDS = {
  intro: 'intro',
  summary: 'summary',

  experience: 'experience',
  contacts: 'contacts'
} as const

const { t } = useI18n()
const activeSectionId = useState('active-section-id', () => SECTION_IDS.intro)

const navItems = computed<AnchorItem[]>(() => [
  { id: SECTION_IDS.intro, label: t('nav.im'), icon: 'User' },
  { id: SECTION_IDS.summary, label: t('nav.summary'), icon: 'FileText' },

  // { id: SECTION_IDS.experience, label: t('nav.experience'), icon: 'Briefcase' },
  { id: SECTION_IDS.contacts, label: t('nav.contacts'), icon: 'AtSign' }
])
</script>

<template>
  <div class="app-bottom-controls">
    <LiquidAnchorMenu v-if="showMenu" :items="navItems" :active-id="activeSectionId" />
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
