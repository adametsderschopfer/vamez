<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import type { Component } from 'vue'
import { useThemeMode } from '@/composables/useThemeMode'

const { t, locale } = useI18n()
const { themeMode, toggleTheme } = useThemeMode()
const switchLocalePath = useSwitchLocalePath()

const languageCode = computed(() => locale.value.toUpperCase())
const alternateLocale = computed(() => (locale.value === 'ru' ? 'en' : 'ru'))
const alternateLocalePath = computed(() => switchLocalePath(alternateLocale.value))
const themeIcon = computed<Component>(() => (themeMode.value === 'dark' ? Sun : Moon))
const themeActionLabel = computed(() =>
  themeMode.value === 'dark' ? t('controls.switchToLight') : t('controls.switchToDark')
)
</script>

<template>
  <header class="home-header">
    <nav class="home-header__navigation" :aria-label="t('nav.sectionNavigation')">
      <NuxtLink
        class="home-header__control home-header__language-control"
        :aria-label="t('controls.switchLanguage')"
        :title="t('controls.switchLanguage')"
        :to="alternateLocalePath"
      >
        {{ languageCode }}
      </NuxtLink>

      <button
        class="home-header__control home-header__theme-control"
        type="button"
        :aria-label="themeActionLabel"
        :title="themeActionLabel"
        @click="toggleTheme"
      >
        <component :is="themeIcon" :size="20" stroke-width="1.8" />
      </button>
    </nav>
  </header>
</template>

<style scoped>
.home-header {
  --home-header-space: clamp(1.25rem, 3vw, 2.5rem);

  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding: var(--home-header-space);
}

.home-header__navigation {
  display: flex;
  gap: clamp(0.8rem, 1.7vw, 1.65rem);
  align-items: center;
}

.home-header__control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  padding: 0;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 0;
  transition: opacity 0.2s ease;
}

.home-header__control:hover {
  opacity: 0.55;
}

.home-header__control:focus-visible {
  outline: 1px solid currentcolor;
  outline-offset: 0.35rem;
}

.home-header__language-control {
  min-width: 2.25rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.home-header__theme-control {
  width: 2rem;
}

@media (max-width: 480px) {
  .home-header {
    padding: 1.25rem;
  }

  .home-header__navigation {
    gap: 1rem;
  }

  .home-header__control {
    font-size: 0.9rem;
  }

  .home-header__language-control {
    font-size: 0.74rem;
  }
}
</style>
