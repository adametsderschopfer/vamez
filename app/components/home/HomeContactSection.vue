<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import HomeContactCard from './HomeContactCard.vue'
import HomeContactDialog from './HomeContactDialog.vue'

defineOptions({ inheritAttrs: false })

const { t } = useI18n()
const isExpanded = ref(false)
const toggleRef = ref<HTMLButtonElement | null>(null)
const dialogRef = ref<InstanceType<typeof HomeContactDialog> | null>(null)
let isClosing = false
let returnFocus: HTMLElement | null = null

async function setExpanded(expanded: boolean) {
  if (isClosing || isExpanded.value === expanded) return
  if (expanded) {
    returnFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : toggleRef.value
    isExpanded.value = true
    return
  }
  isClosing = true
  const completed = await dialogRef.value?.animateClose()
  if (completed === false) return
  isExpanded.value = false
  await nextTick()
  isClosing = false
  const focusTarget = returnFocus?.isConnected ? returnFocus : toggleRef.value
  focusTarget?.focus({ preventScroll: true })
  returnFocus = null
}

defineExpose({ openContacts: () => setExpanded(true) })
</script>

<template>
  <section id="contacts" class="home-contact" aria-labelledby="home-contact-title" v-bind="$attrs">
    <div class="home-contact__invitation">
      <div class="home-contact__message">
        <div class="home-contact__message-heading">
          <h2 id="home-contact-title" class="home-contact__title">{{ t('home.contact.title') }}</h2>
          <span class="home-contact__asterisk" aria-hidden="true">✳</span>
        </div>
        <p class="home-contact__description">{{ t('home.contact.description') }}</p>
      </div>
      <button
        ref="toggleRef"
        class="home-contact__toggle"
        type="button"
        :aria-expanded="isExpanded"
        aria-controls="home-contact-dialog"
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

    <HomeContactCard />
  </section>
  <HomeContactDialog v-if="isExpanded" ref="dialogRef" @close="setExpanded(false)" />
</template>

<style scoped>
.home-contact {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(20rem, 1fr);
  gap: var(--grid-gap);
  scroll-margin-top: 1rem;
}

.home-contact__invitation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 26rem;
  padding: clamp(1.5rem, 2.5vw, 2.3rem);
  color: var(--ink-on-dark);
  background: var(--card-dark);
  border: 1px solid var(--panel-border);
  border-radius: var(--card-radius);
}

.home-contact__asterisk {
  flex: none;
  margin-left: auto;
  font-size: 1.4rem;
  line-height: 0.7;
  color: var(--card-accent);
}

.home-contact__message {
  width: 100%;
  margin-bottom: auto;
}

.home-contact__message-heading {
  display: flex;
  gap: var(--grid-gap);
  align-items: flex-start;
  justify-content: space-between;
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
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--ink-on-accent);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
  background: var(--card-accent);
  border: 0;
  border-radius: var(--control-radius);
}

.home-contact__toggle-arrow {
  flex: none;
  transition: transform 0.22s ease;
}

.home-contact__toggle:hover .home-contact__toggle-arrow,
.home-contact__toggle:focus-visible .home-contact__toggle-arrow {
  transform: translate(2px, -2px);
}

@media (max-width: 900px) {
  .home-contact {
    grid-template-columns: 1fr;
  }

  .home-contact__invitation {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-contact__toggle-arrow {
    transition: none;
  }
}
</style>
