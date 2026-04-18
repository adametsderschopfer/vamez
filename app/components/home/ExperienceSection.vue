<script setup lang="ts">
const { t, locale } = useI18n()

interface Experience {
  id: string
  role: string
  title: string
  period: string
  duration: string
  description: string
  stack: string[]
  tasks: string[]
  achievements: string[]
}

interface ExperienceItemContent {
  id: string
  order: number
  role: string
  title: string
  period: string
  start: string
  end: string | null
  description: string
  stack: string[]
  tasks: string[]
  achievements: string[]
}

interface ExperienceContent {
  locale: 'ru' | 'en'
  careerStart: string
  items: ExperienceItemContent[]
}

const INITIAL_VISIBLE = 3

function calcDuration(start: string, end: string | null): string {
  const [sy, sm] = start.split('-').map(Number) as [number, number]
  const now = new Date()
  const [ey, em] = end
    ? (end.split('-').map(Number) as [number, number])
    : ([now.getFullYear(), now.getMonth() + 1] as [number, number])

  const totalMonths = (ey - sy) * 12 + (em - sm)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${t('home.experience.duration.years', years)}`)
  if (months > 0) parts.push(`${months} ${t('home.experience.duration.months', months)}`)
  return parts.join(' ')
}

const { data } = await useAsyncData(
  () => `experience-${locale.value}`,
  () => queryCollection('experience').where('locale', '=', locale.value).first(),
  { watch: [locale] }
)

const experienceContent = computed<ExperienceContent | null>(() => {
  const item = data.value

  if (
    !item ||
    (item.locale !== 'ru' && item.locale !== 'en') ||
    typeof item.careerStart !== 'string' ||
    !Array.isArray(item.items)
  ) {
    return null
  }

  return item as ExperienceContent
})

const totalExperience = computed(() => {
  const careerStart = experienceContent.value?.careerStart ?? '2018-02'
  return calcDuration(careerStart, null)
})

const experiences = computed<Experience[]>(() => {
  const items = [...(experienceContent.value?.items ?? [])].sort((a, b) => a.order - b.order)

  return items.map((item) => ({
    id: item.id,
    role: item.role,
    title: item.title,
    period: item.period,
    duration: calcDuration(item.start, item.end),
    description: item.description,
    stack: item.stack,
    tasks: item.tasks,
    achievements: item.achievements
  }))
})

const showAll = ref(false)
const hiddenCount = computed(() => Math.max(0, experiences.value.length - INITIAL_VISIBLE))
const visibleExperiences = computed(() =>
  showAll.value ? experiences.value : experiences.value.slice(0, INITIAL_VISIBLE)
)

const itemRefs = ref<HTMLElement[]>([])
const visibleItems = ref<Set<number>>(new Set())
let observer: IntersectionObserver | null = null

function observeAll(): void {
  itemRefs.value.forEach((el) => {
    if (el && !visibleItems.value.has(Number(el.dataset.index))) {
      observer?.observe(el)
    }
  })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index)
          visibleItems.value.add(index)
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  observeAll()
})

watch(showAll, async (val) => {
  if (val) {
    await nextTick()
    observeAll()
  }
})

watch(
  () => locale.value,
  () => {
    showAll.value = false
    visibleItems.value = new Set()
    itemRefs.value = []
  }
)

watch(
  () => visibleExperiences.value.map((experience) => experience.id),
  async () => {
    await nextTick()
    observeAll()
  }
)

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section id="experience" class="experience-section" data-anchor>
    <div class="experience-section__container">
      <div class="experience-section__header">
        <h2 class="experience-section__title">{{ t('home.experience.title') }}</h2>
        <span class="experience-section__total">{{ totalExperience }}</span>
      </div>

      <div class="experience-section__timeline">
        <div class="experience-section__line" />

        <div
          v-for="(experience, index) in visibleExperiences"
          :key="experience.id"
          :ref="
            (el) => {
              if (el) itemRefs[index] = el as HTMLElement
            }
          "
          class="experience-item"
          :class="{ 'is-visible': visibleItems.has(index) }"
          :data-index="index"
        >
          <div class="experience-item__dot" />

          <div class="experience-item__body">
            <div class="experience-item__header">
              <div class="experience-item__meta">
                <h3 class="experience-item__role">{{ experience.role }}</h3>
                <span class="experience-item__company">{{ experience.title }}</span>
              </div>
              <div class="experience-item__dates">
                <span class="experience-item__duration">{{ experience.duration }}</span>
                <span class="experience-item__period">{{ experience.period }}</span>
              </div>
            </div>

            <p class="experience-item__description">{{ experience.description }}</p>

            <div v-if="experience.stack.length" class="experience-item__stack">
              <span
                v-for="(tech, techIndex) in experience.stack"
                :key="techIndex"
                class="experience-item__tag"
                >{{ tech }}</span
              >
            </div>

            <div v-if="experience.tasks.length" class="experience-item__block">
              <h4 class="experience-item__block-title">{{ t('home.experience.labels.tasks') }}</h4>
              <ul class="experience-item__list">
                <li
                  v-for="(task, taskIndex) in experience.tasks"
                  :key="taskIndex"
                  class="experience-item__list-item"
                >
                  {{ task.trim() }}
                </li>
              </ul>
            </div>

            <div v-if="experience.achievements.length" class="experience-item__block">
              <h4 class="experience-item__block-title experience-item__block-title--accent">
                {{ t('home.experience.labels.achievements') }}
              </h4>
              <ul class="experience-item__list">
                <li
                  v-for="(item, aIndex) in experience.achievements"
                  :key="aIndex"
                  class="experience-item__list-item experience-item__list-item--accent"
                >
                  {{ item.trim() }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- expand / collapse -->
        <div class="experience-section__toggle">
          <button v-if="!showAll" class="experience-section__toggle-btn" @click="showAll = true">
            <span class="experience-section__toggle-icon" aria-hidden="true">↑</span>
            {{ t('home.experience.showEarlier') }}
            <span class="experience-section__toggle-count">{{ hiddenCount }}</span>
          </button>
          <button
            v-else
            class="experience-section__toggle-btn experience-section__toggle-btn--collapse"
            @click="showAll = false"
          >
            <span
              class="experience-section__toggle-icon experience-section__toggle-icon--down"
              aria-hidden="true"
              >↑</span
            >
            {{ t('home.experience.collapse') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  position: relative;
  padding: 0 20px;
}

.experience-section__container {
  padding: clamp(2rem, 6vw, 4rem) 0;
}

.experience-section__header {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 70px;
  margin-bottom: 4rem;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 0.2s forwards;
}

.experience-section__title {
  margin: 0;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
}

.experience-section__total {
  flex-shrink: 0;
  padding-bottom: 0.3em;
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  font-weight: 500;
  color: var(--color-text-soft);
  letter-spacing: 0.03em;
  white-space: nowrap;
  opacity: 0.5;
}

.experience-section__timeline {
  position: relative;
  padding-right: 70px;
  padding-left: calc(1.5rem + 70px);
}

.experience-section__line {
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  left: 70px;
  width: 1px;
  pointer-events: none;
  background: linear-gradient(180deg, var(--color-accent) 0%, transparent 100%);
  opacity: 0.4;
}

.experience-item {
  position: relative;
  padding-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.experience-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.experience-item:last-of-type {
  padding-bottom: 0;
}

.experience-item__dot {
  position: absolute;
  top: 0.4rem;
  left: calc(-1.5rem - 0.6rem);
  z-index: 2;
  width: 1.2rem;
  height: 1.2rem;
  background: var(--color-accent);
  border: 2px solid var(--color-surface);
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--color-accent);
}

.experience-item__body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-item__header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
}

.experience-item__meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.experience-item__role {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.experience-item__company {
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 500;
  color: var(--color-accent);
}

.experience-item__dates {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 0.2rem;
  align-items: flex-end;
}

.experience-item__duration {
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
}

.experience-item__period {
  font-size: 0.9rem;
  color: var(--color-text-soft);
  white-space: nowrap;
  opacity: 0.6;
}

.experience-item__description {
  max-width: 80ch;
  margin: 0;
  font-size: clamp(1rem, 1.3vw, 1.1rem);
  line-height: 1.8;
  color: var(--color-text-soft);
}

.experience-item__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.experience-item__tag {
  padding: 0.3rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-soft);
  white-space: nowrap;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
}

.experience-item__block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.experience-item__block-title {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-soft);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.experience-item__block-title--accent {
  color: var(--color-accent);
  opacity: 1;
}

.experience-item__list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.experience-item__list-item {
  position: relative;
  padding-left: 1.5rem;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.6;
  color: var(--color-text-soft);
}

.experience-item__list-item::before {
  position: absolute;
  left: 0;
  color: var(--color-text-soft);
  content: '—';
  opacity: 0.5;
}

.experience-item__list-item--accent::before {
  color: var(--color-accent);
  opacity: 1;
}

/* ── Toggle button ── */

.experience-section__toggle {
  display: flex;
  align-items: center;
  margin-top: 3rem;
}

.experience-section__toggle-btn {
  display: inline-flex;
  gap: 0.6rem;
  align-items: center;
  padding: 0.6rem 1.2rem 0.6rem 1rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-soft);
  cursor: pointer;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  backdrop-filter: blur(12px);
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.experience-section__toggle-btn:active {
  transform: scale(0.97);
}

.experience-section__toggle-icon {
  display: inline-block;
  font-size: 0.9rem;
  transform: rotate(180deg); /* arrow pointing down = show more */
  transition: transform 0.3s ease;
}

.experience-section__toggle-icon--down {
  transform: rotate(0deg); /* arrow pointing up = collapse */
}

.experience-section__toggle-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.15);
  border: 1px solid rgba(var(--color-accent-rgb), 0.3);
  border-radius: 50%;
}

@media (hover: hover) and (pointer: fine) {
  .experience-section__toggle-btn:hover {
    color: var(--color-text);
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }
}

@media (max-width: 768px) {
  .experience-section__timeline {
    padding-right: 20px;
    padding-left: 2.5rem;
  }

  .experience-section__line {
    left: 0.5rem;
  }

  .experience-section__header {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
    padding: 0 20px;
    margin-bottom: 2.5rem;
  }

  .experience-item__dot {
    left: -2.5rem;
    width: 1rem;
    height: 1rem;
  }

  .experience-item__header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .experience-item {
    padding-bottom: 3rem;
  }
}
</style>
