import type { Ref } from 'vue'

const driftDistance = 12
const rotationRange = 4
const minimumDuration = 18000
const durationVariation = 12000
const waypointCount = 6
const floatEasing = 'cubic-bezier(0.77, 0, 0.175, 1)'

export function useFloatingPrimitives(root: Readonly<Ref<HTMLElement | null>>) {
  let cleanup = () => {}

  onMounted(() => {
    if (!root.value) return

    const elements = Array.from(
      root.value.querySelectorAll<HTMLElement>('.home-hero-primitives__item')
    )
    const media = window.matchMedia('(prefers-reduced-motion: no-preference)')
    let animations: Animation[] = []
    let inView = true

    function updatePlayback() {
      const playing = inView && !document.hidden
      animations.forEach((animation) => (playing ? animation.play() : animation.pause()))
    }

    function createMotion() {
      animations.forEach((animation) => animation.cancel())
      animations = []
      if (!media.matches) return

      animations = elements.map((element) => {
        const baseRotation = Number.parseFloat(getComputedStyle(element).rotate) || 0
        const origin = {
          translate: '0px 0px',
          rotate: `${baseRotation}deg`,
          easing: floatEasing
        }
        const waypoints = Array.from({ length: waypointCount }, () => ({
          translate: `${(Math.random() * 2 - 1) * driftDistance}px ${(Math.random() * 2 - 1) * driftDistance}px`,
          rotate: `${baseRotation + (Math.random() * 2 - 1) * rotationRange}deg`,
          easing: floatEasing
        }))

        return element.animate([origin, ...waypoints, origin], {
          duration: minimumDuration + Math.random() * durationVariation,
          iterations: Infinity
        })
      })
      updatePlayback()
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false
      updatePlayback()
    })
    observer.observe(root.value)
    media.addEventListener('change', createMotion)
    document.addEventListener('visibilitychange', updatePlayback)
    createMotion()

    cleanup = () => {
      observer.disconnect()
      media.removeEventListener('change', createMotion)
      document.removeEventListener('visibilitychange', updatePlayback)
      animations.forEach((animation) => animation.cancel())
    }
  })

  onBeforeUnmount(() => cleanup())
}
