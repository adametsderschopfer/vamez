export function useMarqueeMotion(track: Readonly<Ref<HTMLElement | null>>) {
  const slowdownDuration = 450
  let frame = 0
  let hovering = false

  function getAnimation() {
    return track.value?.getAnimations().find((animation) => animation instanceof CSSAnimation)
  }

  function setHover(event: PointerEvent, active: boolean) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return

    hovering = active
    cancelAnimationFrame(frame)

    const animation = getAnimation()
    if (!animation) return

    const start = performance.now()
    const from = animation.playbackRate
    const to = active ? 0 : 1

    function update(now: number) {
      const progress = Math.min((now - start) / slowdownDuration, 1)
      const eased = progress * progress * (3 - 2 * progress)
      animation?.updatePlaybackRate(from + (to - from) * eased)

      if (progress < 1) frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
  }

  function scrollLogos(event: WheelEvent) {
    if (!hovering || event.ctrlKey || !event.cancelable) return

    const animation = getAnimation()
    const cycleWidth = track.value?.firstElementChild?.getBoundingClientRect().width
    const duration = animation?.effect?.getTiming().duration
    const time = animation?.currentTime
    if (!animation || !cycleWidth || typeof duration !== 'number' || typeof time !== 'number') {
      return
    }

    const horizontalDelta = event.shiftKey ? event.deltaX || event.deltaY : event.deltaX
    if (!event.shiftKey && Math.abs(event.deltaY) >= Math.abs(horizontalDelta)) return

    const units = [1, 16, Math.min(cycleWidth, window.innerWidth)]
    const delta = horizontalDelta * (units[event.deltaMode] ?? 1)
    if (!delta) return

    event.preventDefault()
    const nextTime = time + (delta / cycleWidth) * duration
    animation.currentTime = ((nextTime % duration) + duration) % duration
  }

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return { setHover, scrollLogos }
}
