type SectionId = 'about' | 'personal-projects' | 'cases' | 'contacts' | 'top' | 'main-content'

export function useSectionScroll() {
  function scrollToSection(id: SectionId, event?: MouseEvent) {
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

    section.scrollIntoView({ block: 'start' })

    // Pointer navigation only scrolls; keyboard navigation also moves focus.
    if (event && event.detail > 0) return

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
