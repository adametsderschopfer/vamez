import type { RouterConfig } from '@nuxt/schema'

const isJournalRoute = (path: string): boolean => path.startsWith('/journal/')

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (isJournalRoute(to.path) && isJournalRoute(from.path)) {
      return false
    }

    return { left: 0, top: 0 }
  }
}
