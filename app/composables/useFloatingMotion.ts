import type { Ref } from 'vue'

const minimumDuration = 18000
const durationVariation = 12000
const waypointCount = 6
const floatEasing = 'cubic-bezier(0.77, 0, 0.175, 1)'

export function useFloatingMotion(
  root: Readonly<Ref<HTMLElement | null>>,
  {
    selector,
    driftDistance = 12,
    rotationRange = 4
  }: {
    selector: string
    driftDistance?: number
    rotationRange?: number
  }
) {
  let cleanup = () => {}
  let refresh = () => {}

  onMounted(() => {
    if (!root.value) return

    const container = root.value
    let elements = Array.from(container.querySelectorAll<HTMLElement>(selector))
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

    refresh = () => {
      const current = Array.from(container.querySelectorAll<HTMLElement>(selector))
      if (
        current.length === elements.length &&
        current.every((element, index) => element === elements[index])
      )
        return
      elements = current
      createMotion()
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

  onUpdated(() => refresh())
  onBeforeUnmount(() => cleanup())
}
