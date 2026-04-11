<script setup lang="ts">
import { Mail, Send, Github } from 'lucide-vue-next'

interface Skill {
  readonly label: string
  readonly icon: string
  readonly size: 'sm' | 'md' | 'lg'
  readonly top: number
  readonly right: number
  readonly delay: number
  readonly floatAnim: 1 | 2 | 3 | 4 | 5
  readonly highlighted?: boolean
}

const { t } = useI18n()

const SKILLS: readonly Skill[] = [
  { label: 'TypeScript', icon: 'typescript.svg', size: 'lg', top: 12, right: 28, delay: 0,   floatAnim: 1, highlighted: true },
  { label: 'React',      icon: 'react.svg',      size: 'md', top: 22, right: 8,  delay: 0.8, floatAnim: 3, highlighted: true },
  { label: 'Vue',        icon: 'vue.svg',        size: 'sm', top: 8,  right: 12, delay: 1.6, floatAnim: 2, highlighted: true },
  { label: 'Next.js',    icon: 'nextjs.svg',     size: 'md', top: 38, right: 22, delay: 0.4, floatAnim: 4 },
  { label: 'React Native', icon: 'react.svg',    size: 'lg', top: 52, right: 6,  delay: 1.2, floatAnim: 5 },
  { label: 'Node.js',    icon: 'nodejs.svg',     size: 'sm', top: 46, right: 36, delay: 2.0, floatAnim: 1 },
  { label: 'GraphQL',    icon: 'graphql.svg',    size: 'md', top: 64, right: 18, delay: 0.6, floatAnim: 3 },
  { label: 'Docker',     icon: 'docker.svg',     size: 'sm', top: 72, right: 38, delay: 1.8, floatAnim: 2 },
  { label: 'PostgreSQL', icon: 'postgresql.svg', size: 'md', top: 78, right: 8,  delay: 1.0, floatAnim: 4 },
  { label: 'Nest.js',    icon: 'nestjs.svg',     size: 'sm', top: 60, right: 42, delay: 2.4, floatAnim: 5 },
  { label: 'Redux',      icon: 'redux.svg',      size: 'sm', top: 28, right: 44, delay: 1.4, floatAnim: 2 },
  { label: 'Python',     icon: 'python.svg',     size: 'md', top: 86, right: 26, delay: 0.2, floatAnim: 1, highlighted: true },
  { label: 'Kubernetes', icon: 'kubernetes.svg', size: 'sm', top: 18, right: 54, delay: 2.2, floatAnim: 3 },
  { label: 'CI/CD',      icon: 'cicd.svg',       size: 'sm', top: 55, right: 54, delay: 1.6, floatAnim: 4 },
] as const

const skillsAreaRef = ref<HTMLElement | null>(null)
const bubbleEls = ref<HTMLElement[]>([])

function onMouseMove(e: MouseEvent): void {
  bubbleEls.value.forEach((bubble) => {
    if (!bubble) return
    const rect = bubble.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 180
    const force = Math.max(0, 1 - dist / maxDist)
    bubble.style.setProperty('--pull-x', `${dx * force * 0.28}px`)
    bubble.style.setProperty('--pull-y', `${dy * force * 0.28}px`)
  })
}

function onMouseLeave(): void {
  bubbleEls.value.forEach((bubble) => {
    if (!bubble) return
    bubble.style.setProperty('--pull-x', '0px')
    bubble.style.setProperty('--pull-y', '0px')
  })
}

onMounted(() => {
  skillsAreaRef.value?.addEventListener('mousemove', onMouseMove)
  skillsAreaRef.value?.addEventListener('mouseleave', onMouseLeave)
})

onBeforeUnmount(() => {
  skillsAreaRef.value?.removeEventListener('mousemove', onMouseMove)
  skillsAreaRef.value?.removeEventListener('mouseleave', onMouseLeave)
})
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

      <div ref="skillsAreaRef" class="home-intro__skills" aria-hidden="true">
        <div
          v-for="(skill, i) in SKILLS"
          :key="skill.label"
          :ref="(el) => { if (el) bubbleEls[i] = el as HTMLElement }"
          class="skill-bubble"
          :class="[
            `skill-bubble--${skill.size}`,
            `skill-bubble--float-${skill.floatAnim}`,
            { 'skill-bubble--highlight': skill.highlighted }
          ]"
          :style="{
            top: `${skill.top}%`,
            right: `${skill.right}%`,
            animationDelay: `${skill.delay}s`
          }"
        >
          <img
            :src="`/icons/tech/${skill.icon}`"
            :alt="skill.label"
            class="skill-bubble__icon"
            draggable="false"
          />
          <span class="skill-bubble__label">{{ skill.label }}</span>
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
  padding: clamp(2rem, 6vw, 5rem) 70px;
}

/* ── Floating skills area ── */

