<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const { t, locale } = useI18n()
const { themeMode, toggleTheme } = useThemeMode()
const switchLocalePath = useSwitchLocalePath()

const alternateLocale = computed(() => (locale.value === 'ru' ? 'en' : 'ru'))
const alternateLocalePath = computed(() => switchLocalePath(alternateLocale.value))
const themeActionLabel = computed(() =>
  themeMode.value === 'dark' ? t('controls.switchToLight') : t('controls.switchToDark')
)
</script>

<template>
  <div class="site-controls">
    <NuxtLink
      class="site-controls__button"
      :aria-label="t('controls.switchLanguage')"
      :title="t('controls.switchLanguage')"
      :to="alternateLocalePath"
    >
      {{ locale.toUpperCase() }}
    </NuxtLink>
    <span class="site-controls__divider" aria-hidden="true" />
    <button
      class="site-controls__button"
      type="button"
      :aria-label="themeActionLabel"
      :title="themeActionLabel"
      @click="toggleTheme"
    >
      <Sun v-if="themeMode === 'dark'" :size="19" :stroke-width="1.8" />
      <Moon v-else :size="19" :stroke-width="1.8" />
    </button>
  </div>
</template>

<style scoped>
.site-controls {
  --site-controls-size: 2.55rem;
  --site-controls-tint: color-mix(in srgb, var(--ink-on-accent) 10%, transparent);

  display: inline-flex;
  align-items: center;
  padding: 0.18rem;
  color: var(--ink-on-accent);
  background: var(--site-controls-tint);
  border: 1px solid color-mix(in srgb, var(--ink-on-accent) 13%, transparent);
  border-radius: 999px;
}

.site-controls__button {
  display: grid;
  flex: none;
  place-items: center;
  width: var(--site-controls-size);
  height: var(--site-controls-size);
  padding: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.site-controls__button:hover,
.site-controls__button:focus-visible {
  background: var(--site-controls-tint);
}

.site-controls__divider {
  flex: none;
  width: 1px;
  height: 1.2rem;
  background: color-mix(in srgb, var(--ink-on-accent) 25%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .site-controls__button {
    transition: none;
  }
}
</style>
