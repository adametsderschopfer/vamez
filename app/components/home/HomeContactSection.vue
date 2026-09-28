<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { ArrowUpRight, Copy, Github, Mail, Send, X, Youtube } from 'lucide-vue-next'

const { t } = useI18n()
const isExpanded = ref(false)
const cardRef = ref<HTMLElement | null>(null)
const toggleRef = ref<HTMLButtonElement | null>(null)
const closeRef = ref<HTMLButtonElement | null>(null)
const copyStatus = ref<'copied' | 'failed' | null>(null)
let copyStatusTimer: ReturnType<typeof setTimeout> | undefined
let returnFocus: HTMLElement | null = null
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

async function setExpanded(expanded: boolean) {
  if (isExpanded.value === expanded) return
  if (expanded) {
    returnFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : toggleRef.value
  }

  const update = async () => {
    isExpanded.value = expanded
    await nextTick()
  }

  if (
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    await document.startViewTransition(update).finished
  } else {
    await update()
  }

  if (expanded) {
    closeRef.value?.focus()
  } else {
    const focusTarget = returnFocus?.isConnected ? returnFocus : toggleRef.value
    focusTarget?.focus()
    returnFocus = null
  }
}

defineExpose({ openContacts: () => setExpanded(true) })

function handleCardKeydown(event: KeyboardEvent) {
  if (!isExpanded.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    void setExpanded(false)
    return
  }

  if (event.key !== 'Tab') return

  const focusable = cardRef.value?.querySelectorAll<HTMLElement>('button, a[href]')
  if (!focusable?.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
</script>

<template>
  <section id="contacts" class="home-contact" aria-labelledby="home-contact-title">
    <div class="home-contact__invitation">
      <div class="home-contact__topline">
        <span>03 / {{ t('home.contact.eyebrow') }}</span>
        <span class="home-contact__asterisk">✳</span>
      </div>
      <div class="home-contact__message">
        <h2 id="home-contact-title" class="home-contact__title">{{ t('home.contact.title') }}</h2>
        <p class="home-contact__description">{{ t('home.contact.description') }}</p>
      </div>
      <button
        ref="toggleRef"
        class="home-contact__toggle"
        type="button"
        :aria-expanded="isExpanded"
        aria-controls="home-contact-links"
        @click="setExpanded(true)"
      >
        {{ t('home.contact.action') }}
        <ArrowUpRight
          class="home-contact__toggle-arrow"
          :size="20"
          :stroke-width="1.7"
          aria-hidden="true"
        />
      </button>
    </div>

    <div v-if="isExpanded" class="home-contact__backdrop" @click="setExpanded(false)" />

    <div
      id="home-contact-links"
      ref="cardRef"
      class="home-contact__links-card"
      :class="{ 'home-contact__links-card--expanded': isExpanded }"
      :role="isExpanded ? 'dialog' : undefined"
      :aria-modal="isExpanded ? 'true' : undefined"
      :aria-labelledby="isExpanded ? 'home-contact-links-title' : undefined"
      @keydown="handleCardKeydown"
    >
      <div class="home-contact__topline home-contact__links-heading">
        <h3 id="home-contact-links-title" class="home-contact__links-title">
          {{ t('home.contact.linksLabel') }}
        </h3>
        <button
          v-if="isExpanded"
          ref="closeRef"
          class="home-contact__close"
          type="button"
          :aria-label="t('home.contact.closeAction')"
          @click="setExpanded(false)"
        >
          <X :size="20" :stroke-width="1.7" aria-hidden="true" />
        </button>
      </div>
      <ul class="home-contact__links">
        <li
          v-for="contact in contacts"
          :key="contact.href"
          class="home-contact__item"
          :class="{ 'home-contact__item--email': contact.label === 'Email' }"
        >
          <component
            :is="contact.label === 'Email' ? 'button' : 'a'"
            class="home-contact__link"
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
            <span class="home-contact__link-icon">
              <component :is="contact.icon" :size="20" :stroke-width="1.6" aria-hidden="true" />
            </span>
            <span class="home-contact__link-text">
              <span class="home-contact__link-label">{{ contact.label }}</span>
              <span class="home-contact__link-detail">{{ contact.detail }}</span>
            </span>
            <Copy
              v-if="contact.label === 'Email'"
              class="home-contact__link-copy"
              :size="18"
              :stroke-width="1.6"
              aria-hidden="true"
            />
            <ArrowUpRight
              v-else
              class="home-contact__link-arrow"
              :size="19"
              :stroke-width="1.6"
              aria-hidden="true"
            />
            <Transition name="home-contact-copy">
              <span
                v-if="contact.label === 'Email' && copyStatus"
                class="home-contact__copy-status"
                role="status"
              >
                {{ t(`home.contact.${copyStatus}`) }}
              </span>
            </Transition>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.home-contact {
  --contact-hover-background: color-mix(in srgb, var(--card-accent) 30%, var(--card-soft));

  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(20rem, 1fr);
  gap: var(--grid-gap);
  scroll-margin-top: 1rem;
}

.home-contact__invitation,
.home-contact__links-card {
  min-height: 26rem;
  padding: clamp(1.5rem, 2.5vw, 2.3rem);
  border-radius: var(--card-radius);
}

.home-contact__invitation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--ink-on-dark);
  background: var(--card-dark);
}

