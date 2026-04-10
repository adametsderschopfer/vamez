<script setup lang="ts">
import { BriefcaseBusiness, FileText, Link2, User, Zap } from 'lucide-vue-next'

type MenuIcon = 'User' | 'Briefcase' | 'FileText' | 'Lightning' | 'Link'

type AnchorItem = {
  id: string
  label: string
  icon: MenuIcon
}

const props = defineProps<{
  items: AnchorItem[]
  activeId: string
}>()

const { t } = useI18n()

const iconMap = {
  User,
  Briefcase: BriefcaseBusiness,
  FileText,
  Lightning: Zap,
  Link: Link2
} satisfies Record<MenuIcon, object>
</script>

<template>
  <nav class="liquid-menu" :aria-label="t('nav.sectionNavigation')">
    <a
      v-for="item in props.items"
      :key="item.id"
      class="liquid-menu__item"
      :class="{ 'liquid-menu__item--active': props.activeId === item.id }"
      :href="`#${item.id}`"
      :aria-current="props.activeId === item.id ? 'page' : undefined"
    >
      <component :is="iconMap[item.icon]" class="liquid-menu__icon" :size="18" aria-hidden="true" />
      <span class="liquid-menu__label">{{ item.label }}</span>
    </a>
  </nav>
</template>

<style scoped>
.liquid-menu {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: var(--liquid-control-size);
  padding: var(--liquid-control-inset);
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(24px);
  box-shadow: 0 18px 42px var(--glass-shadow);
}

.liquid-menu__item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: calc(var(--liquid-control-size) - (var(--liquid-control-inset) * 2));
  padding: 0 1rem;
  border-radius: 999px;
  text-decoration: none;
  color: var(--color-text-soft);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.liquid-menu__item:hover {
  transform: translateY(-1px) scale(1.015);
}

.liquid-menu__item:active {
  transform: scale(0.975);
}

.liquid-menu__item--active {
  background: rgba(255, 255, 255, 0.94);
  color: #231b15;
}

.liquid-menu__icon {
  flex: none;
  opacity: 0.92;
}

.liquid-menu__label {
  font-size: clamp(0.74rem, 1vw, 0.9rem);
  font-weight: 600;
  white-space: nowrap;
}

@media (max-width: 960px) {
  .liquid-menu {
    width: 100%;
    overflow-x: auto;
    justify-content: flex-start;
  }
}
</style>
