export function useScrollReveal(threshold = 0.15) {
  const containerRef = ref<HTMLElement | null>(null)
  const isRevealed = ref(false)

  onMounted(() => {
    const el = containerRef.value
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isRevealed.value = true
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)

    onBeforeUnmount(() => observer.disconnect())
  })

  return { containerRef, isRevealed }
}
