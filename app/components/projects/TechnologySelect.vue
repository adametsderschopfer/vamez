<script setup lang="ts">
import { ChevronDown, Layers } from 'lucide-vue-next'

const model = defineModel<string[]>({ required: true })
const props = defineProps<{ technologies: string[] }>()
const { t } = useI18n()
const root = useTemplateRef<HTMLElement>('root')
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const search = useTemplateRef<HTMLInputElement>('search')
defineExpose({ focus: () => trigger.value?.focus() })
const open = shallowRef(false)
const query = shallowRef('')
const id = useId()
const options = computed(() => {
  const searchTerm = query.value.trim().toLocaleLowerCase()
  return props.technologies.filter((technology) =>
    technology.toLocaleLowerCase().includes(searchTerm)
  )
})
const label = computed(() =>
  model.value.length
    ? t('portfolio.selectedTechnologies', { count: model.value.length })
    : t('portfolio.technology')
)

function close() {
  open.value = false
}

function escape(event: KeyboardEvent) {
  if (!open.value) return
  event.preventDefault()
  close()
  trigger.value?.focus()
}

async function toggle() {
  if (open.value) {
    close()
    return
  }

  query.value = ''
  open.value = true
  await nextTick()
  search.value?.focus()
}

function clear() {
  model.value = []
  query.value = ''
  search.value?.focus()
}

function outside(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) close()
}

function blur(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && !root.value?.contains(event.relatedTarget)) close()
}

onMounted(() => document.addEventListener('pointerdown', outside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', outside))
</script>

<template>
  <div ref="root" class="technology-select" @keydown.esc="escape" @focusout="blur">
    <button
      ref="trigger"
      type="button"
      class="technology-select__trigger"
      :class="{ 'technology-select__trigger--open': open }"
      :aria-expanded="open"
      :aria-controls="open ? id : undefined"
      @click="toggle"
    >
      <Layers :size="17" aria-hidden="true" />
      <span>{{ label }}</span>
      <ChevronDown :size="17" class="technology-select__chevron" aria-hidden="true" />
    </button>
    <Transition name="technology-menu">
      <div
        v-if="open"
        :id="id"
        class="technology-select__menu"
        role="group"
        :aria-label="t('home.cases.technologies')"
      >
        <input
          ref="search"
          v-model="query"
          class="technology-select__search"
          type="search"
          :placeholder="t('portfolio.searchTechnology')"
          :aria-label="t('portfolio.searchTechnology')"
        />
        <button
          type="button"
          class="technology-select__clear"
          :disabled="!model.length"
          @click="clear"
        >
          {{ t('portfolio.clearTechnologies') }}
        </button>
        <label v-for="option in options" :key="option" class="technology-select__option">
          <span>{{ option }}</span>
          <input
            v-model="model"
            type="checkbox"
            class="technology-select__checkbox"
            :value="option"
          />
        </label>
        <p v-if="!options.length" class="technology-select__empty" role="status">
          {{ t('portfolio.technologySearchEmpty') }}
        </p>
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
  min-height: var(--filter-height, 2.75rem);
  padding: 0.65rem 1rem;
  color: var(--ink);
  cursor: pointer;
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-radius: 0.75rem;
  transition:
    border-color var(--motion-fast),
    background-color var(--motion-fast) ease;
}

.technology-select__trigger > span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.technology-select__trigger--open {
  border-color: var(--card-accent);
}

.technology-select__chevron {
  flex: none;
  margin-inline-start: auto;
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
  border-radius: 0.5rem;
  transition: background-color var(--motion-fast) ease;
}

.technology-select__search {
  width: 100%;
  padding: 0.625rem 0.75rem;
  margin-bottom: 0.25rem;
  color: var(--ink);
  background: var(--page-background);
  border: 1px solid var(--line);
  border-radius: 0.5rem;
}

.technology-select__option:focus-within,
.technology-select__option:has(:checked) {
  background: var(--card-soft);
}

.technology-select__checkbox {
  flex: none;
  width: 1rem;
  height: 1rem;
  margin: 0;
  accent-color: var(--card-accent);
}

.technology-select__empty {
  padding: 0 0.75rem;
  font-size: 0.875rem;
  color: var(--ink-muted);
}

.technology-select__clear {
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  color: var(--card-accent);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 0.5rem;
}

.technology-select__clear:disabled {
  color: var(--ink-muted);
  cursor: default;
}

@media (hover: hover) and (pointer: fine) {
  .technology-select__trigger:hover,
  .technology-select__option:hover,
  .technology-select__clear:enabled:hover {
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
