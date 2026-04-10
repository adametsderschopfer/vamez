<script setup lang="ts">
const { t } = useI18n()

const experiences = [
  {
    id: 1,
    title: t('home.experience.company1.title'),
    role: t('home.experience.company1.role'),
    period: t('home.experience.company1.period'),
    description: t('home.experience.company1.description')
  },
  {
    id: 2,
    title: t('home.experience.company2.title'),
    role: t('home.experience.company2.role'),
    period: t('home.experience.company2.period'),
    description: t('home.experience.company2.description')
  },
  {
    id: 3,
    title: t('home.experience.company3.title'),
    role: t('home.experience.company3.role'),
    period: t('home.experience.company3.period'),
    description: t('home.experience.company3.description')
  },
  {
    id: 4,
    title: t('home.experience.company4.title'),
    role: t('home.experience.company4.role'),
    period: t('home.experience.company4.period'),
    description: t('home.experience.company4.description')
  },
  {
    id: 5,
    title: t('home.experience.company5.title'),
    role: t('home.experience.company5.role'),
    period: t('home.experience.company5.period'),
    description: t('home.experience.company5.description')
  },
  {
    id: 6,
    title: t('home.experience.company6.title'),
    role: t('home.experience.company6.role'),
    period: t('home.experience.company6.period'),
    description: t('home.experience.company6.description')
  }
]
</script>

<template>
  <section id="experience" class="experience-section" data-anchor>
    <div class="experience-section__container">
      <div class="experience-section__header">
        <h2 class="experience-section__title">{{ t('home.experience.title') }}</h2>
      </div>

      <div class="experience-section__cards-container">
        <div
          v-for="(experience, index) in experiences"
          :key="experience.id"
          class="experience-card"
          :style="{ '--card-index': index }"
        >
          <div class="experience-card__content">
            <div class="experience-card__header">
              <h3 class="experience-card__title">{{ experience.title }}</h3>
              <span class="experience-card__period">{{ experience.period }}</span>
            </div>

            <p class="experience-card__role">{{ experience.role }}</p>
            <p class="experience-card__description">{{ experience.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  position: relative;
  min-height: 400vh;
  padding: 20px;
}

.experience-section__container {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.experience-section__header {
  margin-bottom: 4rem;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.experience-section__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
}

.experience-section__cards-container {
  position: relative;
  height: 600px;
  perspective: 1000px;
}

.experience-card {
  position: absolute;
  width: clamp(280px, 90vw, 500px);
  height: 280px;
  top: calc(var(--card-index) * 40px);
  left: 0;
  z-index: calc(100 - var(--card-index));

  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  box-shadow: 0 18px 50px var(--glass-shadow);
  padding: 2rem;

  animation: fadeInUp 0.6s ease-out calc(0.4s + var(--card-index) * 0.2s) both;

  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s ease;
}

.experience-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 24px 70px var(--glass-shadow);
}

.experience-card__content {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
}

.experience-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.experience-card__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 600;
  line-height: 1.2;
  flex: 1;
}

.experience-card__period {
  flex-shrink: 0;
  color: var(--color-accent);
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.05em;
}

.experience-card__role {
  margin: 0;
  color: var(--color-text-soft);
  font-size: 1rem;
  font-weight: 500;
}

.experience-card__description {
  margin: 0;
  color: var(--color-text-soft);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  line-height: 1.6;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

@media (max-width: 640px) {
  .experience-section {
    min-height: 250vh;
  }

  .experience-section__container {
    padding: 0;
  }

  .experience-card {
    width: calc(100vw - 28px);
  }

  .experience-section__header {
    margin-bottom: 2rem;
  }

  .experience-section__title {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
  }
}
</style>
