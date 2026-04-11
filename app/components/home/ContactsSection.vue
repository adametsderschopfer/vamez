<script setup lang="ts">
import { Mail, Send, Github, type LucideIcon } from 'lucide-vue-next'

interface Contact {
  readonly key: string
  readonly href: string
  readonly icon: LucideIcon
  readonly label: string
  readonly handle: string
  readonly external: boolean
  readonly animDelay: string
}

const { t } = useI18n()

const currentYear = new Date().getFullYear()

const contacts: readonly Contact[] = [
  {
    key: 'telegram',
    href: 'https://t.me/adametsderschopfer',
    icon: Send,
    label: 'Telegram',
    handle: '@adametsderschopfer',
    external: true,
    animDelay: '0.2s'
  },
  {
    key: 'email',
    href: 'mailto:adametsderschopfer@yandex.ru',
    icon: Mail,
    label: 'Email',
    handle: 'adametsderschopfer@yandex.ru',
    external: false,
    animDelay: '0.35s'
  },
  {
    key: 'github',
    href: 'https://github.com/adametsderschopfer',
    icon: Github,
    label: 'GitHub',
    handle: 'adametsderschopfer',
    external: true,
    animDelay: '0.5s'
  }
]
</script>

<template>
  <section id="contacts" class="contacts-section" data-anchor>
    <div class="contacts-section__container">
      <div class="contacts-section__header">
        <h2 class="contacts-section__title">{{ t('home.contacts.title') }}</h2>
      </div>

      <div class="contacts-section__list">
        <a
          v-for="contact in contacts"
          :key="contact.key"
          :href="contact.href"
          :target="contact.external ? '_blank' : undefined"
          :rel="contact.external ? 'noreferrer' : undefined"
          class="contacts-section__item"
          :style="{ animationDelay: contact.animDelay }"
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
  margin-bottom: 3rem;
  padding: 0 70px;
  animation: fadeInUp 0.6s ease-out 0.2s forwards;
}

.contacts-section__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
}

.contacts-section__list {
  padding: 0 70px;
  display: flex;
  flex-direction: column;
}

.contacts-section__item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--glass-border);
  text-decoration: none;
  color: inherit;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contacts-section__item:first-child {
  border-top: 1px solid var(--glass-border);
}

.contacts-section__item:hover {
  transform: translateX(10px);
}

.contacts-section__item:hover .contacts-section__item-icon {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.contacts-section__item:hover .contacts-section__item-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.contacts-section__item:active {
  transform: translateX(4px) scale(0.99);
}

.contacts-section__item-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  color: var(--color-text-soft);
  flex-shrink: 0;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}

.contacts-section__item-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.contacts-section__item-platform {
  color: var(--color-text);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.contacts-section__item-handle {
  color: var(--color-text-soft);
  font-size: clamp(0.85rem, 1.3vw, 1rem);
  opacity: 0.6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contacts-section__item-arrow {
  font-size: 1.4rem;
  color: var(--color-accent);
  flex-shrink: 0;
  opacity: 0;
  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
}

.contacts-section__footer {
  margin: 3rem 0 0;
  padding: 0 70px;
  color: var(--color-text-soft);
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.4;
  letter-spacing: 0.02em;
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
