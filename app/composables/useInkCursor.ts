import type { Ref } from 'vue'

type InkParticle = {
  element: HTMLElement
  x: number
  y: number
  scale: number
  range: number
  angleX: number
  angleY: number
}

const particleSize = 26
const followingRatio = 0.35
const wobbleAngleStep = 0.05
const frameDuration = 1000 / 60
const pressedScale = 1.5
const pressResponse = 45
const minimumPressDuration = 160

export function useInkCursor(cursor: Readonly<Ref<HTMLElement | null>>) {
  const visible = shallowRef(false)
  let dispose: (() => void) | undefined

  onMounted(() => {
    if (!cursor.value) return

    const children = cursor.value.querySelectorAll<HTMLElement>('.ink-cursor__particle')
    const particles: InkParticle[] = Array.from(children, (child, index) => {
      const scale = 1 - index / children.length
      return {
        element: child,
        x: 0,
        y: 0,
        scale,
        range: particleSize / 2 - (particleSize / 2) * scale + 2,
        angleX: Math.random() * Math.PI * 2,
        angleY: Math.random() * Math.PI * 2
      }
    })
    const stableHeadCount = Math.floor(particles.length * 0.3)
    const media = window.matchMedia(
      '(min-width: 481px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    )
    let frame: number | undefined
    let previousTime = 0
    let mouseX = 0
    let mouseY = 0
    let pressed = false
    let pressUntil = 0
    let cursorScale = 1

    function hide() {
      if (frame !== undefined) cancelAnimationFrame(frame)
      frame = undefined
      previousTime = 0
      pressed = false
      pressUntil = 0
      cursorScale = 1
      visible.value = false
    }

    function render(time: number) {
      const elapsed = previousTime ? Math.min(time - previousTime, 32) : frameDuration
      previousTime = time
      const frameRatio = elapsed / frameDuration
      const following = Math.pow(followingRatio, frameRatio)
      const targetScale = pressed || time < pressUntil ? pressedScale : 1
      cursorScale += (targetScale - cursorScale) * (1 - Math.exp(-elapsed / pressResponse))
      let x = mouseX
      let y = mouseY

      for (const [index, particle] of particles.entries()) {
        particle.x = x
        particle.y = y

        let offsetX = 0
        let offsetY = 0
        if (index > stableHeadCount) {
          particle.angleX += wobbleAngleStep * frameRatio
          particle.angleY += wobbleAngleStep * frameRatio
          offsetX = Math.sin(particle.angleX) * particle.range * cursorScale
          offsetY = Math.sin(particle.angleY) * particle.range * cursorScale
        }

        particle.element.style.transform = `translate(${particle.x + offsetX}px, ${particle.y + offsetY}px) scale(${particle.scale * cursorScale})`

        const next = particles[index + 1]
        if (!next) continue
        x += (next.x - particle.x) * following
        y += (next.y - particle.y) * following
      }

      frame = requestAnimationFrame(render)
    }

    function move(event: PointerEvent) {
      if (!media.matches || event.pointerType !== 'mouse' || document.hidden) return
      mouseX = event.clientX - particleSize / 2
      mouseY = event.clientY - particleSize / 2
      pressed = (event.buttons & 1) !== 0

      if (!visible.value) {
        for (const particle of particles) {
          particle.x = mouseX
          particle.y = mouseY
        }
      }

      visible.value = true
      if (frame === undefined) frame = requestAnimationFrame(render)
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) hide()
    }

    function press(event: PointerEvent) {
      if (!media.matches || event.pointerType !== 'mouse' || event.button !== 0 || document.hidden)
        return
      move(event)
      pressed = true
      pressUntil = performance.now() + minimumPressDuration
    }

    function release(event: PointerEvent) {
      if (event.pointerType === 'mouse' && event.button === 0) pressed = false
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Tab') hide()
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', press, { passive: true, capture: true })
    window.addEventListener('pointerup', release, { passive: true, capture: true })
    window.addEventListener('pointercancel', hide)
    window.addEventListener('pointerout', leave)
    window.addEventListener('blur', hide)
    window.addEventListener('resize', hide)
    window.addEventListener('keydown', handleKey)
    document.addEventListener('visibilitychange', hide)
    media.addEventListener('change', hide)

    dispose = () => {
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', press, true)
      window.removeEventListener('pointerup', release, true)
      window.removeEventListener('pointercancel', hide)
      window.removeEventListener('pointerout', leave)
      window.removeEventListener('blur', hide)
      window.removeEventListener('resize', hide)
      window.removeEventListener('keydown', handleKey)
      document.removeEventListener('visibilitychange', hide)
      media.removeEventListener('change', hide)
    }
  })

  onBeforeUnmount(() => dispose?.())

  return { visible }
}
