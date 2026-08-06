<script setup lang="ts">
import { Github, Mail, Send } from 'lucide-vue-next'

const { t } = useI18n()

const contacts = [
  {
    label: '@adametsderschopfer',
    href: 'https://t.me/adametsderschopfer',
    icon: Send,
    external: true
  },
  {
    label: 'adametsderschopfer@yandex.ru',
    href: 'mailto:adametsderschopfer@yandex.ru',
    icon: Mail,
    external: false
  },
  {
    label: 'GitHub',
    href: 'https://github.com/adametsderschopfer',
    icon: Github,
    external: true
  }
] as const
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__content">
      <h1 id="home-hero-title" class="home-hero__title">
        <span class="home-hero__title-line">{{ t('home.intro.firstName') }}</span>
        <span class="home-hero__title-line">{{ t('home.intro.lastName') }}</span>
      </h1>

      <ul class="home-hero__contacts" :aria-label="t('home.contacts.title')">
        <li v-for="contact in contacts" :key="contact.href" class="home-hero__contact-item">
          <a
            class="home-hero__contact-link"
            :href="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noreferrer' : undefined"
          >
            <component
              :is="contact.icon"
              class="home-hero__contact-icon"
              :size="18"
              stroke-width="1.8"
            />
            <span>{{ contact.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  display: flex;
  flex: 0 0 auto;
  min-height: 0;
  padding: clamp(2.25rem, 4vw, 4rem) clamp(1.25rem, 5vw, 5rem);
}

.home-hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.home-hero__title {
  margin: 0;
  font-size: clamp(1.7rem, 6vw, 5.75rem);
  font-weight: 500;
  line-height: 0.82;
  text-transform: uppercase;
  letter-spacing: -0.055em;
  white-space: nowrap;
}

.home-hero__title-line {
  display: inline;
}

.home-hero__title-line + .home-hero__title-line {
  margin-left: 0.2em;
}

.home-hero__contacts {
  display: grid;
  gap: 0.65rem;
  padding: 0;
  margin: clamp(1.5rem, 3vw, 2.75rem) 0 0;
  color: var(--home-page-contact);
  list-style: none;
}

.home-hero__contact-link {
  display: inline-flex;
  gap: 0.65rem;
  align-items: center;
  font-size: clamp(0.95rem, 1.2vw, 1.08rem);
  line-height: 1.35;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.home-hero__contact-link:hover {
  opacity: 0.55;
}

.home-hero__contact-link:focus-visible {
  outline: 1px solid currentcolor;
  outline-offset: 0.35rem;
}

.home-hero__contact-icon {
  flex: none;
}

@media (max-width: 640px) {
  .home-hero {
    padding-top: 3.25rem;
  }

  .home-hero__title {
    font-size: clamp(1.7rem, 6vw, 3.25rem);
    line-height: 0.86;
  }
}
</style>