.home-contact__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.home-contact__asterisk {
  font-size: 1.4rem;
  line-height: 0.7;
  color: var(--card-accent);
}

.home-contact__message {
  margin-top: clamp(1.5rem, 2.5vw, 2.3rem);
  margin-bottom: auto;
}

.home-contact__title {
  max-width: 11ch;
  margin: 0;
  font-size: clamp(2.6rem, 4.4vw, 5.5rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.08em;
}

.home-contact__description {
  max-width: 29rem;
  margin: 1rem 0 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: rgba(248, 250, 244, 0.7);
}

.home-contact__toggle {
  --selection-text: var(--ink-on-dark);
  --selection-background: var(--card-dark);

  display: inline-flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  min-height: 3.2rem;
  padding: 0 1.2rem;
  margin-top: clamp(2rem, 3vw, 3rem);
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--ink-on-accent);
  cursor: pointer;
  background: var(--card-accent);
  border: 0;
  border-radius: 999px;
}

.home-contact__toggle-arrow {
  flex: none;
  transition: transform 0.22s ease;
}

.home-contact__toggle:hover .home-contact__toggle-arrow,
.home-contact__toggle:focus-visible .home-contact__toggle-arrow {
  transform: translate(2px, -2px);
}

.home-contact__links-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--card-surface);
  view-transition-name: contact-card;
}

.home-contact__links-card--expanded {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 101;
  width: min(36rem, calc(100vw - var(--page-gutter) - var(--page-gutter)));
  max-height: calc(100dvh - var(--page-gutter) - var(--page-gutter));
  overflow-y: auto;
  transform: translate(-50%, -50%);
}

.home-contact__links-title {
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
  border-radius: 0.28em;
}

.home-contact__links-heading {
  min-height: 2.8rem;
}

.home-contact__close {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.8rem;
  height: 2.8rem;
  color: var(--ink);
  cursor: pointer;
  background: var(--card-soft);
  border: 0;
  border-radius: 50%;
}

.home-contact__links {
  display: grid;
  gap: 0.65rem;
  padding: 0;
  margin: 1.5rem 0 0;
  list-style: none;
}

.home-contact__item--email {
  padding-top: 1.25rem;
  margin-top: 0.5rem;
  border-top: 1px solid var(--line);
}

.home-contact__link {
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
  border-radius: 1rem;
  transition: background-color 0.24s ease;
}

.home-contact__link:hover,
.home-contact__link:focus-visible {
  background: var(--contact-hover-background);
}

.home-contact__link-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--card-surface);
  border-radius: 50%;
}

.home-contact__link-text {
  display: grid;
  gap: 0.15rem;
  min-width: 0;
}

.home-contact__link-label {
  font-size: 0.9rem;
  font-weight: 700;
}

.home-contact__link-detail {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.71rem;
  color: var(--ink-muted);
  white-space: nowrap;
}

.home-contact__link-arrow {
  flex: none;
  margin-left: auto;
  transition: transform 0.2s ease;
}

.home-contact__link-copy {
  flex: none;
  margin-left: auto;
}

.home-contact__copy-status {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  padding: 0.55rem 0.7rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--ink-on-accent);
  white-space: nowrap;
  background: var(--card-accent);
  border-radius: 0.65rem;
  transform: translateY(-50%);
}

.home-contact-copy-enter-active,
.home-contact-copy-leave-active {
  transition:
    opacity 0.26s ease,
    transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
}

.home-contact-copy-enter-from,
.home-contact-copy-leave-to {
  opacity: 0;
  transform: translate(0.55rem, -50%);
}

.home-contact__link:hover .home-contact__link-arrow,
.home-contact__link:focus-visible .home-contact__link-arrow {
  transform: translate(2px, -2px);
}

.home-contact__backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(8, 13, 10, 0.6);
  backdrop-filter: blur(0.4rem);
}

@media (max-width: 900px) {
  .home-contact {
    grid-template-columns: 1fr;
  }

  .home-contact__invitation,
  .home-contact__links-card {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-contact__toggle-arrow,
  .home-contact__link,
  .home-contact__link-arrow,
  .home-contact-copy-enter-active,
  .home-contact-copy-leave-active {
    transition: none;
  }
}
</style>
