import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { watch } from 'node:fs'
import { join } from 'node:path'
import { convertImages, imageDirectories } from './convert-images'

export default defineNuxtModule({
  meta: { name: 'content-webp' },
  async setup(_, nuxt) {
    const root = nuxt.options.rootDir
    await convertImages(root)
    if (!nuxt.options.dev) return

    const logger = useLogger('webp')
    let timer: ReturnType<typeof setTimeout> | undefined
    let pending = Promise.resolve()
    function schedule() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        pending = pending
          .then(async () => {
            await convertImages(root)
          })
          .catch((error) => {
            logger.error(error)
          })
      }, 200)
    }
    const watchers = imageDirectories.map((directory) =>
      watch(join(root, directory), { recursive: true }, (_, file) => {
        if (file && /\.(png|jpe?g|gif|avif|tiff?|bmp)$/i.test(file)) schedule()
      })
    )
    nuxt.hook('builder:watch', (_, file) => {
      if (/\.(vue|[cm]?[jt]s|css|json|md)$/i.test(file)) schedule()
    })
    nuxt.hook('close', () => {
      clearTimeout(timer)
      watchers.forEach((watcher) => watcher.close())
    })
  }
})
