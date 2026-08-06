<script setup lang="ts">
import { Github, Mail, MapPin, Phone, Send } from 'lucide-vue-next'
import { cvContacts, cvMetrics, cvProfile } from '@/data/cv'

const contactIcons = [Send, Mail, Phone, Github] as const
</script>

<template>
  <section class="cv-hero">
    <div class="cv-hero__panel">
      <div class="cv-hero__content">
        <p class="cv-hero__eyebrow">{{ cvProfile.role }}</p>
        <h1 class="cv-hero__title">{{ cvProfile.name }}</h1>
        <p class="cv-hero__summary">{{ cvProfile.summary }}</p>

        <div class="cv-hero__meta" aria-label="Ключевая информация">
          <span class="cv-hero__meta-item">
            <MapPin :size="18" />
            {{ cvProfile.location }}
          </span>
          <span class="cv-hero__meta-item">{{ cvProfile.relocation }}</span>
        </div>

        <div class="cv-hero__contacts" aria-label="Контакты">
          <a
            v-for="(contact, index) in cvContacts"
            :key="contact.href"
            class="cv-hero__contact"
            :href="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noreferrer' : undefined"
          >
            <component :is="contactIcons[index]" class="cv-hero__contact-icon" :size="18" />
            <span class="cv-hero__contact-text">{{ contact.value }}</span>
          </a>
        </div>
      </div>

      <div class="cv-hero__aside" aria-label="Опыт в цифрах">
        <div v-for="metric in cvMetrics" :key="metric.label" class="cv-hero__metric">
          <strong class="cv-hero__metric-value">{{ metric.value }}</strong>
          <span class="cv-hero__metric-label">{{ metric.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv-hero {
  --cv-hero-padding: clamp(1.2rem, 4vw, 4.4rem);
  --cv-hero-radius: 2rem;
  --cv-hero-gap: clamp(2rem, 6vw, 5rem);

  padding: 1.25rem;
}

.cv-hero__panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(17rem, 0.35fr);
  gap: var(--cv-hero-gap);
  min-height: calc(100dvh - 2.5rem);
  padding: var(--cv-hero-padding);
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(var(--color-white-rgb), 0.1), transparent 28%),
    linear-gradient(135deg, rgba(var(--color-white-rgb), 0.06), rgba(var(--color-white-rgb), 0.02));
  border: 1px solid color-mix(in srgb, var(--glass-border) 82%, rgba(var(--color-white-rgb), 0.08));
  border-radius: var(--cv-hero-radius);
  box-shadow:
    inset 0 1px 0 rgba(var(--color-white-rgb), 0.12),
    0 24px 70px var(--glass-shadow);
  backdrop-filter: blur(12px);
}

.cv-hero__panel::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background:
    radial-gradient(
      circle at 78% 20%,
      color-mix(in srgb, var(--color-accent) 18%, transparent),
      transparent 34%
    ),
    linear-gradient(0deg, rgba(var(--color-black-rgb), 0.08), transparent 36%);
}

.cv-hero__content,
.cv-hero__aside {
  position: relative;
  z-index: 1;
}

.cv-hero__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 56rem;
}

.cv-hero__eyebrow {
  margin: 0 0 1rem;
  font-size: clamp(0.86rem, 1.3vw, 1.05rem);
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.cv-hero__title {
  max-width: 9ch;
  margin: 0;
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 800;
  line-height: 0.92;
  color: var(--color-text);
  text-wrap: balance;
}

.cv-hero__summary {
  max-width: 72ch;
  margin: clamp(1.5rem, 3vw, 2.4rem) 0 0;
  font-size: clamp(1rem, 1.55vw, 1.28rem);
  line-height: 1.8;
  color: var(--color-text-soft);
}

.cv-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.6rem;
}

.cv-hero__meta-item {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  min-height: 2.45rem;
  padding: 0 0.95rem;
  font-size: 0.94rem;
  font-weight: 600;
  color: var(--color-text);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
}

.cv-hero__contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.cv-hero__contact {
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
  min-width: 0;
  padding: 0.8rem 0.95rem;
  color: var(--color-text-soft);
  text-decoration: none;
  background: color-mix(in srgb, var(--glass-bg) 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 88%, transparent);
  border-radius: 1rem;
  transition:
    color 0.22s ease,
    border-color 0.22s ease,
    transform 0.22s ease;
}

.cv-hero__contact-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cv-hero__contact-icon {
  flex: none;
}

.cv-hero__aside {
  display: grid;
  gap: 0.85rem;
  align-content: end;
}

.cv-hero__metric {
  display: grid;
  gap: 0.35rem;
  padding: 1.15rem;
  background: color-mix(in srgb, var(--glass-bg) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 92%, transparent);
  border-radius: 1.15rem;
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-white) 18%, transparent);
}

.cv-hero__metric-value {
  font-size: clamp(1.45rem, 3vw, 2.05rem);
  line-height: 1;
  color: var(--color-text);
}

.cv-hero__metric-label {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--color-text-soft);
}

@media (hover: hover) and (pointer: fine) {
  .cv-hero__contact:hover {
    color: var(--color-accent);
    border-color: color-mix(in srgb, var(--color-accent) 52%, var(--glass-border));
    transform: translateY(-2px);
  }
}

@media (max-width: 980px) {
  .cv-hero__panel {
    grid-template-columns: minmax(0, 1fr);
    min-height: auto;
  }

  .cv-hero__aside {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .cv-hero {
    padding: 0.9rem;
  }

  .cv-hero__panel {
    border-radius: 1.45rem;
  }

  .cv-hero__title {
    max-width: 8ch;
  }

  .cv-hero__contacts,
  .cv-hero__aside {
    grid-template-columns: minmax(0, 1fr);
  }

  .cv-hero__contact {
    width: 100%;
  }
}
</style>
