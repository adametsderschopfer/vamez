import { onBeforeUnmount, onMounted } from 'vue'

export function useRevealOnScroll() {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const revealOffset = 32

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          const element = entry.target as HTMLElement
          element.dataset.reveal = 'visible'
          observer?.unobserve(element)
        }
      },
      { rootMargin: `0px 0px -${revealOffset}px 0px`, threshold: 0.1 }
    )

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight - revealOffset) return

      element.dataset.reveal = 'pending'
      observer?.observe(element)
    })
  })

  onBeforeUnmount(() => observer?.disconnect())
}
