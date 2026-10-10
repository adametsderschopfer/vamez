<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { ArrowUpRight, Copy } from 'lucide-vue-next'

const { t } = useI18n()
const copyStatus = shallowRef<'copied' | 'failed' | null>(null)
let copyStatusTimer: ReturnType<typeof setTimeout> | undefined
const email = 'adametsderschopfer@yandex.ru'

const contacts = [
  {
    label: 'Telegram',
    detail: '@adametsderschopfer',
    href: 'https://t.me/adametsderschopfer',
    external: true
  },
  {
    label: 'GitHub',
    detail: 'adametsderschopfer',
    href: 'https://github.com/adametsderschopfer',
    external: true
  },
  {
    label: 'YouTube',
    detail: '@vlad_adamets',
    href: 'https://www.youtube.com/@vlad_adamets',
    external: true
  },
  {
    label: 'Email',
    detail: email,
    href: `mailto:${email}`,
    external: false
  }
] as const

async function copyEmail() {
  if (copyStatusTimer) clearTimeout(copyStatusTimer)
  copyStatus.value = null

  try {
    await navigator.clipboard.writeText(email)
    copyStatus.value = 'copied'
  } catch {
    copyStatus.value = 'failed'
  }

  copyStatusTimer = setTimeout(() => {
    copyStatus.value = null
    copyStatusTimer = undefined
  }, 2200)
}

onBeforeUnmount(() => {
  if (copyStatusTimer) clearTimeout(copyStatusTimer)
})
</script>

<template>
  <div id="home-contact-links" class="home-contact-card">
    <ul class="home-contact-card__links" :aria-label="t('home.contact.linksLabel')">
      <li v-for="contact in contacts" :key="contact.href" class="home-contact-card__item">
        <component
          :is="contact.label === 'Email' ? 'button' : 'a'"
          class="home-contact-card__link"
          :aria-label="
            contact.label === 'Email'
              ? `${contact.label}: ${contact.detail}. ${t('home.contact.copyEmail')}`
              : undefined
          "
          v-bind="
            contact.label === 'Email'
              ? { type: 'button' }
              : {
                  href: contact.href,
                  target: contact.external ? '_blank' : undefined,
                  rel: contact.external ? 'noopener noreferrer' : undefined
                }
          "
          @click="contact.label === 'Email' && copyEmail()"
        >
          <span class="home-contact-card__link-text">
            <span class="home-contact-card__link-label">{{ contact.label }}</span>
            <span class="home-contact-card__link-detail">{{ contact.detail }}</span>
            <span
              v-if="contact.label === 'Email' && copyStatus"
              class="home-contact-card__copy-status"
              aria-hidden="true"
            >
              {{ t(`home.contact.${copyStatus}`) }}
            </span>
          </span>
          <Copy
            v-if="contact.label === 'Email'"
            class="home-contact-card__link-copy"
            :size="18"
            :stroke-width="1.6"
            aria-hidden="true"
          />
          <ArrowUpRight
            v-else
            class="home-contact-card__link-arrow"
            :size="19"
            :stroke-width="1.6"
            aria-hidden="true"
          />
        </component>
      </li>
    </ul>
    <span
      class="home-contact-card__announcement"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ copyStatus ? t(`home.contact.${copyStatus}`) : '' }}
    </span>
  </div>
</template>

<style scoped>
.home-contact-card {
  --contact-row-padding: 1.25rem;

  min-width: 0;
}

.home-contact-card__links {
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.home-contact-card__item {
  min-width: 0;
  border-bottom: 1px solid var(--line);
}

.home-contact-card__link {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  min-height: 4.75rem;
  padding: var(--contact-row-padding) 0;
  color: var(--ink);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.home-contact-card__link:hover,
.home-contact-card__link:focus-visible {
  color: var(--card-accent);
}

.home-contact-card__link-text {
  display: grid;
  gap: 0.35rem;
  min-width: 0;
}

.home-contact-card__link-label {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.home-contact-card__link-detail {
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--ink-muted);
  overflow-wrap: anywhere;
}

.home-contact-card__link-arrow {
  flex: none;
  margin-left: auto;
}

.home-contact-card__link-copy {
  flex: none;
  margin-left: auto;
}

.home-contact-card__copy-status {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--card-accent);
}

.home-contact-card__announcement {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
}
</style>
