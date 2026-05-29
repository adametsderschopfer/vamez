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
  { label: 'TypeScript', size: 'lg', top: 10, right: 68, floatAnim: 1, highlighted: true },
  { label: 'React', size: 'md', top: 16, right: 16, floatAnim: 3, highlighted: true },
  { label: 'Vue', size: 'sm', top: 72, right: 74, floatAnim: 2, highlighted: true },
  { label: 'Next.js', size: 'md', top: 34, right: 7, floatAnim: 4 },
  { label: 'React Native', size: 'lg', top: 76, right: 10, floatAnim: 5 },
  { label: 'Node.js', size: 'sm', top: 52, right: 82, floatAnim: 1 },
  { label: 'GraphQL', size: 'md', top: 58, right: 24, floatAnim: 3 },
  { label: 'Docker', size: 'sm', top: 22, right: 58, floatAnim: 2 },
  { label: 'PostgreSQL', size: 'md', top: 86, right: 34, floatAnim: 4 },
  { label: 'Nest.js', size: 'sm', top: 40, right: 76, floatAnim: 5 },
  { label: 'Redux', size: 'sm', top: 66, right: 56, floatAnim: 2 },
  { label: 'Python', size: 'md', top: 12, right: 39, floatAnim: 1, highlighted: true },
  { label: 'DDD', size: 'sm', top: 84, right: 66, floatAnim: 3 },
  { label: 'CI/CD', size: 'sm', top: 50, right: 8, floatAnim: 4 },
  { label: 'Clean Architecture', size: 'md', top: 31, right: 34, floatAnim: 5 }
] as const

const panelRef = ref<HTMLElement | null>(null)
const bubbleEls = ref<HTMLElement[]>([])
const skillsVisible = ref(false)
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
  skillsVisible.value = true
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
        <h1 class="home-intro__title">
          <span class="home-intro__title-line">{{ `${t('home.intro.firstName')} ` }}</span>
          <span class="home-intro__title-line">{{ t('home.intro.lastName') }}</span>
        </h1>

        <div class="home-intro__contacts">
          <a
            class="home-intro__contact-link"
            href="https://t.me/adametsderschopfer"
            target="_blank"
            rel="noreferrer"
          >
            <Send :size="18" class="home-intro__contact-icon" />
            <span class="home-intro__contact-text">@adametsderschopfer</span>
          </a>
          <a class="home-intro__contact-link" href="mailto:adametsderschopfer@yandex.ru">
            <Mail :size="18" class="home-intro__contact-icon" />
            <span class="home-intro__contact-text">adametsderschopfer@yandex.ru</span>
          </a>
          <a
            class="home-intro__contact-link"
            href="https://github.com/adametsderschopfer"
            target="_blank"
            rel="noreferrer"
          >
            <Github :size="18" class="home-intro__contact-icon" />
            <span class="home-intro__contact-text">GitHub</span>
          </a>
        </div>
      </div>

      <div v-if="skillsVisible" class="home-intro__skills" aria-hidden="true">
        <span
          v-for="(skill, i) in SKILLS"
          :key="skill.label"
          :ref="
            (el) => {
              if (el) bubbleEls[i] = el as HTMLElement
            }
          "
          class="skill-bubble"
          :class="[
            `skill-bubble--${skill.size}`,
            `skill-bubble--float-${skill.floatAnim}`,
            { 'skill-bubble--highlight': skill.highlighted }
          ]"
          :style="{
            top: `${skill.top}%`,
            right: `${skill.right}%`,
            '--appear-delay': `${0.5 + i * 0.1}s`
          }"
          >{{ skill.label }}</span
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-intro {
  --home-intro-panel-radius: 2rem;
  --home-intro-edge-space: clamp(1rem, 2.7vw, 2.25rem);
  --home-intro-content-width: 52rem;
  --home-intro-grid-step: 72px;
  --home-intro-grid-color: color-mix(in srgb, var(--glass-border) 64%, transparent);
  --home-intro-axis-color: color-mix(in srgb, var(--color-accent) 20%, transparent);
  --home-intro-ring-color: color-mix(in srgb, var(--color-accent) 18%, transparent);

  min-height: 100dvh;
  padding: 20px;
  scroll-margin-top: 6rem;
}

