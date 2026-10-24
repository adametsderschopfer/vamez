import type { Ref } from 'vue'

const responseTime = 100
const settleThreshold = 0.02
const strengths = {
  letter: { radius: 160, distance: 12, rotation: 4 },
  shape: { radius: 260, distance: 20, rotation: 6 },
  detail: { radius: 280, distance: 4, rotation: 0.4 }
} as const

type Kind = keyof typeof strengths
type Target = {
  element: HTMLElement
  kind: Kind
  x: number
  y: number
  angle: number
  goalX: number
  goalY: number
  goalAngle: number
}

export function useHeroPointerMotion(root: Readonly<Ref<HTMLElement | null>>) {
  let cleanup = () => {}
  let refresh = () => {}

  onMounted(() => {
    const hero = root.value
    if (!hero) return
    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    )
    let targets: Target[] = []
    let pointer: { x: number; y: number } | null = null
    let frame = 0
    let previousTime = 0
    let needsMeasurement = false

    function reset() {
      cancelAnimationFrame(frame)
      frame = 0
      previousTime = 0
      pointer = null
      needsMeasurement = false
      targets.forEach((target) => {
        target.element.style.removeProperty('transform')
        target.x = target.y = target.angle = 0
        target.goalX = target.goalY = target.goalAngle = 0
      })
    }

    refresh = () => {
      reset()
      targets = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-react]')).flatMap(
        (element) => {
          const kind = element.dataset.heroReact as Kind
          return kind in strengths
            ? [{ element, kind, x: 0, y: 0, angle: 0, goalX: 0, goalY: 0, goalAngle: 0 }]
            : []
        }
      )
    }

    function render(time: number) {
      const delta = previousTime ? Math.min(time - previousTime, 64) : 16
      const blend = 1 - Math.exp(-delta / responseTime)
      previousTime = time
      // Measure once for the latest mouse move, never on every settling frame.
      if (needsMeasurement && pointer) {
        const bounds = targets.map((target) => target.element.getBoundingClientRect())
        targets.forEach((target, index) => {
          const box = bounds[index]!
          const strength = strengths[target.kind]
          const dx = box.left + box.width / 2 - target.x - (pointer?.x ?? 0)
          const dy = box.top + box.height / 2 - target.y - (pointer?.y ?? 0)
          const distance = Math.hypot(dx, dy)
          const radius = Math.max(strength.radius, box.width * 0.65)
          const influence = Math.max(0, 1 - distance / radius) ** 2
          const force = influence * strength.distance
          target.goalX = (dx / Math.max(distance, 1)) * force
          target.goalY = (dy / Math.max(distance, 1)) * force
          target.goalAngle = (dx / Math.max(distance, 1)) * influence * strength.rotation
        })
        needsMeasurement = false
      }
      let moving = false
      targets.forEach((target) => {
        target.x += (target.goalX - target.x) * blend
        target.y += (target.goalY - target.y) * blend
        target.angle += (target.goalAngle - target.angle) * blend
        const unsettled =
          Math.abs(target.goalX - target.x) +
            Math.abs(target.goalY - target.y) +
            Math.abs(target.goalAngle - target.angle) >
          settleThreshold
        moving ||= unsettled
        if (!pointer && !unsettled) {
          target.element.style.removeProperty('transform')
          target.x = target.y = target.angle = 0
        } else {
          target.element.style.transform = `translate3d(${target.x.toFixed(2)}px, ${target.y.toFixed(2)}px, 0) rotate(${target.angle.toFixed(2)}deg)`
        }
      })
      frame = moving ? requestAnimationFrame(render) : 0
      if (!frame) previousTime = 0
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render)
    }

    function leave() {
      pointer = null
      needsMeasurement = false
      targets.forEach((target) => {
        target.goalX = target.goalY = target.goalAngle = 0
      })
      schedule()
    }

    function move(event: PointerEvent) {
      if (!media.matches || event.pointerType !== 'mouse' || document.hidden) return
      if (event.buttons || hero?.querySelector('[inert]')) return leave()
      pointer = { x: event.clientX, y: event.clientY }
      needsMeasurement = true
      schedule()
    }

    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerdown', leave)
    hero.addEventListener('pointerleave', leave)
    window.addEventListener('scroll', leave, { passive: true })
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', reset)
    media.addEventListener('change', reset)
    refresh()

    cleanup = () => {
      reset()
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerdown', leave)
      hero.removeEventListener('pointerleave', leave)
      window.removeEventListener('scroll', leave)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', reset)
      media.removeEventListener('change', reset)
    }
  })

  onUpdated(() => refresh())
  onBeforeUnmount(() => cleanup())
}
