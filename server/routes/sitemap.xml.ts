import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { defineEventHandler, setHeader } from 'h3'

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function toAbsoluteUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.replace(/\/$/, '')
  return `${normalizedBase}${path}`
}

async function readMarkdownSlugs(contentRoot: string): Promise<string[]> {
  const localeDirs = ['en', 'ru']
  const slugs = new Set<string>()

  for (const localeDir of localeDirs) {
    const localePath = resolve(contentRoot, localeDir)

    let entries: Awaited<ReturnType<typeof fs.readdir>> = []
    try {
      entries = await fs.readdir(localePath, { withFileTypes: true })
    } catch {
      continue
    }

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.md')) continue

      const filePath = resolve(localePath, entry.name)
      const raw = await fs.readFile(filePath, 'utf-8')
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/)
      if (!frontmatterMatch) continue

      const slugMatch = frontmatterMatch[1].match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m)
      if (!slugMatch) continue

      const slug = slugMatch[1].trim()
      if (slug) slugs.add(slug)
    }
  }

  return Array.from(slugs).sort((a, b) => a.localeCompare(b))
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const siteUrl = String(runtimeConfig.public.siteUrl || 'https://vamez.ru')
  const blogContentRoot = resolve(process.cwd(), 'content', 'blog')
  const blogSlugs = await readMarkdownSlugs(blogContentRoot)

  const paths = ['/', '/blog', ...blogSlugs.map((slug) => `/blog/${encodeURIComponent(slug)}`)]

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths
      .map((path) => `  <url><loc>${escapeXml(toAbsoluteUrl(siteUrl, path))}</loc></url>`)
      .join('\n') +
    `\n</urlset>`

  setHeader(event, 'content-type', 'application/xml; charset=UTF-8')
  return xml
})