.home-intro__panel {
  position: relative;
  display: grid;
  place-items: center;
  min-height: calc(100dvh - 40px);
  overflow: hidden;
  background-image:
    linear-gradient(180deg, rgba(var(--color-white-rgb), 0.12), transparent 34%),
    linear-gradient(
      90deg,
      transparent calc(50% - 0.5px),
      var(--home-intro-axis-color) calc(50% - 0.5px) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)
    ),
    linear-gradient(
      0deg,
      transparent calc(50% - 0.5px),
      var(--home-intro-axis-color) calc(50% - 0.5px) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)
    ),
    repeating-radial-gradient(
      circle at 50% 50%,
      transparent 0 8.25rem,
      var(--home-intro-ring-color) 8.32rem 8.38rem
    ),
    linear-gradient(
      90deg,
      transparent calc(50% - 0.5px),
      var(--home-intro-grid-color) calc(50% - 0.5px) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)
    ),
    linear-gradient(
      0deg,
      transparent calc(50% - 0.5px),
      var(--home-intro-grid-color) calc(50% - 0.5px) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)
    ),
    linear-gradient(135deg, rgba(var(--color-white-rgb), 0.07), rgba(var(--color-white-rgb), 0.02));
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, repeat, repeat, no-repeat;
  background-position: center;
  background-size:
    auto,
    auto,
    auto,
    auto,
    var(--home-intro-grid-step) 100%,
    100% var(--home-intro-grid-step),
    auto;
  border: 1px solid color-mix(in srgb, var(--glass-border) 82%, rgba(var(--color-white-rgb), 0.08));
  border-radius: var(--home-intro-panel-radius);
  box-shadow:
    inset 0 1px 0 rgba(var(--color-white-rgb), 0.12),
    0 24px 70px var(--glass-shadow);
  isolation: isolate;
  backdrop-filter: blur(12px);
}

.home-intro__panel::before,
.home-intro__panel::after {
  position: absolute;
  pointer-events: none;
  content: '';
}

.home-intro__panel::before {
  inset: var(--home-intro-edge-space);
  border: 1px solid color-mix(in srgb, var(--glass-border) 58%, transparent);
  border-radius: calc(var(--home-intro-panel-radius) - 0.7rem);
  opacity: 0.58;
}

.home-intro__panel::after {
  top: -24%;
  left: 22%;
  z-index: 0;
  width: 56%;
  height: 148%;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--color-accent) 12%, transparent),
    transparent
  );
  opacity: 0.5;
  transform: rotate(18deg);
  animation: introSweep 14s ease-in-out infinite alternate;
}

.home-intro__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3.3rem;
  align-items: center;
  justify-content: center;
  width: min(100%, var(--home-intro-content-width));
  min-height: calc(100dvh - 40px);
  padding: clamp(2rem, 7vw, 5.5rem);
  margin-inline: auto;
  text-align: center;
}

/* ── Floating skills ── */

