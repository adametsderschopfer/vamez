import type { RouterConfig } from '@nuxt/schema'

const isBlogRoute = (path: string): boolean => path === '/blog' || path.startsWith('/blog/')

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (isBlogRoute(to.path) && isBlogRoute(from.path)) {
      return false
    }

    return { left: 0, top: 0 }
  }
}
