import { onBeforeUnmount } from 'vue'

const dialogRestingTransform = 'translate(-50%, -50%)'
const dialogHiddenTransform = `${dialogRestingTransform} translateY(12px) scale(0.98)`
const dialogOpenDuration = 280
const dialogCloseDuration = 180

export function useDialogMotion() {
  let animations: Animation[] = []

  function resetMotion() {
    animations.forEach((animation) => animation.cancel())
    animations = []
  }

  async function playMotion(
    direction: 'open' | 'close',
    panel: HTMLElement | null,
    backdrop: HTMLElement | null
  ) {
    if (!panel || !backdrop) return true
    const panelStyle = getComputedStyle(panel)
    const initialPanel =
      direction === 'open'
        ? { opacity: '0', transform: dialogHiddenTransform }
        : { opacity: panelStyle.opacity, transform: panelStyle.transform }
    const initialBackdropOpacity = direction === 'open' ? '0' : getComputedStyle(backdrop).opacity
    resetMotion()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true

    const opening = direction === 'open'
    const options: KeyframeAnimationOptions = {
      duration: opening ? dialogOpenDuration : dialogCloseDuration,
      easing: opening ? 'cubic-bezier(0.22, 1, 0.36, 1)' : 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'both'
    }
    animations = [
      panel.animate(
        [
          initialPanel,
          {
            opacity: opening ? '1' : '0',
            transform: opening ? dialogRestingTransform : dialogHiddenTransform
          }
        ],
        options
      ),
      backdrop.animate(
        [{ opacity: initialBackdropOpacity }, { opacity: opening ? '1' : '0' }],
        options
      )
    ]

    const results = await Promise.allSettled(animations.map((animation) => animation.finished))
    return results.every((result) => result.status === 'fulfilled')
  }

  onBeforeUnmount(resetMotion)

  return { playMotion, resetMotion }
}
