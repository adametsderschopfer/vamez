<script setup lang="ts">
import { Mail, Send, Github } from 'lucide-vue-next'

interface Skill {
  readonly label: string
  readonly size: 'sm' | 'md' | 'lg'
  readonly top: number
  readonly right: number
  readonly floatAnim: 1 | 2 | 3 | 4 | 5
  readonly highlighted?: boolean
}

const { t } = useI18n()

const SKILLS: readonly Skill[] = [
  { label: 'TypeScript',   size: 'lg', top: 12, right: 28, floatAnim: 1, highlighted: true },
  { label: 'React',        size: 'md', top: 22, right: 8,  floatAnim: 3, highlighted: true },
  { label: 'Vue',          size: 'sm', top: 8,  right: 12, floatAnim: 2, highlighted: true },
  { label: 'Next.js',      size: 'md', top: 38, right: 22, floatAnim: 4 },
  { label: 'React Native', size: 'lg', top: 52, right: 6,  floatAnim: 5 },
  { label: 'Node.js',      size: 'sm', top: 46, right: 36, floatAnim: 1 },
  { label: 'GraphQL',      size: 'md', top: 64, right: 18, floatAnim: 3 },
  { label: 'Docker',       size: 'sm', top: 72, right: 38, floatAnim: 2 },
  { label: 'PostgreSQL',   size: 'md', top: 78, right: 8,  floatAnim: 4 },
  { label: 'Nest.js',      size: 'sm', top: 60, right: 42, floatAnim: 5 },
  { label: 'Redux',        size: 'sm', top: 28, right: 44, floatAnim: 2 },
  { label: 'Python',       size: 'md', top: 86, right: 26, floatAnim: 1, highlighted: true },
  { label: 'Kubernetes',   size: 'sm', top: 18, right: 54, floatAnim: 3 },
  { label: 'CI/CD',        size: 'sm', top: 55, right: 54, floatAnim: 4 },
] as const

const panelRef = ref<HTMLElement | null>(null)
const bubbleEls = ref<HTMLElement[]>([])
let rafId: number | null = null

function onMouseMove(e: MouseEvent): void {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    bubbleEls.value.forEach((bubble) => {
      if (!bubble) return
      const rect = bubble.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 160
      const force = Math.max(0, 1 - dist / maxDist)
      // ease the force with a curve so it feels more organic
      const easedForce = force * force
      bubble.style.setProperty('--pull-x', `${dx * easedForce * 0.3}px`)
      bubble.style.setProperty('--pull-y', `${dy * easedForce * 0.3}px`)
    })
    rafId = null
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
  panelRef.value?.addEventListener('mousemove', onMouseMove, { passive: true })
  panelRef.value?.addEventListener('mouseleave', onMouseLeave)
})

onBeforeUnmount(() => {
  panelRef.value?.removeEventListener('mousemove', onMouseMove)
  panelRef.value?.removeEventListener('mouseleave', onMouseLeave)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section id="intro" class="home-intro" data-anchor>
    <div ref="panelRef" class="home-intro__panel">
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

      <div class="home-intro__skills" aria-hidden="true">
        <span
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
            '--appear-delay': `${skill.delay}s`
          }"
        >{{ skill.label }}</span>
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

/* ── Floating skills ── */

.home-intro__skills {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.skill-bubble {
  position: absolute;
  border-radius: 999px;
  white-space: nowrap;
  font-weight: 600;
  color: var(--color-text-soft);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px var(--glass-shadow);
  user-select: none;
  cursor: default;

  /* magnetic pull — CSS individual translate composes on top of animation transform */
  translate: var(--pull-x, 0px) var(--pull-y, 0px);
  transition: translate 0.5s cubic-bezier(0.23, 1, 0.32, 1);

  /* two-phase animation: appear once, then float forever */
  animation-fill-mode: both, none;
  animation-iteration-count: 1, infinite;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1), ease-in-out;
  animation-delay: var(--appear-delay, 0s), calc(var(--appear-delay, 0s) + 0.7s);
}

.skill-bubble--highlight {
  color: var(--color-text);
  border-color: rgba(159, 202, 60, 0.4);
}

.skill-bubble--sm {
  padding: 0.4rem 0.9rem;
  font-size: 0.78rem;
  animation-name: fadeInUp, skillFloat1; /* overridden per float class */
  animation-duration: 0.7s, 14s;
}

.skill-bubble--md {
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
  animation-name: fadeInUp, skillFloat1;
  animation-duration: 0.7s, 18s;
}

.skill-bubble--lg {
  padding: 0.6rem 1.3rem;
  font-size: 1rem;
  animation-name: fadeInUp, skillFloat1;
  animation-duration: 0.7s, 22s;
}

.skill-bubble--float-1 { animation-name: fadeInUp, skillFloat1; }
.skill-bubble--float-2 { animation-name: fadeInUp, skillFloat2; }
.skill-bubble--float-3 { animation-name: fadeInUp, skillFloat3; }
.skill-bubble--float-4 { animation-name: fadeInUp, skillFloat4; }
.skill-bubble--float-5 { animation-name: fadeInUp, skillFloat5; }

@keyframes skillFloat1 {
  0%   { transform: translate(0px, 0px); }
  18%  { transform: translate(18px, -28px); }
  40%  { transform: translate(-12px, -44px); }
  62%  { transform: translate(24px, -22px); }
  82%  { transform: translate(-8px, -36px); }
  100% { transform: translate(0px, 0px); }
}

@keyframes skillFloat2 {
  0%   { transform: translate(0px, 0px); }
  22%  { transform: translate(-24px, -32px); }
  47%  { transform: translate(14px, -50px); }
  70%  { transform: translate(-18px, -20px); }
  88%  { transform: translate(10px, -38px); }
  100% { transform: translate(0px, 0px); }
}

@keyframes skillFloat3 {
  0%   { transform: translate(0px, 0px); }
  15%  { transform: translate(28px, -16px); }
  38%  { transform: translate(10px, -46px); }
  60%  { transform: translate(-20px, -28px); }
  80%  { transform: translate(16px, -42px); }
  100% { transform: translate(0px, 0px); }
}

@keyframes skillFloat4 {
  0%   { transform: translate(0px, 0px) rotate(0deg); }
  25%  { transform: translate(-22px, -38px) rotate(-3deg); }
  52%  { transform: translate(26px, -24px) rotate(2deg); }
  75%  { transform: translate(-10px, -48px) rotate(-2deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
}

@keyframes skillFloat5 {
  0%   { transform: translate(0px, 0px) rotate(0deg); }
  20%  { transform: translate(22px, -20px) rotate(4deg); }
  45%  { transform: translate(-28px, -40px) rotate(-3deg); }
  68%  { transform: translate(16px, -52px) rotate(2deg); }
  85%  { transform: translate(-6px, -26px) rotate(-1deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
}

/* ── Text ── */

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
    opacity: 0.3;
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