.home-intro__skills {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* ── Individual bubble ── */

.skill-bubble {
  position: absolute;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(14px);
  box-shadow: 0 4px 18px var(--glass-shadow);
  opacity: 0;
  animation-fill-mode: forwards;
  user-select: none;
  cursor: default;
  /* CSS individual translate property — composes with animation transform */
  translate: var(--pull-x, 0px) var(--pull-y, 0px);
  transition: translate 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skill-bubble--highlight {
  border-color: rgba(159, 202, 60, 0.45);
  box-shadow:
    0 4px 18px var(--glass-shadow),
    0 0 14px rgba(159, 202, 60, 0.18);
}

.skill-bubble--sm {
  width: 78px;
  height: 78px;
  animation-duration: 4.5s;
}

.skill-bubble--md {
  width: 94px;
  height: 94px;
  animation-duration: 5.5s;
}

.skill-bubble--lg {
  width: 110px;
  height: 110px;
  animation-duration: 6.5s;
}

.skill-bubble--float-1 { animation-name: skillFloat1; }
.skill-bubble--float-2 { animation-name: skillFloat2; }
.skill-bubble--float-3 { animation-name: skillFloat3; }
.skill-bubble--float-4 { animation-name: skillFloat4; }
.skill-bubble--float-5 { animation-name: skillFloat5; }

.skill-bubble__icon {
  display: block;
  object-fit: contain;
  flex-shrink: 0;
}

.skill-bubble--sm .skill-bubble__icon { width: 28px; height: 28px; }
.skill-bubble--md .skill-bubble__icon { width: 34px; height: 34px; }
.skill-bubble--lg .skill-bubble__icon { width: 40px; height: 40px; }

.skill-bubble__label {
  color: var(--color-text-soft);
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  padding: 0 4px;
}

.skill-bubble--sm .skill-bubble__label { font-size: 0.58rem; }
.skill-bubble--md .skill-bubble__label { font-size: 0.64rem; }
.skill-bubble--lg .skill-bubble__label { font-size: 0.7rem; }

/* ── 5 chaotic float animations (X + Y + optional rotate) ── */

@keyframes skillFloat1 {
  0%   { opacity: 0; transform: translate(0px, 12px); }
  12%  { opacity: 1; }
  30%  { transform: translate(9px, -13px); }
  58%  { transform: translate(-6px, -21px); }
  88%  { opacity: 1; }
  100% { opacity: 0; transform: translate(0px, 12px); }
}

@keyframes skillFloat2 {
  0%   { opacity: 0; transform: translate(0px, 12px); }
  12%  { opacity: 1; }
  33%  { transform: translate(-13px, -15px); }
  63%  { transform: translate(7px, -25px); }
  88%  { opacity: 1; }
  100% { opacity: 0; transform: translate(0px, 12px); }
}

@keyframes skillFloat3 {
  0%   { opacity: 0; transform: translate(0px, 12px); }
  12%  { opacity: 1; }
  22%  { transform: translate(15px, -7px); }
  48%  { transform: translate(5px, -22px); }
  72%  { transform: translate(-9px, -13px); }
  88%  { opacity: 1; }
  100% { opacity: 0; transform: translate(0px, 12px); }
}

@keyframes skillFloat4 {
  0%   { opacity: 0; transform: translate(0px, 12px) rotate(0deg); }
  12%  { opacity: 1; }
  38%  { transform: translate(-11px, -20px) rotate(-3deg); }
  68%  { transform: translate(14px, -14px) rotate(3deg); }
  88%  { opacity: 1; }
  100% { opacity: 0; transform: translate(0px, 12px) rotate(0deg); }
}

@keyframes skillFloat5 {
  0%   { opacity: 0; transform: translate(0px, 12px) rotate(0deg); }
  12%  { opacity: 1; }
  28%  { transform: translate(11px, -9px) rotate(4deg); }
  54%  { transform: translate(-15px, -19px) rotate(-3deg); }
  78%  { transform: translate(5px, -11px) rotate(2deg); }
  88%  { opacity: 1; }
  100% { opacity: 0; transform: translate(0px, 12px) rotate(0deg); }
}

/* ── Text elements ── */

.home-intro__role {
  align-self: flex-start;
  margin: 0;
  color: var(--color-accent);
  font-size: clamp(0.9rem, 1.4vw, 1.15rem);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.home-intro__title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(3.5rem, 10vw, 7.5rem);
  font-weight: 700;
  line-height: 0.92;
  text-wrap: balance;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.home-intro__title-line {
  display: block;
}

.home-intro__contacts {
  display: grid;
  gap: 0.6rem;
  animation: fadeInUp 0.6s ease-out 0.6s both;
}

.home-intro__contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-soft);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  text-decoration: none;
  line-height: 1;
  animation: fadeInUp 0.6s ease-out both;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.home-intro__contact-link:nth-child(1) { animation-delay: 0.8s; }
.home-intro__contact-link:nth-child(2) { animation-delay: 1s; }
.home-intro__contact-link:nth-child(3) { animation-delay: 1.2s; }

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
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (max-width: 900px) {
  .home-intro__skills {
    display: none;
  }
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
}
</style>
