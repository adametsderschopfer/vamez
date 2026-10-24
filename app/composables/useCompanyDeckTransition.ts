export function useCompanyDeckTransition(
  root: Readonly<Ref<HTMLElement | null>>,
  count: () => number
) {
  const activeIndex = shallowRef(0)
  const switching = shallowRef(false)
  let animations: Animation[] = []
  let disposed = false
  let cancelScrollWait = () => {}

  async function scrollToStart(element: HTMLElement, reduced: boolean) {
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0
    if (Math.abs(element.getBoundingClientRect().top - padding - margin) < 2) return
    if (reduced) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' })
      return
    }
    await new Promise<void>((resolve) => {
      function finish() {
        clearTimeout(timeout)
        window.removeEventListener('scrollend', finish)
        cancelScrollWait = () => {}
        resolve()
      }
      const timeout = window.setTimeout(finish, 1000)
      cancelScrollWait = finish
      window.addEventListener('scrollend', finish, { once: true })
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  async function goTo(index: number) {
    const element = root.value
    if (!element || switching.value || index === activeIndex.value || index < 0 || index >= count())
      return
    const list = element.querySelector<HTMLElement>('.company-deck__cards')
    const outgoing = list?.querySelector<HTMLElement>('.company-deck__card--active')
    const incoming = list?.querySelector<HTMLElement>(`[data-company-index="${index}"]`)
    if (!list || !outgoing || !incoming) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    switching.value = true
    const duration = 120
    const easing = getComputedStyle(element).getPropertyValue('--ease-out').trim()

    try {
      await scrollToStart(element, reduced)
      if (disposed) return
      if (reduced) {
        activeIndex.value = index
        return
      }
      const previousHeight = list.offsetHeight
      list.style.height = `${previousHeight}px`
      list.style.clipPath = 'inset(0)'
      const fadeOut = outgoing.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 60,
        easing,
        fill: 'forwards'
      })
      animations = [fadeOut]
      await fadeOut.finished
      if (disposed) return
      incoming.style.opacity = '0'
      activeIndex.value = index
      await nextTick()
      if (disposed) return
      const nextHeight = incoming.offsetHeight
      animations.push(
        incoming.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration,
          easing,
          fill: 'both'
        }),
        list.animate([{ height: `${previousHeight}px` }, { height: `${nextHeight}px` }], {
          duration,
          easing,
          fill: 'forwards'
        })
      )
      await Promise.all(animations.map((animation) => animation.finished))
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) throw error
    } finally {
      incoming.style.removeProperty('opacity')
      list.style.removeProperty('height')
      list.style.removeProperty('clip-path')
      animations.forEach((animation) => animation.cancel())
      animations = []
      switching.value = false
    }
  }

  onBeforeUnmount(() => {
    disposed = true
    cancelScrollWait()
    animations.forEach((animation) => animation.cancel())
  })
  return { activeIndex: readonly(activeIndex), switching: readonly(switching), goTo }
}