.home-intro__skills {
  position: absolute;
  inset: 7%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.82;
  mask-image: radial-gradient(ellipse at center, transparent 0 34%, #000 62%);
}

.skill-bubble {
  position: absolute;
  font-weight: 600;
  color: var(--color-text-soft);
  white-space: nowrap;
  cursor: default;
  user-select: none;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  box-shadow: 0 2px 12px var(--glass-shadow);

  /* magnetic pull — CSS individual translate composes on top of animation transform */
  translate: var(--pull-x, 0) var(--pull-y, 0);
  transition: translate 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  animation-timing-function: ease-out, ease-in-out;
  animation-delay: var(--appear-delay, 0s), calc(var(--appear-delay, 0s) + 1s);
  animation-iteration-count: 1, infinite;

  /* two-phase animation: appear once, then float forever */
  animation-fill-mode: both, none;
}

.skill-bubble--highlight {
  color: var(--color-text);
  border-color: rgba(var(--color-accent-rgb), 0.4);
}

.skill-bubble--sm {
  padding: 0.4rem 0.9rem;
  font-size: 0.78rem;
  animation-duration: 1s, 14s;
}

.skill-bubble--md {
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
  animation-duration: 1s, 18s;
}

.skill-bubble--lg {
  padding: 0.6rem 1.3rem;
  font-size: 1rem;
  animation-duration: 1s, 22s;
}

.skill-bubble--float-1 {
  animation-name: skillAppear, skillFloat1;
}

.skill-bubble--float-2 {
  animation-name: skillAppear, skillFloat2;
}

.skill-bubble--float-3 {
  animation-name: skillAppear, skillFloat3;
}

.skill-bubble--float-4 {
  animation-name: skillAppear, skillFloat4;
}

.skill-bubble--float-5 {
  animation-name: skillAppear, skillFloat5;
}

@keyframes skillAppear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes skillFloat1 {
  0% {
    transform: translate(0, 0);
  }

  18% {
    transform: translate(18px, -28px);
  }

  40% {
    transform: translate(-12px, -44px);
  }

  62% {
    transform: translate(24px, -22px);
  }

  82% {
    transform: translate(-8px, -36px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes skillFloat2 {
  0% {
    transform: translate(0, 0);
  }

  22% {
    transform: translate(-24px, -32px);
  }

  47% {
    transform: translate(14px, -50px);
  }

  70% {
    transform: translate(-18px, -20px);
  }

  88% {
    transform: translate(10px, -38px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes skillFloat3 {
  0% {
    transform: translate(0, 0);
  }

  15% {
    transform: translate(28px, -16px);
  }

  38% {
    transform: translate(10px, -46px);
  }

  60% {
    transform: translate(-20px, -28px);
  }

  80% {
    transform: translate(16px, -42px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes skillFloat4 {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(-22px, -38px) rotate(-3deg);
  }

  52% {
    transform: translate(26px, -24px) rotate(2deg);
  }

  75% {
    transform: translate(-10px, -48px) rotate(-2deg);
  }

  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

@keyframes skillFloat5 {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  20% {
    transform: translate(22px, -20px) rotate(4deg);
  }

  45% {
    transform: translate(-28px, -40px) rotate(-3deg);
  }

  68% {
    transform: translate(16px, -52px) rotate(2deg);
  }

  85% {
    transform: translate(-6px, -26px) rotate(-1deg);
  }

  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

@keyframes introSweep {
  from {
    transform: translateX(-8%) rotate(18deg);
  }

  to {
    transform: translateX(8%) rotate(18deg);
  }
}

/* ── Text ── */

.home-intro__title {
  max-width: 11ch;
  margin: 0;
  font-size: clamp(3.7rem, 10vw, 8.6rem);
  font-weight: 700;
  line-height: 0.88;
  color: var(--color-text);
  text-align: center;
  text-wrap: balance;

  /* transform-only animation: element stays visible for LCP, just slides up */
  animation: slideUp 0.6s ease-out 0.4s both;
}

.home-intro__title-line {
  display: block;
}

.home-intro__contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  max-width: 42rem;
  animation: fadeInUp 0.6s ease-out 0.6s both;
}

.home-intro__contact-link {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 0.72rem 0.95rem;
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  line-height: 1.15;
  color: var(--color-text-soft);
  overflow-wrap: anywhere;
  text-decoration: none;
  background: color-mix(in srgb, var(--glass-bg) 68%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 82%, transparent);
  border-radius: 999px;
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-white) 22%, transparent);
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
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

.home-intro__contact-link:active {
  transform: translateX(0) scale(0.98);
}

.home-intro__contact-icon {
  flex-shrink: 0;
  margin-right: 0.6rem;
  opacity: 0.8;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (hover: hover) and (pointer: fine) {
  .home-intro__contact-link:hover {
    color: var(--color-accent);
    background: color-mix(in srgb, var(--glass-bg) 86%, transparent);
    border-color: color-mix(in srgb, var(--color-accent) 36%, var(--glass-border));
    transform: translateY(-2px) scale(1.03);
  }

  .home-intro__contact-link:hover .home-intro__contact-icon {
    transform: scale(1.2) rotate(12deg);
  }
}

@media (max-width: 900px) {
  .home-intro__skills {
    inset: 4%;
    opacity: 0.16;
  }
}

@media (max-width: 640px) {
  .home-intro {
    padding: 14px;
  }

  .home-intro__panel,
  .home-intro__content {
    min-height: calc(100dvh - 28px);
  }

  .home-intro__panel {
    border-radius: 1.5rem;
  }

  .home-intro__content {
    max-width: none;
    padding: 1.5rem;
  }

  .home-intro__panel::before {
    inset: 0.9rem;
  }

  .home-intro__skills {
    display: none;
  }
}

@media (max-width: 600px) {
  .home-intro__title {
    font-size: clamp(2.8rem, 12vw, 3.75rem);
  }

  .home-intro__contacts {
    width: auto;
    max-width: 100%;
    padding: 0.4rem;
    background: color-mix(in srgb, var(--glass-bg) 62%, transparent);
    border: 1px solid color-mix(in srgb, var(--glass-border) 82%, transparent);
    border-radius: 999px;
    box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-white) 18%, transparent);
  }

  .home-intro__contact-link {
    width: 3.15rem;
    height: 3.15rem;
    padding: 0;
  }

  .home-intro__contact-icon {
    margin-right: 0;
  }

  .home-intro__contact-text {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
  }
}

@media (max-width: 400px) {
  .home-intro__title {
    max-width: 100%;
    font-size: clamp(2.65rem, 14.2vw, 3.55rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-intro__panel::after {
    animation: none;
  }

  .skill-bubble {
    animation-duration: 0.01s, 0.01s;
    animation-iteration-count: 1, 1;
  }
}
</style>
