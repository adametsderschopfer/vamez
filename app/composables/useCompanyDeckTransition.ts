export function useCompanyDeckTransition(
  root: Readonly<Ref<HTMLElement | null>>,
  count: () => number
) {
  const activeIndex = shallowRef(0)

  async function goTo(index: number) {
    if (!root.value || index === activeIndex.value || index < 0 || index >= count()) return

    activeIndex.value = index
    await nextTick()

    root.value?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start'
    })
  }

  return { activeIndex: readonly(activeIndex), goTo }
}
