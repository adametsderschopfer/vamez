<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { ArrowUpRight, Copy, Github, Mail, Send, X, Youtube } from 'lucide-vue-next'

const { modal = false } = defineProps<{ modal?: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const cardRef = ref<HTMLElement | null>(null)
const closeRef = ref<HTMLButtonElement | null>(null)
const copyStatus = ref<'copied' | 'failed' | null>(null)
let copyStatusTimer: ReturnType<typeof setTimeout> | undefined
const email = 'adametsderschopfer@yandex.ru'

const contacts = [
  {
    label: 'Telegram',
    detail: '@adametsderschopfer',
    href: 'https://t.me/adametsderschopfer',
    icon: Send,
    external: true
  },
  {
    label: 'GitHub',
    detail: 'adametsderschopfer',
    href: 'https://github.com/adametsderschopfer',
    icon: Github,
    external: true
  },
  {
    label: 'YouTube',
    detail: '@vlad_adamets',
    href: 'https://www.youtube.com/@vlad_adamets',
    icon: Youtube,
    external: true
  },
  {
    label: 'Email',
    detail: email,
    href: `mailto:${email}`,
    icon: Mail,
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

function focusClose() {
  closeRef.value?.focus({ preventScroll: true })
}

function handleCardKeydown(event: KeyboardEvent) {
  if (!modal) return
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }
  if (event.key !== 'Tab') return
  const focusable = cardRef.value?.querySelectorAll<HTMLElement>('button, a[href]')
  if (!focusable?.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus({ preventScroll: true })
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus({ preventScroll: true })
  }
}

defineExpose({ element: cardRef, focusClose })
</script>

<template>
  <div
    :id="modal ? 'home-contact-dialog' : 'home-contact-links'"
    ref="cardRef"
    class="home-contact-card"
    :class="{ 'home-contact-card--modal': modal }"
    :role="modal ? 'dialog' : undefined"
    :aria-modal="modal ? 'true' : undefined"
    :aria-labelledby="modal ? 'home-contact-dialog-title' : undefined"
    @keydown="handleCardKeydown"
  >
    <div class="home-contact-card__topline home-contact-card__links-heading">
      <h3
        :id="modal ? 'home-contact-dialog-title' : 'home-contact-links-title'"
        class="home-contact-card__links-title"
      >
        {{ t('home.contact.linksLabel') }}
      </h3>
      <button
        v-if="modal"
        ref="closeRef"
        class="home-contact-card__close"
        type="button"
        :aria-label="t('home.contact.closeAction')"
        @click="emit('close')"
      >
        <X :size="20" :stroke-width="1.7" aria-hidden="true" />
      </button>
    </div>
    <ul class="home-contact-card__links">
      <li
        v-for="contact in contacts"
        :key="contact.href"
        class="home-contact-card__item"
        :class="{ 'home-contact-card__item--email': contact.label === 'Email' }"
      >
        <component
          :is="contact.label === 'Email' ? 'button' : 'a'"
          class="home-contact-card__link"
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
          <span class="home-contact-card__link-icon">
            <component :is="contact.icon" :size="20" :stroke-width="1.6" aria-hidden="true" />
          </span>
          <span class="home-contact-card__link-text">
            <span class="home-contact-card__link-label">{{ contact.label }}</span>
            <span class="home-contact-card__link-detail">{{ contact.detail }}</span>
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
          <Transition name="home-contact-card-copy">
            <span
              v-if="contact.label === 'Email' && copyStatus"
              class="home-contact-card__copy-status"
              role="status"
            >
              {{ t(`home.contact.${copyStatus}`) }}
            </span>
          </Transition>
        </component>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home-contact-card__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.home-contact-card {
  --contact-hover-background: color-mix(in srgb, var(--card-accent) 30%, var(--card-soft));

  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 26rem;
  padding: clamp(1.5rem, 2.5vw, 2.3rem);
  background: var(--card-surface);
  border: 1px solid var(--panel-border);
  border-radius: var(--card-radius);
}

.home-contact-card--modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 101;
  width: min(36rem, calc(100vw - var(--page-gutter) - var(--page-gutter)));
  max-height: calc(100dvh - var(--page-gutter) - var(--page-gutter));
  overflow-y: auto;
  transform: translate(-50%, -50%);
}

.home-contact-card__links-title {
  --selection-text: var(--ink-on-dark);
  --selection-background: var(--card-dark);

  padding: 0.18em 0.28em 0.22em;
  margin: -0.18em 0;
  font-family: var(--font-body);
  font-size: clamp(1.7rem, 2.2vw, 2.2rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--ink-on-accent);
  text-transform: none;
  letter-spacing: -0.065em;
  background: var(--card-accent);
  border-radius: var(--control-radius);
}

.home-contact-card__links-heading {
  min-height: 2.8rem;
}

.home-contact-card__close {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.8rem;
  height: 2.8rem;
  color: var(--ink);
  cursor: pointer;
  background: var(--card-soft);
  border: 0;
  border-radius: var(--control-radius);
}

.home-contact-card__links {
  display: grid;
  gap: 0.65rem;
  padding: 0;
  margin: 1.5rem 0 0;
  list-style: none;
}

.home-contact-card__item--email {
  padding-top: 1.25rem;
  margin-top: 0.5rem;
  border-top: 1px solid var(--line);
}

.home-contact-card__link {
  position: relative;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: 100%;
  min-height: 4.5rem;
  padding: 0.75rem;
  color: var(--ink);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  background: var(--card-soft);
  border: 0;
  border-radius: var(--control-radius);
  transition: background-color 0.24s ease;
}

.home-contact-card__link:hover,
.home-contact-card__link:focus-visible {
  background: var(--contact-hover-background);
}

.home-contact-card__link-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--card-surface);
  border-radius: var(--control-radius);
}

.home-contact-card__link-text {
  display: grid;
  gap: 0.15rem;
  min-width: 0;
}

.home-contact-card__link-label {
  font-size: 0.9rem;
  font-weight: 700;
}

.home-contact-card__link-detail {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.71rem;
  color: var(--ink-muted);
  white-space: nowrap;
}

.home-contact-card__link-arrow {
  flex: none;
  margin-left: auto;
  transition: transform 0.2s ease;
}

.home-contact-card__link-copy {
  flex: none;
  margin-left: auto;
}

.home-contact-card__copy-status {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  padding: 0.55rem 0.7rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--ink-on-accent);
  white-space: nowrap;
  background: var(--card-accent);
  border-radius: var(--control-radius);
  transform: translateY(-50%);
}

.home-contact-card-copy-enter-active,
.home-contact-card-copy-leave-active {
  transition:
    opacity 0.26s ease,
    transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
}

.home-contact-card-copy-enter-from,
.home-contact-card-copy-leave-to {
  opacity: 0;
  transform: translate(0.55rem, -50%);
}

.home-contact-card__link:hover .home-contact-card__link-arrow,
.home-contact-card__link:focus-visible .home-contact-card__link-arrow {
  transform: translate(2px, -2px);
}

@media (max-width: 900px) {
  .home-contact-card {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-contact-card__link,
  .home-contact-card__link-arrow,
  .home-contact-card-copy-enter-active,
  .home-contact-card-copy-leave-active {
    transition: none;
  }
}
</style>
