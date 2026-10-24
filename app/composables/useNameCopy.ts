import type { Ref } from 'vue'

const escapePattern = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function useNameCopy(root: Readonly<Ref<HTMLElement | null>>) {
  function copy(event: ClipboardEvent) {
    if (event.defaultPrevented) return
    if (
      event.target instanceof HTMLElement &&
      event.target.closest('input, textarea, [contenteditable="true"]')
    )
      return
    const heading = root.value
    const selection = window.getSelection()
    if (!heading || !event.clipboardData || !selection?.rangeCount || selection.isCollapsed) return
    const range = selection.getRangeAt(0)
    if (!range.intersectsNode(heading)) return

    // Inline animated glyphs can lose line breaks and whitespace during native copy.
    // Read only the selected portions, so partial names and larger selections still work.
    const fragment = range.cloneContents()
    const first = fragment.querySelector('[data-name-part="first"]')?.textContent?.trim()
    const last = fragment.querySelector('[data-name-part="last"]')?.textContent?.trim()
    if (!first || !last) return

    const name = `${first} ${last}`
    const nameOnly = heading.contains(range.startContainer) && heading.contains(range.endContainer)
    const original = selection.toString()
    const pattern = new RegExp(`${escapePattern(first)}\\s*${escapePattern(last)}`)
    if (!nameOnly && !pattern.test(original)) return

    event.clipboardData.setData(
      'text/plain',
      nameOnly ? name : original.replace(pattern, () => name)
    )
    event.preventDefault()
  }

  onMounted(() => document.addEventListener('copy', copy))
  onBeforeUnmount(() => document.removeEventListener('copy', copy))
}
