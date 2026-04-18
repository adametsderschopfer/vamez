<script setup lang="ts">
import { BookOpenText, House, Languages, Menu, MoonStar, Sun, X } from 'lucide-vue-next'
import type { Component } from 'vue'
import { useThemeMode } from '@/composables/useThemeMode'

interface QuickMenuItem {
  to: string
  label: string
  icon: Component
}

const { t, locale, setLocale } = useI18n()
const { themeMode, toggleTheme } = useThemeMode()

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const quickMenuItems = computed<QuickMenuItem[]>(() => {
  return [
    { to: '/', label: t('nav.home'), icon: House },
    { to: '/blog', label: t('nav.blog'), icon: BookOpenText }
  ]
})

const toggleLabel = computed(() =>
  isOpen.value ? t('controls.closeMenu') : t('controls.openMenu')
)

const toggleIcon = computed(() => (isOpen.value ? X : Menu))
const themeActionIcon = computed<Component>(() => (themeMode.value === 'dark' ? MoonStar : Sun))
const themeActionLabel = computed(() =>
  themeMode.value === 'dark' ? t('controls.switchToLight') : t('controls.switchToDark')
)

function toggleMenu(): void {
  isOpen.value = !isOpen.value
}

function closeMenu(): void {
  isOpen.value = false
}

function toggleLocale(): void {
  setLocale(locale.value === 'ru' ? 'en' : 'ru')
}

function onDocumentClick(event: MouseEvent): void {
  const rootElement = rootRef.value
  if (!rootElement) return

  const eventPath = typeof event.composedPath === 'function' ? event.composedPath() : []
  if (eventPath.includes(rootElement)) return

  const target = event.target as Node | null
  if (target && rootElement.contains(target)) return

  closeMenu()
}

const route = useRoute()

function isItemActive(path: string): boolean {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <div ref="rootRef" class="quick-menu">
    <button
      class="quick-menu__toggle"
      type="button"
      :aria-expanded="isOpen"
      :aria-label="toggleLabel"
      :title="toggleLabel"
      @click="toggleMenu"
    >
      <component :is="toggleIcon" class="quick-menu__toggle-icon" :size="18" />
    </button>

    <Transition name="quick-menu-panel">
      <div v-if="isOpen" class="quick-menu__panel" role="menu" :aria-label="t('controls.openMenu')">
        <NuxtLink
          v-for="(item, index) in quickMenuItems"
          :key="item.to"
          :to="item.to"
          class="quick-menu__item"
          :class="{ 'quick-menu__item--active': isItemActive(item.to) }"
          :style="{ '--item-index': index }"
          role="menuitem"
          :aria-current="isItemActive(item.to) ? 'page' : undefined"
          @click="closeMenu"
        >
          <span class="quick-menu__item-dot" aria-hidden="true" />
          <component :is="item.icon" class="quick-menu__item-icon" :size="17" />
          <span>{{ item.label }}</span>
        </NuxtLink>

        <div class="quick-menu__divider" aria-hidden="true" />

        <div class="quick-menu__actions-row">
          <button
            class="quick-menu__action"
            type="button"
            role="menuitem"
            :aria-label="themeActionLabel"
            :title="themeActionLabel"
            :style="{ '--item-index': quickMenuItems.length }"
            @click="toggleTheme"
          >
            <component :is="themeActionIcon" class="quick-menu__item-icon" :size="17" />
          </button>

          <button
            class="quick-menu__action"
            type="button"
            role="menuitem"
            :aria-label="t('controls.switchLanguage')"
            :title="t('controls.switchLanguage')"
            :style="{ '--item-index': quickMenuItems.length + 1 }"
            @click="toggleLocale"
          >
            <Languages class="quick-menu__item-icon" :size="17" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.quick-menu {
  position: relative;
}

.quick-menu__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--liquid-control-size);
  height: var(--liquid-control-size);
  padding: 0;
  color: var(--color-text);
  cursor: pointer;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  box-shadow: 0 18px 50px var(--glass-shadow);
  backdrop-filter: blur(24px);
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.quick-menu__toggle:active {
  transform: scale(0.95);
}

