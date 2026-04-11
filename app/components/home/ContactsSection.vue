<script setup lang="ts">
import { Mail, Send, Github, type LucideIcon } from 'lucide-vue-next'

interface Contact {
  readonly key: string
  readonly href: string
  readonly icon: LucideIcon
  readonly label: string
  readonly handle: string
  readonly external: boolean
}

const { t } = useI18n()
const { containerRef, isRevealed } = useScrollReveal()

const currentYear = new Date().getFullYear()

const contacts: readonly Contact[] = [
  {
    key: 'telegram',
    href: 'https://t.me/adametsderschopfer',
    icon: Send,
    label: 'Telegram',
    handle: '@adametsderschopfer',
    external: true
  },
  {
    key: 'email',
    href: 'mailto:adametsderschopfer@yandex.ru',
    icon: Mail,
    label: 'Email',
    handle: 'adametsderschopfer@yandex.ru',
    external: false
  },
  {
    key: 'github',
    href: 'https://github.com/adametsderschopfer',
    icon: Github,
    label: 'GitHub',
    handle: 'adametsderschopfer',
    external: true
  }
]
</script>

<template>
  <section id="contacts" ref="containerRef" class="contacts-section" data-anchor>
    <div class="contacts-section__container" :class="{ 'is-revealed': isRevealed }">
      <div class="contacts-section__header">
        <h2 class="contacts-section__title">{{ t('home.contacts.title') }}</h2>
      </div>

      <div class="contacts-section__list">
        <a
          v-for="(contact, i) in contacts"
          :key="contact.key"
          :href="contact.href"
          :target="contact.external ? '_blank' : undefined"
          :rel="contact.external ? 'noreferrer' : undefined"
          class="contacts-section__item"
          :style="{ transitionDelay: `${0.2 + i * 0.12}s` }"
        >
          <div class="contacts-section__item-icon">
            <component :is="contact.icon" :size="22" />
          </div>
          <div class="contacts-section__item-body">
            <span class="contacts-section__item-platform">{{ contact.label }}</span>
            <span class="contacts-section__item-handle">{{ contact.handle }}</span>
          </div>
          <span class="contacts-section__item-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <p class="contacts-section__footer">{{ t('footer.madeWith') }} {{ currentYear }}</p>
    </div>
  </section>
</template>

<style scoped>
.contacts-section {
  position: relative;
  padding: 0 20px;
  padding-bottom: 8rem;
}

.contacts-section__container {
  padding: clamp(2rem, 6vw, 4rem) 0;
}

.contacts-section__header {
  padding: 0 70px;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.contacts-section__container.is-revealed .contacts-section__header {
  opacity: 1;
  transform: translateY(0);
}

.contacts-section__title {
  margin: 0;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
}

.contacts-section__list {
  display: flex;
  flex-direction: column;
  padding: 0 70px;
}

.contacts-section__item {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: 1.75rem 1rem;
  margin: 0 -1rem;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--glass-border);
  border-radius: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out,
    background-color 0.25s ease;
}

.contacts-section__container.is-revealed .contacts-section__item {
  opacity: 1;
  transform: translateY(0);
}

.contacts-section__item:first-child {
  border-top: 1px solid var(--glass-border);
}

.contacts-section__item:hover {
  background: var(--glass-bg);
  transform: translateY(0) translateX(6px);
}

.contacts-section__item:hover .contacts-section__item-icon {
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 12%, transparent);
  border-color: var(--color-accent);
}

.contacts-section__item:hover .contacts-section__item-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.contacts-section__item:active {
  transform: translateX(2px) scale(0.99);
}

.contacts-section__item-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: var(--color-text-soft);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.contacts-section__item-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.contacts-section__item-platform {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.contacts-section__item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(0.85rem, 1.3vw, 1rem);
  color: var(--color-text-soft);
  white-space: nowrap;
  opacity: 0.6;
}

.contacts-section__item-arrow {
  flex-shrink: 0;
  font-size: 1.4rem;
  color: var(--color-accent);
  opacity: 0;
  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
}

.contacts-section__footer {
  padding: 0 70px;
  margin: 3rem 0 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-soft);
  letter-spacing: 0.02em;
  opacity: 0.4;
}

@media (max-width: 768px) {
  .contacts-section__header,
  .contacts-section__list,
  .contacts-section__footer {
    padding: 0 20px;
  }

  .contacts-section__item-platform {
    font-size: clamp(1.2rem, 5vw, 1.5rem);
  }
}

@media (max-width: 640px) {
  .contacts-section {
    padding: 0 14px;
    padding-bottom: 7rem;
  }
}
</style>
