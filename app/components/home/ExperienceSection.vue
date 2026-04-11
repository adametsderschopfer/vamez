<script setup lang="ts">
const { t, tm, rt } = useI18n()

const companyKeys = ['company1', 'company2', 'company3', 'company4', 'company5', 'company6', 'company7']

const experiences = computed(() =>
  companyKeys.map((key, index) => ({
    id: index + 1,
    role: t(`home.experience.${key}.role`),
    title: t(`home.experience.${key}.title`),
    period: t(`home.experience.${key}.period`),
    description: t(`home.experience.${key}.description`),
    tasks: (tm(`home.experience.${key}.tasks`) as string[]).map((item) => rt(item))
  }))
)

const itemRefs = ref<HTMLElement[]>([])
const visibleItems = ref<Set<number>>(new Set())

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index)
          visibleItems.value.add(index)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  itemRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })
})
</script>

<template>
  <section id="experience" class="experience-section" data-anchor>
    <div class="experience-section__container">
      <div class="experience-section__header">
        <h2 class="experience-section__title">{{ t('home.experience.title') }}</h2>
      </div>

      <div class="experience-section__timeline">
        <div class="experience-section__line" />

        <div
          v-for="(experience, index) in experiences"
          :key="experience.id"
          :ref="(el) => { if (el) itemRefs[index] = el as HTMLElement }"
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
              <span class="experience-item__period">{{ experience.period }}</span>
            </div>

            <p class="experience-item__description">{{ experience.description }}</p>

            <ul class="experience-item__tasks">
              <li
                v-for="(task, taskIndex) in experience.tasks"
                :key="taskIndex"
                class="experience-item__task"
              >
                {{ task.trim() }}
              </li>
            </ul>
          </div>
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
  margin-bottom: 4rem;
  padding: 0 70px;
  animation: fadeInUp 0.6s ease-out 0.2s forwards;
}

.experience-section__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
}

.experience-section__timeline {
  position: relative;
  padding-left: calc(1.5rem + 70px);
  padding-right: 70px;
}

.experience-section__line {
  position: absolute;
  left: 70px;
  top: 0.5rem;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, var(--color-accent) 0%, transparent 100%);
  opacity: 0.4;
  pointer-events: none;
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

.experience-item:last-child {
  padding-bottom: 0;
}

.experience-item__dot {
  position: absolute;
  left: calc(-1.5rem - 0.6rem);
  top: 0.4rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: var(--color-accent);
  border: 2px solid var(--color-surface);
  box-shadow: 0 0 0 2px var(--color-accent);
  z-index: 2;
}

.experience-item__body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-item__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
}

.experience-item__meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.experience-item__role {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.experience-item__company {
  color: var(--color-accent);
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 500;
}

.experience-item__period {
  flex-shrink: 0;
  color: var(--color-text);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: 700;
  white-space: nowrap;
}

.experience-item__description {
  margin: 0;
  color: var(--color-text-soft);
  font-size: clamp(1rem, 1.3vw, 1.1rem);
  line-height: 1.8;
  max-width: 80ch;
}

.experience-item__tasks {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.experience-item__task {
  position: relative;
  padding-left: 1.5rem;
  color: var(--color-text-soft);
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.6;
}

.experience-item__task::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .experience-section__timeline {
    padding-left: 2.5rem;
    padding-right: 20px;
  }

  .experience-section__line {
    left: 0.5rem;
  }

  .experience-section__header {
    padding: 0 20px;
    margin-bottom: 2.5rem;
  }

  .experience-item__dot {
    left: -1.55rem;
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
