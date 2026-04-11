<script setup lang="ts">
import { Mail, Send, Github } from 'lucide-vue-next'

const { t } = useI18n()

const currentYear = new Date().getFullYear()

const contacts = [
  {
    key: 'telegram',
    href: 'http://t.me/adametsderschopfer',
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
  <section id="contacts" class="contacts-section" data-anchor>
    <div class="contacts-section__container">
      <div class="contacts-section__panel">
        <div class="contacts-section__inner">
          <h2 class="contacts-section__title">{{ t('home.contacts.title') }}</h2>

          <div class="contacts-section__grid">
            <a
              v-for="contact in contacts"
              :key="contact.key"
              :href="contact.href"
              :target="contact.external ? '_blank' : undefined"
              :rel="contact.external ? 'noreferrer' : undefined"
              class="contacts-section__card"
            >
              <div class="contacts-section__card-icon">
                <component :is="contact.icon" :size="28" />
              </div>
              <div class="contacts-section__card-body">
                <span class="contacts-section__card-label">{{ contact.label }}</span>
                <span class="contacts-section__card-handle">{{ contact.handle }}</span>
              </div>
              <div class="contacts-section__card-arrow">→</div>
            </a>
          </div>

          <p class="contacts-section__footer">
            {{ t('footer.madeWith') }} {{ currentYear }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts-section {
  padding: 0 20px;
  padding-bottom: 8rem;
}

.contacts-section__container {
  padding: clamp(2rem, 6vw, 4rem) 0;
}

.contacts-section__panel {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--glass-border) 82%, rgba(255, 255, 255, 0.08));
  border-radius: 2rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 24px 70px var(--glass-shadow);
  backdrop-filter: blur(28px);
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.contacts-section__panel::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(110deg, rgba(255, 255, 255, 0.05), transparent 34%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.08), transparent 36%);
  content: '';
  pointer-events: none;
}

.contacts-section__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: clamp(2rem, 6vw, 4rem);
}

.contacts-section__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
}

.contacts-section__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.contacts-section__card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 1.75rem;
  border-radius: 1.25rem;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.03);
  text-decoration: none;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

.contacts-section__card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: var(--color-accent);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.contacts-section__card:hover .contacts-section__card-icon {
  color: var(--color-accent);
  transform: scale(1.15) rotate(8deg);
}

.contacts-section__card:hover .contacts-section__card-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.contacts-section__card:active {
  transform: translateY(0) scale(0.98);
}

.contacts-section__card-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-soft);
  transition: color 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contacts-section__card-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
}

.contacts-section__card-label {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

.contacts-section__card-handle {
  color: var(--color-text-soft);
  font-size: 0.85rem;
  font-weight: 400;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contacts-section__card-arrow {
  flex-shrink: 0;
  color: var(--color-accent);
  font-size: 1.1rem;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.25s ease;
}

.contacts-section__footer {
  margin: 0;
  color: var(--color-text-soft);
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.5;
  letter-spacing: 0.02em;
}

@media (max-width: 900px) {
  .contacts-section__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .contacts-section {
    padding: 0 14px;
    padding-bottom: 7rem;
  }

  .contacts-section__panel {
    border-radius: 1.5rem;
  }

  .contacts-section__card {
    padding: 1.25rem;
  }
}
</style>
