<script setup lang="ts">
import { Mail, Send, Github } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <section id="intro" class="home-intro" data-anchor>
    <div class="home-intro__panel">
      <div class="home-intro__content">
        <p class="home-intro__role">{{ t('home.intro.role') }}</p>

        <h1 class="home-intro__title">
          <span class="home-intro__title-line">{{ t('home.intro.firstName') }}</span>
          <span class="home-intro__title-line">{{ t('home.intro.lastName') }}</span>
        </h1>

        <div class="home-intro__contacts">
          <a
            class="home-intro__contact-link"
            href="http://t.me/adametsderschopfer"
            target="_blank"
            rel="noreferrer"
          >
            <Send :size="18" class="home-intro__contact-icon" />
            @adametsderschopfer
          </a>
          <a class="home-intro__contact-link" href="mailto:adametsderschopfer@yandex.ru">
            <Mail :size="18" class="home-intro__contact-icon" />
            adametsderschopfer@yandex.ru
          </a>
          <a
            class="home-intro__contact-link"
            href="https://github.com/adametsderschopfer"
            target="_blank"
            rel="noreferrer"
          >
            <Github :size="18" class="home-intro__contact-icon" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-intro {
  min-height: 100vh;
  padding: 20px;
  scroll-margin-top: 6rem;
}

.home-intro__panel {
  position: relative;
  min-height: calc(100vh - 40px);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--glass-border) 82%, rgba(255, 255, 255, 0.08));
  border-radius: 2rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 24px 70px var(--glass-shadow);
  backdrop-filter: blur(28px);
}

.home-intro__panel::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(110deg, rgba(255, 255, 255, 0.05), transparent 34%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.08), transparent 36%);
  content: '';
  pointer-events: none;
}

.home-intro__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.3rem;
  min-height: calc(100vh - 40px);
  max-width: 44rem;
  padding: clamp(2rem, 6vw, 5rem);
}

.home-intro__role {
  align-self: flex-start;
  margin: 0;
  color: var(--color-accent);
  font-size: clamp(0.9rem, 1.4vw, 1.15rem);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.home-intro__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(3.5rem, 10vw, 7.5rem);
  font-weight: 700;
  line-height: 0.92;
  text-wrap: balance;
}

.home-intro__title-line {
  display: block;
}

.home-intro__contacts {
  display: grid;
  gap: 0.6rem;
}

.home-intro__contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-soft);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  text-decoration: none;
  line-height: 1;
  transition:
    color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;
}

.home-intro__contact-link:hover {
  color: var(--color-accent);
  transform: translateX(4px) scale(1.05);
}

.home-intro__contact-link:hover .home-intro__contact-icon {
  transform: scale(1.2) rotate(12deg);
}

.home-intro__contact-link:active {
  transform: translateX(0) scale(0.98);
}

.home-intro__contact-icon {
  flex-shrink: 0;
  margin-right: 0.6rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.home-intro__role {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.home-intro__title {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.home-intro__contacts {
  animation: fadeInUp 0.6s ease-out 0.6s both;
}

.home-intro__contact-link {
  animation: fadeInUp 0.6s ease-out both;
}

.home-intro__contact-link:nth-child(1) {
  animation-delay: 0.8s;
}

.home-intro__contact-link:nth-child(2) {
  animation-delay: 1s;
}

.home-intro__contact-link:nth-child(3) {
  animation-delay: 1.2s;
}

@media (max-width: 640px) {
  .home-intro {
    padding: 14px;
  }

  .home-intro__panel,
  .home-intro__content {
    min-height: calc(100vh - 28px);
  }

  .home-intro__panel {
    border-radius: 1.5rem;
  }

  .home-intro__content {
    max-width: none;
    padding: 1.5rem;
  }

  .home-intro__role {
    align-self: flex-start;
  }
}
</style>
