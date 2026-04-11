<script setup lang="ts">
import { Languages, MoonStar, Sun } from 'lucide-vue-next'
import { useThemeMode } from '@/composables/useThemeMode'

const props = withDefaults(
  defineProps<{
    showMenu?: boolean
  }>(),
  {
    showMenu: false
  }
)

const introSectionId = 'intro'
const summarySectionId = 'summary'
const experienceSectionId = 'experience'
const contactsSectionId = 'contacts'

const { t, locale, setLocale } = useI18n()

const activeSectionId = useState('active-section-id', () => introSectionId)
const { themeMode, toggleTheme } = useThemeMode()

const navItems = computed(() => [
  { id: introSectionId, label: t('nav.im'), icon: 'User' },
  { id: summarySectionId, label: t('nav.summary'), icon: 'FileText' },
  { id: experienceSectionId, label: t('nav.experience'), icon: 'Briefcase' },
  { id: contactsSectionId, label: t('nav.contacts'), icon: 'AtSign' }
])
const themeIcon = computed(() => (themeMode.value === 'dark' ? MoonStar : Sun))
const themeButtonLabel = computed(() =>
  themeMode.value === 'dark' ? t('controls.switchToLight') : t('controls.switchToDark')
)

const toggleLocale = () => {
  setLocale(locale.value === 'ru' ? 'en' : 'ru')
}
</script>

<template>
  <div class="app-bottom-controls">
    <LiquidAnchorMenu v-if="props.showMenu" :items="navItems" :active-id="activeSectionId" />
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
