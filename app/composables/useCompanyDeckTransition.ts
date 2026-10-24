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
    const previousHeight = list.offsetHeight
    const incomingTransform = getComputedStyle(incoming).transform
    const duration = reduced ? 0 : 120
    const easing = getComputedStyle(element).getPropertyValue('--ease-out').trim()

    try {
      await scrollToStart(element, reduced)
      if (disposed) return
      const lift = outgoing.animate(
        [{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-1.5rem) scale(0.97)' }],
        { duration: reduced ? 0 : 60, easing, fill: 'forwards' }
      )
      animations = [lift]
      await lift.finished
      if (disposed) return
      list.style.height = `${previousHeight}px`
      activeIndex.value = index
      await nextTick()
      const nextHeight = incoming.offsetHeight
      const outgoingTransform = getComputedStyle(outgoing).getPropertyValue('--deck-rest-transform')
      lift.cancel()
      animations = [
        outgoing.animate(
          [{ transform: 'translateY(-1.5rem) scale(0.97)' }, { transform: outgoingTransform }],
          { duration, easing }
        ),
        incoming.animate(
          [{ transform: incomingTransform }, { transform: 'translateY(0) scale(1)' }],
          {
            duration,
            easing
          }
        ),
        list.animate([{ height: `${previousHeight}px` }, { height: `${nextHeight}px` }], {
          duration,
          easing,
          fill: 'forwards'
        })
      ]
      await Promise.all(animations.map((animation) => animation.finished))
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) throw error
    } finally {
      list.style.removeProperty('height')
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
