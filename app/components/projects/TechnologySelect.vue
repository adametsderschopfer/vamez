<script setup lang="ts">
import { Check, ChevronDown, Layers } from 'lucide-vue-next'

const model = defineModel<string>({ required: true })
const props = defineProps<{ technologies: string[] }>()
const { t } = useI18n()
const root = useTemplateRef<HTMLElement>('root')
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const open = shallowRef(false)
const active = shallowRef(0)
const id = useId()
const options = computed(() => [
  { value: '', label: t('portfolio.technology') },
  ...props.technologies.map((value) => ({ value, label: value }))
])
const label = computed(() => model.value || t('portfolio.technology'))

function close(restoreFocus = false) {
  open.value = false
  if (restoreFocus) trigger.value?.focus()
}
async function focusOption(index: number) {
  active.value = (index + options.value.length) % options.value.length
  await nextTick()
  root.value?.querySelector<HTMLElement>(`[data-option="${active.value}"]`)?.focus()
}
async function toggle() {
  if (open.value) {
    close()
    return
  }
  open.value = true
  await focusOption(
    Math.max(
      0,
      options.value.findIndex((option) => option.value === model.value)
    )
  )
}
function select(value: string) {
  model.value = value
  close(true)
}
function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close(true)
    return
  }
  if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    event.preventDefault()
    if (!open.value) {
      void toggle()
      return
    }
    void focusOption(
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? options.value.length - 1
          : active.value + (event.key === 'ArrowDown' ? 1 : -1)
    )
  }
}
function outside(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) close()
}
function blur(event: FocusEvent) {
  if (!(event.relatedTarget instanceof Node) || !root.value?.contains(event.relatedTarget)) close()
}
onMounted(() => document.addEventListener('pointerdown', outside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', outside))
</script>

<template>
  <div ref="root" class="technology-select" @keydown="onKey" @focusout="blur">
    <button
      ref="trigger"
      type="button"
      class="technology-select__trigger"
      :class="{ 'technology-select__trigger--open': open }"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-controls="id"
      :aria-label="`${t('home.cases.technologies')}: ${label}`"
      @click="toggle"
    >
      <Layers :size="17" aria-hidden="true" /><span>{{ label }}</span
      ><ChevronDown :size="17" class="technology-select__chevron" aria-hidden="true" />
    </button>
    <Transition name="technology-menu">
      <div
        v-if="open"
        :id="id"
        class="technology-select__menu"
        role="listbox"
        :aria-label="t('home.cases.technologies')"
      >
        <button
          v-for="(option, index) in options"
          :key="option.value"
          type="button"
          role="option"
          class="technology-select__option"
          :data-option="index"
          :aria-selected="model === option.value"
          :tabindex="index === active ? 0 : -1"
          @click="select(option.value)"
        >
          <span>{{ option.label }}</span
          ><Check v-if="model === option.value" :size="16" aria-hidden="true" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.technology-select {
  position: relative;
  max-width: 100%;
}

.technology-select__trigger {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  color: var(--ink);
  cursor: pointer;
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-radius: 2rem;
  transition:
    border-color var(--motion-fast),
    background-color var(--motion-fast) ease;
}

.technology-select__trigger--open {
  border-color: var(--card-accent);
}

.technology-select__chevron {
  margin-left: 0.5rem;
  transition: transform var(--motion-fast);
}

.technology-select__trigger--open .technology-select__chevron {
  transform: rotate(180deg);
}

.technology-select__menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 8;
  width: max(100%, 16rem);
  max-width: calc(100vw - 2rem);
  max-height: min(22rem, 50dvh);
  padding: 0.5rem;
  overflow-y: auto;
  scrollbar-width: none;
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-radius: 1rem;
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 25%);
}

.technology-select__option {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.65rem 0.75rem;
  font-size: 0.875rem;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 0.5rem;
  transition: background-color var(--motion-fast) ease;
}

.technology-select__option[aria-selected='true'] {
  color: var(--card-accent);
  background: color-mix(in srgb, var(--card-accent) 10%, var(--card-surface));
}

.technology-select__option:focus-visible {
  outline: none;
  background: var(--card-soft);
}

@media (hover: hover) and (pointer: fine) {
  .technology-select__trigger:hover,
  .technology-select__option:hover {
    background: var(--card-soft);
  }
}

.technology-menu-enter-active,
.technology-menu-leave-active {
  transition:
    opacity var(--motion-fast),
    transform var(--motion-fast);
}

.technology-menu-enter-from,
.technology-menu-leave-to {
  opacity: 0;
  transform: translateY(-0.4rem);
}
</style>
