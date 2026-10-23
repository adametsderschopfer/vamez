import type { Ref } from 'vue'

// CSS owns the entrance so the content also appears when JavaScript is unavailable.
export function useHeroEntrance(root: Readonly<Ref<HTMLElement | null>>) {
  const entering = ref(false)
  let cleanup = () => {}

  onMounted(() => {
    const hero = root.value
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = hero.getBoundingClientRect()
    if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return

    const animations = Array.from(hero.querySelectorAll('[data-hero-enter]')).flatMap((element) =>
      element.getAnimations().filter((animation) => animation instanceof CSSAnimation)
    )
    if (!animations.length) return

    const page = document.documentElement
    const previousOverflow = page.style.overflow
    const previousGutter = page.style.scrollbarGutter
    const scrollKeys = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '])
    entering.value = true
    page.style.scrollbarGutter = 'stable'
    page.style.overflow = 'hidden'

    function preventScroll(event: Event) {
      event.preventDefault()
    }

    function preventScrollKey(event: KeyboardEvent) {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        target.closest('input, textarea, select, button, [contenteditable="true"]')
      )
        return
      if (scrollKeys.has(event.key)) event.preventDefault()
    }

    function preventAnchorScroll(event: MouseEvent) {
      const target = event.target
      if (target instanceof Element && target.closest('a[href^="#"]')) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }

    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    document.addEventListener('keydown', preventScrollKey)
    document.addEventListener('click', preventAnchorScroll, true)

    // Release even if an animation is paused or interrupted by browser tooling.
    const fallback = window.setTimeout(() => cleanup(), 1600)
    cleanup = () => {
      window.clearTimeout(fallback)
      page.style.overflow = previousOverflow
      page.style.scrollbarGutter = previousGutter
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      document.removeEventListener('keydown', preventScrollKey)
      document.removeEventListener('click', preventAnchorScroll, true)
      entering.value = false
      cleanup = () => {}
    }
    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => cleanup())
  })

  onBeforeUnmount(() => cleanup())
  return { entering }
}
