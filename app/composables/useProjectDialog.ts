import { nextTick, onBeforeUnmount, ref, shallowRef } from 'vue'
import type { Project } from '@/types/projects'

export function useProjectDialog() {
  const selectedProject = shallowRef<Project | null>(null)
  const transitionProjectId = ref<string | null>(null)
  const dialogRef = ref<{ focusClose: () => void } | null>(null)
  let returnFocus: HTMLButtonElement | null = null
  let previousOverflow = ''
  let transitioning = false

  async function updateWithTransition(update: () => Promise<void>) {
    if (
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      await document.startViewTransition(update).finished
    } else {
      await update()
    }
  }

  async function openProject(project: Project, trigger: HTMLButtonElement) {
    if (transitioning || selectedProject.value) return
    transitioning = true
    returnFocus = trigger
    transitionProjectId.value = project.projectId
    await nextTick()

    try {
      await updateWithTransition(async () => {
        previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        selectedProject.value = project
        await nextTick()
      })
    } finally {
      transitioning = false
      dialogRef.value?.focusClose()
    }
  }

  async function closeProject() {
    if (transitioning || !selectedProject.value) return
    transitioning = true

    try {
      await updateWithTransition(async () => {
        selectedProject.value = null
        document.body.style.overflow = previousOverflow
        await nextTick()
      })
    } finally {
      transitioning = false
      transitionProjectId.value = null
      const focusTarget = returnFocus
      returnFocus = null
      focusTarget?.focus()
    }
  }

  onBeforeUnmount(() => {
    if (selectedProject.value) document.body.style.overflow = previousOverflow
  })

  return { selectedProject, transitionProjectId, dialogRef, openProject, closeProject }
}
