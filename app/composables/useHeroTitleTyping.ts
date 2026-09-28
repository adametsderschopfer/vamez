import { computed, type Ref } from 'vue'

const characterDuration = 45
const highlightDuration = 380
const initialDelay = 120

interface TypedWord {
  text: string
  delay: number
  duration: number
  steps: number
}

function scheduleWords(text: string, startAt: number): TypedWord[] {
  let nextStart = startAt

  return text.split(' ').map((word) => {
    const steps = Array.from(word).length
    const duration = steps * characterDuration
    const scheduled = { text: word, delay: nextStart, duration, steps }

    nextStart += duration + characterDuration
    return scheduled
  })
}

export function useHeroTitleTyping(start: Ref<string>, accent: Ref<string>) {
  const startWords = computed(() => scheduleWords(start.value, initialDelay))
  const highlightDelay = computed(() => {
    const lastWord = startWords.value.at(-1)
    return lastWord ? lastWord.delay + lastWord.duration + characterDuration : initialDelay
  })
  const accentWords = computed(() =>
    scheduleWords(accent.value, highlightDelay.value + highlightDuration)
  )

  return { startWords, accentWords, highlightDelay, highlightDuration }
}