.quick-menu__toggle-icon {
  flex: none;
  color: var(--color-text);
  pointer-events: none;
  opacity: 0.92;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.quick-menu__panel {
  position: absolute;
  bottom: calc(var(--liquid-control-size) + 0.45rem);
  left: 50%;
  z-index: 32;
  display: grid;
  gap: 0.35rem;
  min-width: 11rem;
  padding: 0.45rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  box-shadow: 0 18px 50px var(--glass-shadow);
  backdrop-filter: blur(24px);
  transform: translateX(-50%);
  transform-origin: center bottom;
  will-change: transform, opacity, clip-path, filter;
}

.quick-menu__item {
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
  width: 100%;
  min-height: 2.4rem;
  padding: 0 0.85rem;
  color: var(--color-text);
  text-decoration: none;
  border-radius: 0.75rem;
  transition: background-color 0.2s ease;
}

.quick-menu__action {
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
  justify-content: center;
  width: calc(50% - 0.175rem);
  min-height: 2.4rem;
  padding: 0 0.65rem;
  color: var(--color-text);
  cursor: pointer;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--glass-border) 65%, transparent);
  border-radius: 0.75rem;
  transition: background-color 0.2s ease;
}

.quick-menu__item:focus-visible,
.quick-menu__action:focus-visible {
  outline: none;
  background: color-mix(in srgb, var(--glass-border) 45%, transparent);
}

.quick-menu__item-icon {
  flex: none;
}

.quick-menu__item-dot {
  width: 0.42rem;
  height: 0.42rem;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--color-text-soft) 45%, transparent);
  border-radius: 999px;
  transition: background-color 0.2s ease;
}

.quick-menu__item--active .quick-menu__item-dot {
  background: var(--color-accent);
  border-color: color-mix(in srgb, var(--color-accent) 75%, transparent);
}

.quick-menu__divider {
  width: 100%;
  height: 1px;
  background: color-mix(in srgb, var(--glass-border) 85%, transparent);
}

.quick-menu__actions-row {
  display: flex;
  gap: 0.35rem;
  align-items: center;
  width: 100%;
}

@media (max-width: 480px) {
  .quick-menu__actions-row {
    flex-direction: column;
  }

  .quick-menu__action {
    width: 100%;
  }
}

.quick-menu-panel-enter-active,
.quick-menu-panel-leave-active {
  transition:
    opacity 0.34s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.36s ease;
}

.quick-menu-panel-enter-from,
.quick-menu-panel-leave-to {
  opacity: 0;
  filter: blur(2px) saturate(0.8);
  clip-path: inset(100% 0 0 0 round 1rem);
  transform: translateX(-50%) translateY(14px) scale(0.84);
}

.quick-menu-panel-enter-to,
.quick-menu-panel-leave-from {
  opacity: 1;
  filter: blur(0) saturate(1);
  clip-path: inset(0 0 0 0 round 1rem);
  transform: translateX(-50%) translateY(0) scale(1);
}

.quick-menu__item,
.quick-menu__action {
  opacity: 1;
  transform: translateX(0) scale(1);
}

@media (hover: hover) and (pointer: fine) {
  .quick-menu__toggle:hover {
    transform: translateY(-2px) scale(1.08);
  }

  .quick-menu__toggle:hover .quick-menu__toggle-icon {
    transform: scale(1.3) rotate(15deg);
  }

  .quick-menu__item:hover,
  .quick-menu__action:hover {
    background: color-mix(in srgb, var(--glass-border) 45%, transparent);
  }
}

.quick-menu-panel-enter-from .quick-menu__item,
.quick-menu-panel-enter-from .quick-menu__action,
.quick-menu-panel-leave-to .quick-menu__item,
.quick-menu-panel-leave-to .quick-menu__action {
  opacity: 0;
  transform: translateX(12px) scale(0.97);
}

.quick-menu-panel-enter-active .quick-menu__item,
.quick-menu-panel-enter-active .quick-menu__action {
  transition:
    opacity 0.28s ease,
    transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(40ms + (var(--item-index, 0) * 60ms));
}

.quick-menu-panel-leave-active .quick-menu__item,
.quick-menu-panel-leave-active .quick-menu__action {
  transition:
    opacity 0.18s ease,
    transform 0.22s ease;
  transition-delay: 0ms;
}
</style>
