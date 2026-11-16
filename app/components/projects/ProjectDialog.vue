<script setup lang="ts">
import { ArrowUpRight, X } from 'lucide-vue-next'
import type { WorkCase, WorkProject } from '@/types/workCases'
import HomeProjectPreview from '@/components/home/HomeProjectPreview.vue'

defineProps<{ project: WorkProject; company: WorkCase }>()
const emit = defineEmits<{ close: [] }>()
const { t, locale } = useI18n()
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const closing = shallowRef(false)
let previousOverflow = ''
let returnFocus: HTMLElement | null = null
let animation: Animation | undefined

function slide(closing: boolean) {
  const frames = [
    { transform: 'translateY(100%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ]
  animation = dialog.value?.animate(closing ? frames.reverse() : frames, {
    duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    fill: 'both'
  })
  return animation?.finished.catch(() => {})
}
async function close() {
  if (closing.value) return
  closing.value = true
  await slide(true)
  dialog.value?.close()
  emit('close')
}
function backdrop(event: MouseEvent) {
  if (!dialog.value || event.target !== dialog.value) return
  const rect = dialog.value.getBoundingClientRect()
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    void close()
}
onMounted(() => {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialog.value?.showModal()
  void slide(false)
})
onBeforeUnmount(() => {
  animation?.cancel()
  dialog.value?.close()
  document.body.style.overflow = previousOverflow
  returnFocus?.focus({ preventScroll: true })
})
</script>

<template>
  <dialog
    ref="dialog"
    class="project-dialog"
    aria-labelledby="project-dialog-title"
    @cancel.prevent="close"
    @click="backdrop"
  >
    <div class="project-dialog__toolbar">
      <span>{{ company.name }}</span>
      <button
        class="project-dialog__close"
        type="button"
        :aria-label="t('portfolio.close')"
        autofocus
        @click="close"
      >
        <X :size="18" :stroke-width="1.75" aria-hidden="true" />
      </button>
    </div>
    <HomeProjectPreview v-if="project.preview" :preview="project.preview" />
    <div class="project-dialog__content">
      <h2 id="project-dialog-title" class="project-dialog__title">{{ project.title[language] }}</h2>
      <p class="project-dialog__text">{{ project.description[language] }}</p>
      <dl v-if="company.role || company.period" class="project-dialog__facts">
        <div v-if="company.role">
          <dt>{{ t('portfolio.role') }}</dt>
          <dd>{{ company.role[language] }}</dd>
        </div>
        <div v-if="company.period">
          <dt>{{ company.name }}</dt>
          <dd>{{ company.period[language] }}</dd>
        </div>
      </dl>
      <section
        v-for="section in project.sections"
        :key="section.title.ru"
        class="project-dialog__section"
      >
        <h3>{{ section.title[language] }}</h3>
        <p class="project-dialog__text">{{ section.description[language] }}</p>
      </section>
      <section v-if="project.contribution" class="project-dialog__section">
        <h3>{{ t('home.cases.contribution') }}</h3>
        <p class="project-dialog__text">{{ project.contribution[language] }}</p>
      </section>
      <ul
        v-if="project.stack?.length"
        class="project-dialog__stack"
        :aria-label="t('home.cases.technologies')"
      >
        <li v-for="technology in project.stack" :key="technology">{{ technology }}</li>
      </ul>
      <a
        v-if="project.url"
        class="project-dialog__link"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        >{{ t('home.personalProjects.visitWebsite') }} <ArrowUpRight :size="20"
      /></a>
    </div>
  </dialog>
</template>

<style scoped>
.project-dialog {
  --dialog-padding: clamp(1.25rem, 4vw, 3rem);

  position: fixed;
  inset: auto 0 0;
  width: min(56rem, 100%);
  max-width: 100%;
  max-height: 92dvh;
  padding: 0;
  margin: 0 auto;
  overscroll-behavior: contain;
  color: var(--ink);
  scrollbar-width: none;
  background: var(--card-surface);
  border: 1px solid var(--line);
  border-bottom: 0;
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 -1rem 5rem rgb(0 0 0 / 30%);
}

.project-dialog::-webkit-scrollbar {
  display: none;
}

.project-dialog::backdrop {
  background: rgb(0 0 0 / 65%);
  backdrop-filter: blur(6px);
}

.project-dialog__toolbar {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--card-surface);
}

.project-dialog__close {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  color: var(--ink-muted);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 0.75rem;
  isolation: isolate;
  transition: color var(--motion-fast) ease;
}

.project-dialog__close::before {
  position: absolute;
  inset: 0.25rem;
  z-index: -1;
  content: '';
  background: color-mix(in srgb, var(--card-soft) 55%, transparent);
  border: 1px solid var(--line);
  border-radius: 0.625rem;
  transition: background-color var(--motion-fast) ease;
}

@media (hover: hover) and (pointer: fine) {
  .project-dialog__close:hover {
    color: var(--ink);
  }

  .project-dialog__close:hover::before {
    background: var(--card-soft);
  }
}

.project-dialog :deep(.project-preview) {
  height: clamp(15rem, 35vw, 27rem);
  border: 0;
}

.project-dialog__content {
  padding: var(--dialog-padding);
}

.project-dialog__title {
  margin: 0 0 1.5rem;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.project-dialog__text {
  margin: 0;
  line-height: 1.75;
  color: var(--ink-muted);
}

.project-dialog__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 3rem;
  margin: 2rem 0;
}

.project-dialog__facts dt {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--ink-muted);
}

.project-dialog__facts dd {
  margin: 0;
}

.project-dialog__section {
  margin-top: 2rem;
}

.project-dialog__section h3 {
  font-size: 1.125rem;
}

.project-dialog__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 2rem 0;
  list-style: none;
}

.project-dialog__stack li {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  background: var(--card-soft);
  border-radius: 0.5rem;
}

.project-dialog__link {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--ink);
}
</style>
