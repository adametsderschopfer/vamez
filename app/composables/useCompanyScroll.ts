import type { Ref } from 'vue'

export function useCompanyScroll(root: Ref<HTMLElement | null>, keys: () => string[]) {
  const active = shallowRef('')
  let frame = 0
  let observer: ResizeObserver | undefined
  function update() {
    frame = 0
    const sections = root.value?.querySelectorAll<HTMLElement>('[data-company]')
    if (!sections?.length) {
      active.value = ''
      return
    }
    const lastSection = sections[sections.length - 1]!
    // The final section may never reach the sticky header on a tall viewport.
    if (
      window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1
    ) {
      active.value = lastSection.dataset.company ?? ''
      return
    }
    const threshold =
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) +
      parseFloat(getComputedStyle(sections[0]!).scrollMarginTop) +
      4
    let current = sections[0]!
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section
    }
    active.value = current.dataset.company ?? ''
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update)
  }
  function navigate(key: string) {
    const section = Array.from(
      root.value?.querySelectorAll<HTMLElement>('[data-company]') ?? []
    ).find((element) => element.dataset.company === key)
    section?.scrollIntoView({
      block: 'start',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    })
    section?.focus({ preventScroll: true })
  }
  watch(keys, async () => {
    await nextTick()
    schedule()
  })
  onMounted(() => {
    update()
    observer = new ResizeObserver(schedule)
    if (root.value) observer.observe(root.value)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  })
  onBeforeUnmount(() => {
    observer?.disconnect()
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })
  return { active, navigate }
}
