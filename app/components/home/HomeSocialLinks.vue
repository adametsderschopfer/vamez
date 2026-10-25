<script setup lang="ts">
import { ArrowUpRight, Github, Instagram, Youtube } from 'lucide-vue-next'

const { t } = useI18n()
const socials = [
  {
    name: 'GitHub',
    handle: 'adametsderschopfer',
    href: 'https://github.com/adametsderschopfer',
    icon: Github
  },
  {
    name: 'YouTube',
    handle: '@vlad_adamets',
    href: 'https://www.youtube.com/@vlad_adamets',
    icon: Youtube
  },
  {
    name: 'Instagram',
    handle: '@v_adamets',
    href: 'https://www.instagram.com/v_adamets/',
    icon: Instagram
  }
] as const
</script>

<template>
  <div class="home-socials">
    <h3 id="home-socials-title" class="home-socials__title">
      {{ t('home.contact.socialsLabel') }}
    </h3>
    <ul class="home-socials__list" aria-labelledby="home-socials-title">
      <li v-for="social in socials" :key="social.name" class="home-socials__item">
        <a class="home-socials__link" :href="social.href" target="_blank" rel="noopener noreferrer">
          <component
            :is="social.icon"
            class="home-socials__icon"
            :stroke-width="1.6"
            aria-hidden="true"
          />
          <span class="home-socials__text">
            <span class="home-socials__name">{{ social.name }}</span>
            <span class="home-socials__handle">{{ social.handle }}</span>
          </span>
          <ArrowUpRight
            class="home-socials__arrow"
            :size="24"
            :stroke-width="1.6"
            aria-hidden="true"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home-socials {
  --socials-gap: 0.5rem;
  --socials-padding: clamp(1rem, 2vw, 1.5rem);

  min-width: 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.home-socials__title {
  margin: 0 0 1.25rem;
  font-size: var(--font-size-label);
  font-weight: 500;
  color: var(--ink-muted);
}

.home-socials__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--socials-gap);
  padding: 0;
  margin: 0;
  list-style: none;
}

.home-socials__item {
  min-width: 0;
}

.home-socials__link {
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 100%;
  padding: var(--socials-padding);
  color: var(--ink);
  text-decoration: none;
  background: var(--card-surface);
  transition:
    color var(--motion-fast) ease,
    background-color var(--motion-fast) ease;
}

.home-socials__icon {
  flex: none;
  width: 1.75rem;
  height: 1.75rem;
}

.home-socials__text {
  display: grid;
  flex: 1;
  gap: 0.375rem;
  min-width: 0;
}

.home-socials__name {
  font-size: var(--font-size-body);
  font-weight: 600;
}

.home-socials__handle {
  font-size: var(--font-size-label);
  overflow-wrap: anywhere;
}

.home-socials__arrow {
  flex: none;
}

.home-socials__link:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: -2px;
}

@media (hover: hover) and (pointer: fine) {
  .home-socials__link:hover {
    color: var(--card-accent);
    background: color-mix(in srgb, var(--card-accent) 12%, var(--card-surface));
  }
}

@media (max-width: 600px) {
  .home-socials__list {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
