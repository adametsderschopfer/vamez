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
const footerText = computed(
  () => `${t('footer.madeWith')} ${currentYear} • ${t('footer.rightsReserved')}`
)

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

          <div class="contacts-section__item-content">
            <span class="contacts-section__item-label">{{ contact.label }}</span>
            <span class="contacts-section__item-handle">{{ contact.handle }}</span>
          </div>

          <span class="contacts-section__item-action" aria-hidden="true">
            {{ contact.external ? '↗' : '✉' }}
          </span>
        </a>
      </div>

      <p class="contacts-section__footer">{{ footerText }}</p>
    </div>
  </section>
</template>

<style scoped>
.contacts-section {
  --contacts-panel-radius: 2rem;
  --contacts-gap: 1rem;
  --contacts-item-padding: 1.1rem;
  --contacts-item-radius: 1.15rem;

  position: relative;
  padding: 0 1.25rem 8rem;
}

.contacts-section__container {
  position: relative;
  width: 100%;
  padding: clamp(1.35rem, 4vw, 2.1rem);
  overflow: hidden;
  background:
    radial-gradient(
      circle at 10% 12%,
      color-mix(in srgb, var(--color-accent) 22%, transparent),
      transparent 42%
    ),
    radial-gradient(
      circle at 100% 100%,
      color-mix(in srgb, var(--glass-border) 62%, transparent),
      transparent 40%
    ),
    color-mix(in srgb, var(--glass-bg) 72%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 92%, transparent);
  border-radius: var(--contacts-panel-radius);
  box-shadow:
    0 24px 60px color-mix(in srgb, var(--glass-shadow) 78%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--color-white) 28%, transparent);
  isolation: isolate;
  backdrop-filter: blur(16px);
}

.contacts-section__container::before,
.contacts-section__container::after {
  position: absolute;
  z-index: -1;
  content: '';
  border-radius: 999px;
}

.contacts-section__container::before {
  top: -18%;
  left: -8%;
  width: clamp(13rem, 22vw, 20rem);
  aspect-ratio: 1;
  background: color-mix(in srgb, var(--color-accent) 22%, transparent);
  filter: blur(44px);
}

.contacts-section__container::after {
  right: -16%;
  bottom: -36%;
  width: clamp(16rem, 28vw, 24rem);
  aspect-ratio: 1;
  background: color-mix(in srgb, var(--glass-border) 60%, transparent);
  filter: blur(52px);
}

.contacts-section__header {
  margin-bottom: clamp(1.2rem, 3vw, 2rem);
  opacity: 0;
  transform: translateY(16px);
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
  font-size: clamp(2.2rem, 8vw, 5.6rem);
  line-height: 0.95;
  letter-spacing: -0.035em;
}

.contacts-section__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--contacts-gap);
}

.contacts-section__item {
  position: relative;
  display: grid;
  gap: 0.95rem;
  min-height: clamp(9.5rem, 14vw, 11.2rem);
  padding: var(--contacts-item-padding);
  color: inherit;
  text-decoration: none;
  background: color-mix(in srgb, var(--glass-bg) 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 92%, transparent);
  border-radius: var(--contacts-item-radius);
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-white) 20%, transparent);
  opacity: 0;
  transform: translateY(16px) scale(0.985);
  transition:
    border-color 0.24s ease,
    box-shadow 0.24s ease,
    opacity 0.6s ease-out,
    transform 0.6s ease-out,
    background-color 0.24s ease;
}

.contacts-section__container.is-revealed .contacts-section__item {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.contacts-section__item:active {
  transform: translateY(1px) scale(0.985);
}

.contacts-section__item-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  color: var(--color-text-soft);
  background: color-mix(in srgb, var(--glass-bg) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 92%, transparent);
  border-radius: 0.95rem;
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.contacts-section__item-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.contacts-section__item-label {
  margin: 0;
  font-size: clamp(1.35rem, 2.8vw, 1.85rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--color-text);
  letter-spacing: -0.022em;
  overflow-wrap: anywhere;
}

.contacts-section__item-handle {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(0.84rem, 1.3vw, 0.97rem);
  color: var(--color-text-soft);
  white-space: nowrap;
  opacity: 0.8;
}

.contacts-section__item-action {
  place-self: end end;
  font-size: 1.35rem;
  line-height: 1;
  color: color-mix(in srgb, var(--color-accent) 88%, var(--color-text));
  opacity: 0.76;
  transition:
    opacity 0.24s ease,
    transform 0.24s ease;
}

@media (hover: hover) and (pointer: fine) {
  .contacts-section__item:hover {
    background: color-mix(in srgb, var(--glass-bg) 94%, transparent);
    border-color: color-mix(in srgb, var(--color-accent) 46%, var(--glass-border));
    box-shadow:
      0 18px 34px color-mix(in srgb, var(--glass-shadow) 65%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--color-white) 30%, transparent);
    transform: translateY(-6px);
  }

  .contacts-section__item:hover .contacts-section__item-icon {
    color: var(--color-accent);
    background: color-mix(in srgb, var(--glass-bg) 98%, transparent);
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }

  .contacts-section__item:hover .contacts-section__item-action {
    opacity: 1;
    transform: translateX(4px);
  }
}

.contacts-section__footer {
  margin: clamp(1.1rem, 2.4vw, 1.8rem) 0 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-soft);
  letter-spacing: 0.04em;
  opacity: 0.55;
}

@media (max-width: 980px) {
  .contacts-section__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .contacts-section {
    padding: 0 0.9rem 7rem;
  }

  .contacts-section__container {
    border-radius: 1.4rem;
  }

  .contacts-section__list {
    grid-template-columns: minmax(0, 1fr);
  }

  .contacts-section__item {
    min-height: 8.6rem;
  }
}
</style>
