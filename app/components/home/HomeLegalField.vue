<script setup lang="ts">
import { Check, Copy, CircleAlert } from 'lucide-vue-next'

const props = defineProps<{ label: string; value: string; datetime?: string }>()
const { t } = useI18n()
const status = ref<'copied' | 'failed' | null>(null)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyValue() {
  clearTimeout(resetTimer)
  try {
    await navigator.clipboard.writeText(props.value)
    status.value = 'copied'
  } catch {
    status.value = 'failed'
  }
  resetTimer = setTimeout(() => {
    status.value = null
  }, 2200)
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <div class="legal-field">
    <dt class="legal-field__label">{{ label }}</dt>
    <dd class="legal-field__content">
      <button
        type="button"
        class="legal-field__button"
        :class="{ 'legal-field__button--feedback': status }"
        :aria-label="t('home.legal.copy', { field: label })"
        @click="copyValue"
      >
        <time v-if="datetime" :datetime="datetime">{{ value }}</time>
        <span v-else>{{ value }}</span>
        <span class="legal-field__icon" aria-hidden="true">
          <Transition name="copy-feedback">
            <Check v-if="status === 'copied'" key="copied" :size="18" />
            <CircleAlert v-else-if="status === 'failed'" key="failed" :size="18" />
            <Copy v-else key="copy" :size="18" />
          </Transition>
        </span>
      </button>
      <span class="legal-field__status" role="status">
        {{ status ? t(`home.legal.${status}`) : '' }}
      </span>
    </dd>
  </div>
</template>

<style scoped>
.legal-field__label {
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  line-height: 1.5;
  color: var(--ink-muted);
}

.legal-field__content {
  position: relative;
  margin: 0.35rem 0 0;
}

.legal-field__button {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0;
  font: inherit;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  line-height: 1.5;
  color: var(--ink);
  text-align: left;
  overflow-wrap: anywhere;
  cursor: pointer;
  background: transparent;
  border: 0;
  transition: color var(--motion-fast) var(--ease-out);
}

.legal-field__button:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 0.25rem;
}

.legal-field__icon {
  position: relative;
  flex: 0 0 1.125rem;
  width: 1.125rem;
  height: 1.125rem;
  opacity: 0;
  transition: opacity var(--motion-fast) var(--ease-out);
}

.legal-field__icon > svg {
  position: absolute;
  inset: 0;
}

.legal-field:hover .legal-field__icon,
.legal-field__button:focus-visible .legal-field__icon,
.legal-field__button--feedback .legal-field__icon {
  opacity: 1;
}

.legal-field__button:hover,
.legal-field__button--feedback {
  color: var(--card-accent);
}

.legal-field__status {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--card-accent);
}

.copy-feedback-enter-active {
  transition:
    transform 320ms cubic-bezier(0.22, 1.5, 0.36, 1),
    opacity 160ms ease-out;
}

.copy-feedback-leave-active {
  transition:
    transform 140ms ease-in,
    opacity 140ms ease-in;
}

.copy-feedback-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-20deg);
}

.copy-feedback-leave-to {
  opacity: 0;
  transform: scale(0.6) rotate(15deg);
}

@media (hover: none) {
  .legal-field__icon {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .legal-field__button,
  .legal-field__icon,
  .copy-feedback-enter-active,
  .copy-feedback-leave-active {
    transition: none;
  }
}
</style>
