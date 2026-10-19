<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { ArrowUpRight, Check, Copy } from 'lucide-vue-next'

const { t } = useI18n()
const copyStatus = shallowRef<'copied' | 'failed' | null>(null)
let copyStatusTimer: ReturnType<typeof setTimeout> | undefined
const email = 'adametsderschopfer@yandex.ru'

const contacts = [
  {
    label: 'Email',
    detail: email,
    href: `mailto:${email}`,
    external: false
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
    return
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
    <a
      class="home-contact-card__primary"
      href="https://t.me/adametsderschopfer"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="home-contact-card__primary-copy">
        <span class="home-contact-card__primary-title">{{ t('home.contact.telegramAction') }}</span>
        <span class="home-contact-card__primary-detail">{{ t('home.contact.telegramHint') }}</span>
      </span>
      <ArrowUpRight class="home-contact-card__primary-arrow" :size="40" aria-hidden="true" />
    </a>
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
            <span
              v-if="contact.label === 'Email' && copyStatus"
              class="home-contact-card__link-detail home-contact-card__copy-status"
              aria-hidden="true"
            >
              {{ t(`home.contact.${copyStatus}`) }}
            </span>
            <span v-else class="home-contact-card__link-detail">{{ contact.detail }}</span>
          </span>
          <component
            :is="copyStatus === 'copied' ? Check : Copy"
            v-if="contact.label === 'Email'"
            class="home-contact-card__link-copy"
            :size="28"
            :stroke-width="1.6"
            aria-hidden="true"
          />
          <ArrowUpRight
            v-else
            class="home-contact-card__link-arrow"
            :size="28"
            :stroke-width="1.6"
            aria-hidden="true"
          />
        </component>
      </li>
    </ul>
    <a v-if="copyStatus === 'failed'" class="home-contact-card__fallback" :href="`mailto:${email}`">
      {{ t('home.contact.emailHint') }}
    </a>
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
  --contact-row-padding: clamp(1.5rem, 3vw, 2.5rem);
  --contact-row-inset: clamp(0.75rem, 1.5vw, 1.5rem);
  --contact-row-gap: clamp(1rem, 3vw, 2.5rem);

  min-width: 0;
}

.home-contact-card__primary {
  display: flex;
  gap: var(--contact-row-gap);
  align-items: center;
  justify-content: space-between;
  min-height: 11rem;
  padding: var(--contact-row-padding);
  margin-bottom: 0.5rem;
  color: var(--ink-on-accent);
  text-decoration: none;
  background: var(--card-accent);
  transition:
    background-color var(--motion-fast) ease,
    color var(--motion-fast) ease;
}

.home-contact-card__primary-copy {
  display: grid;
  gap: 1rem;
  min-width: 0;
}

.home-contact-card__primary-title {
  font-size: clamp(1.75rem, 4vw, 3.5rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.home-contact-card__primary-detail {
  font-size: 1rem;
  line-height: 1.5;
}

.home-contact-card__primary-arrow {
  flex: none;
  transition: transform var(--motion-state) var(--ease-out);
}

.home-contact-card__primary:focus-visible {
  color: var(--page-background);
  background: var(--ink);
}

.home-contact-card__fallback {
  display: inline-block;
  padding: 1rem 0;
  color: var(--card-accent);
}

.home-contact-card__links {
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
}

.home-contact-card__item {
  min-width: 0;
  margin-bottom: 0.5rem;
  background: var(--card-surface);
}

.home-contact-card__link {
  position: relative;
  display: flex;
  gap: var(--contact-row-gap);
  align-items: center;
  width: 100%;
  min-height: 6rem;
  padding: var(--contact-row-padding) var(--contact-row-inset);
  color: var(--ink);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 0;
  transition:
    background-color var(--motion-fast) ease,
    color var(--motion-fast) ease;
}

.home-contact-card__link:focus-visible {
  color: var(--card-accent);
  background: var(--card-surface);
}

.home-contact-card__link::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 1px;
  pointer-events: none;
  content: '';
  background: var(--card-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--motion-fast) var(--ease-out);
}

.home-contact-card__link:focus-visible::after {
  transform: scaleX(1);
}

.home-contact-card__link-text {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--contact-row-gap);
  align-items: center;
  min-width: 0;
}

.home-contact-card__link-label {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.home-contact-card__link-detail {
  font-size: clamp(0.875rem, 1.4vw, 1.125rem);
  line-height: 1.4;
  color: var(--ink-muted);
  overflow-wrap: anywhere;
}

.home-contact-card__link-arrow {
  flex: none;
  margin-left: auto;
  transition: transform var(--motion-fast) var(--ease-out);
}

.home-contact-card__link-copy {
  flex: none;
  margin-left: auto;
  transition: transform var(--motion-fast) var(--ease-out);
}

.home-contact-card__copy-status {
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

@media (max-width: 600px) {
  .home-contact-card__link-text {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.5rem;
  }
}

@media (hover: hover) and (pointer: fine) {
  .home-contact-card__primary:hover {
    color: var(--page-background);
    background: var(--ink);
  }

  .home-contact-card__link:hover {
    color: var(--card-accent);
    background: var(--card-surface);
  }

  .home-contact-card__link:hover::after {
    transform: scaleX(1);
  }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .home-contact-card__primary:hover .home-contact-card__primary-arrow {
    transform: translate(0.25rem, -0.25rem);
  }

  .home-contact-card__link:hover .home-contact-card__link-arrow {
    transform: translate(0.25rem, -0.25rem);
  }

  .home-contact-card__link:hover .home-contact-card__link-copy {
    transform: rotate(-8deg);
  }
}
</style>
