import { nextTick, onBeforeUnmount, ref, shallowRef } from 'vue'
import type { Project } from '@/types/projects'

export function useProjectDialog() {
  const selectedProject = shallowRef<Project | null>(null)
  const dialogRef = ref<{
    focusClose: () => void
    animateClose: () => Promise<boolean>
  } | null>(null)
  let returnFocus: HTMLButtonElement | null = null
  let previousOverflow = ''
  let isClosing = false

  async function openProject(project: Project, trigger: HTMLButtonElement) {
    if (selectedProject.value) return
    returnFocus = trigger
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    selectedProject.value = project
    await nextTick()
    dialogRef.value?.focusClose()
  }

  async function closeProject() {
    if (isClosing || !selectedProject.value) return
    isClosing = true
    const completed = await dialogRef.value?.animateClose()
    if (completed === false) return
    selectedProject.value = null
    document.body.style.overflow = previousOverflow
    await nextTick()
    isClosing = false
    const focusTarget = returnFocus
    returnFocus = null
    focusTarget?.focus({ preventScroll: true })
  }

  onBeforeUnmount(() => {
    if (selectedProject.value) document.body.style.overflow = previousOverflow
  })

  return { selectedProject, dialogRef, openProject, closeProject }
}
