<script setup lang="ts">
defineProps<{ nameId: string; detailId: string }>()

const filters = useTemplateRef<SVGSVGElement>('filters')
const nameStrength = ref(6)
let cleanup = () => {}

onMounted(() => {
  const svg = filters.value
  const hero = svg?.parentElement
  if (!svg || !hero) return

  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
  const mobile = window.matchMedia('(max-width: 600px)')
  let inView = true

  function updatePlayback() {
    if (motion.matches && inView && !document.hidden) svg!.unpauseAnimations()
    else svg!.pauseAnimations()
  }

  function updateStrength() {
    nameStrength.value = mobile.matches ? 3 : 6
  }

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false
    updatePlayback()
  })
  observer.observe(hero)
  motion.addEventListener('change', updatePlayback)
  mobile.addEventListener('change', updateStrength)
  document.addEventListener('visibilitychange', updatePlayback)
  updateStrength()
  updatePlayback()

  cleanup = () => {
    observer.disconnect()
    motion.removeEventListener('change', updatePlayback)
    mobile.removeEventListener('change', updateStrength)
    document.removeEventListener('visibilitychange', updatePlayback)
  }
})

onBeforeUnmount(() => cleanup())
</script>

<template>
  <svg
    ref="filters"
    class="hero-liquid-filters"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter
        :id="nameId"
        x="-10%"
        y="-25%"
        width="120%"
        height="150%"
        color-interpolation-filters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009 0.018"
          numOctaves="2"
          seed="11"
          result="noise"
        >
          <animate
            attributeName="baseFrequency"
            values="0.009 0.018;0.013 0.024;0.007 0.021;0.009 0.018"
            dur="18s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          :scale="nameStrength"
          xChannelSelector="R"
          yChannelSelector="G"
        >
          <animate
            attributeName="scale"
            :values="`${nameStrength};${nameStrength * 1.4};${nameStrength * 0.7};${nameStrength}`"
            dur="14s"
            repeatCount="indefinite"
          />
        </feDisplacementMap>
      </filter>
      <filter
        :id="detailId"
        x="-10%"
        y="-25%"
        width="120%"
        height="150%"
        color-interpolation-filters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.025"
          numOctaves="1"
          seed="7"
          result="noise"
        >
          <animate
            attributeName="baseFrequency"
            values="0.012 0.025;0.018 0.018;0.012 0.025"
            dur="21s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="1.2"
          xChannelSelector="R"
          yChannelSelector="G"
        >
          <animate
            attributeName="scale"
            values="1.2;2;0.8;1.2"
            dur="16s"
            repeatCount="indefinite"
          />
        </feDisplacementMap>
      </filter>
    </defs>
  </svg>
</template>

<style scoped>
.hero-liquid-filters {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}
</style>
