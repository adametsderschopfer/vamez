import { brotliCompressSync, gzipSync } from 'node:zlib'

const COMPRESSIBLE = /text\/|application\/(javascript|json|xml)|image\/svg/

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:response', (response, { event }) => {
    const contentType = (response.headers?.['content-type'] as string) ?? ''
    if (!COMPRESSIBLE.test(contentType)) return

    const acceptEncoding = getRequestHeader(event, 'accept-encoding') ?? ''
    const body = response.body

    if (typeof body !== 'string' && !Buffer.isBuffer(body)) return

    const buffer = Buffer.isBuffer(body) ? body : Buffer.from(body)

    if (acceptEncoding.includes('br')) {
      response.body = brotliCompressSync(buffer)
      response.headers = { ...response.headers, 'content-encoding': 'br' }
    } else if (acceptEncoding.includes('gzip')) {
      response.body = gzipSync(buffer, { level: 6 })
      response.headers = { ...response.headers, 'content-encoding': 'gzip' }
    }
  })
})
