<script setup lang="ts">
import { PhMoonStars, PhSun, PhTranslate } from '@phosphor-icons/vue'

type ThemeMode = 'light' | 'dark'

const { t, locale, setLocale } = useI18n()

const themeMode = useState<ThemeMode>('theme-mode', () => 'dark')
const activeSectionId = ref('home')

const navItems = computed(() => [
  { id: 'home', label: t('nav.home'), icon: 'User' },
  { id: 'summary', label: t('nav.summary'), icon: 'Briefcase' },
  { id: 'experience', label: t('nav.experience'), icon: 'FileText' },
  { id: 'skills', label: t('nav.skills'), icon: 'Lightning' },
  { id: 'links', label: t('nav.links'), icon: 'Link' }
])

const anchorItems = ['home', 'summary', 'experience', 'skills', 'links']

const themeIcon = computed(() => (themeMode.value === 'dark' ? PhMoonStars : PhSun))

const applyTheme = (mode: ThemeMode) => {
  if (import.meta.client) {
    document.documentElement.dataset.theme = mode
  }
}

const toggleTheme = () => {
  themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
}

const toggleLocale = () => {
  setLocale(locale.value === 'ru' ? 'en' : 'ru')
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const storedTheme = localStorage.getItem('theme-mode')
  if (storedTheme === 'light' || storedTheme === 'dark') {
    themeMode.value = storedTheme
  }

  applyTheme(themeMode.value)

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible[0]) {
        activeSectionId.value = (visible[0].target as HTMLElement).id
      }
    },
    {
      rootMargin: '-35% 0px -45% 0px',
      threshold: [0.25, 0.45, 0.7]
    }
  )

  document.querySelectorAll<HTMLElement>('[data-anchor]').forEach((sectionElement) => {
    observer?.observe(sectionElement)
  })
})

watch(themeMode, (value) => {
  if (import.meta.client) {
    localStorage.setItem('theme-mode', value)
  }

  applyTheme(value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="landing">
    <div class="landing__anchors">
      <div
        v-for="anchorId in anchorItems"
        :id="anchorId"
        :key="anchorId"
        class="landing__anchor"
        data-anchor
      />
    </div>

    <div class="landing__bottom-row">
      <LiquidAnchorMenu :items="navItems" :active-id="activeSectionId" />
      <LiquidStateButton :icon="themeIcon" @click="toggleTheme" />
      <LiquidStateButton :icon="PhTranslate" @click="toggleLocale" />
    </div>
  </div>
</template>

<style scoped>
.landing {
  position: relative;
  width: 100%;
  min-height: 500vh;
}

.landing__anchors {
  position: relative;
  min-height: 500vh;
}

.landing__anchor {
  height: 100vh;
  scroll-margin-top: 6rem;
}

.landing__bottom-row {
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
  .landing__bottom-row {
    width: calc(100% - 1rem);
    bottom: 1rem;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .landing__bottom-row {
    width: calc(100% - 1rem);
    left: 0.5rem;
    right: 0.5rem;
    gap: 0.5rem;
    transform: none;
  }

  .landing__anchor {
    height: 84vh;
  }
}
</style>
