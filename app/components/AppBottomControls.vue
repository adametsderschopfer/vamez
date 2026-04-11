<script setup lang="ts">
import { Languages, MoonStar, Sun } from 'lucide-vue-next'
import { useThemeMode } from '@/composables/useThemeMode'
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
  contacts: 'contacts',
} as const

const { t, locale, setLocale } = useI18n()
const activeSectionId = useState('active-section-id', () => SECTION_IDS.intro)
const { themeMode, toggleTheme } = useThemeMode()

const navItems = computed<AnchorItem[]>(() => [
  { id: SECTION_IDS.intro,      label: t('nav.im'),         icon: 'User' },
  { id: SECTION_IDS.summary,    label: t('nav.summary'),    icon: 'FileText' },
  { id: SECTION_IDS.experience, label: t('nav.experience'), icon: 'Briefcase' },
  { id: SECTION_IDS.contacts,   label: t('nav.contacts'),   icon: 'AtSign' },
])

const themeIcon = computed(() => (themeMode.value === 'dark' ? MoonStar : Sun))
const themeButtonLabel = computed(() =>
  themeMode.value === 'dark' ? t('controls.switchToLight') : t('controls.switchToDark')
)

function toggleLocale(): void {
  setLocale(locale.value === 'ru' ? 'en' : 'ru')
}
</script>

<template>
  <div class="app-bottom-controls">
    <LiquidAnchorMenu v-if="showMenu" :items="navItems" :active-id="activeSectionId" />
    <LiquidStateButton :icon="themeIcon" :label="themeButtonLabel" @click="toggleTheme" />
    <LiquidStateButton
      :icon="Languages"
      :label="t('controls.switchLanguage')"
      @click="toggleLocale"
    />
  </div>
</template>

<style scoped>
.app-bottom-controls {
  position: fixed;
  left: 50%;
  bottom: 2rem;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transform: translateX(-50%);
}

@media (max-width: 960px) {
  .app-bottom-controls {
    width: calc(100% - 1rem);
    bottom: 1rem;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .app-bottom-controls {
    width: calc(100% - 1rem);
    left: 0.5rem;
    right: 0.5rem;
    gap: 0.5rem;
    transform: none;
  }
}
</style>
