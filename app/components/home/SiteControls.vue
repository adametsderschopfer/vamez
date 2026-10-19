<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { shallowRef } from 'vue'

const { t, locale } = useI18n()
const { themeMode, toggleTheme } = useThemeMode()
const switchLocalePath = useSwitchLocalePath()
const isMounted = shallowRef(false)

onMounted(() => {
  isMounted.value = true
})

const alternateLocale = computed(() => (locale.value === 'ru' ? 'en' : 'ru'))
const alternateLocalePath = computed(() => {
  const path = switchLocalePath(alternateLocale.value)
  // URL fragments are absent from the server request. Add them after hydration.
  return isMounted.value ? path : path.split('#')[0]
})
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
      <Sun v-if="themeMode === 'dark'" class="site-controls__icon" :size="19" :stroke-width="1.8" />
      <Moon v-else class="site-controls__icon" :size="19" :stroke-width="1.8" />
    </button>
  </div>
</template>

<style scoped>
.site-controls {
  --site-controls-size: 2.75rem;

  display: inline-flex;
  flex: none;
  align-items: center;
  color: var(--ink);
  border: 1px solid var(--line);
}

.site-controls__button {
  display: grid;
  flex: none;
  place-items: center;
  width: var(--site-controls-size);
  height: var(--site-controls-size);
  padding: 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 0;
  transition: transform var(--motion-fast) var(--ease-out);
}

.site-controls__button:focus-visible,
.site-controls__button:active {
  color: var(--ink-on-accent);
  background: var(--card-accent);
}

.site-controls__icon {
  transition: transform var(--motion-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .site-controls__button:hover {
    color: var(--ink-on-accent);
    background: var(--card-accent);
  }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .site-controls__button:hover .site-controls__icon {
    transform: rotate(20deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .site-controls__button:active {
    transform: scale(0.94);
  }
}

.site-controls__divider {
  align-self: stretch;
  width: 1px;
  background: var(--line);
}
</style>
