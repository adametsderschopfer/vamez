type HomeSectionId = 'about' | 'contacts' | 'top'

export function useSectionScroll() {
  function scrollToSection(id: HomeSectionId) {
    document.getElementById(id)?.scrollIntoView({ block: 'start' })

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        '',
        window.location.pathname + window.location.search
      )
    }
  }

  return { scrollToSection }
}
