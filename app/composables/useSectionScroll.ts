type HomeSectionId = 'about' | 'contacts' | 'top'

export function useSectionScroll() {
  function scrollToSection(id: HomeSectionId, event?: MouseEvent) {
    if (
      event &&
      (event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey)
    ) {
      return
    }

    const section = document.getElementById(id)
    if (!section) return

    event?.preventDefault()

    if (window.location.hash === `#${id}`) {
      section.scrollIntoView({ block: 'start' })
    } else {
      window.location.hash = id
    }

    const heading = section.querySelector<HTMLElement>('h1, h2') ?? section
    const needsTabIndex = !heading.hasAttribute('tabindex')
    if (needsTabIndex) heading.setAttribute('tabindex', '-1')
    heading.focus({ preventScroll: true })

    if (needsTabIndex) {
      heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true })
    }
  }

  return { scrollToSection }
}
