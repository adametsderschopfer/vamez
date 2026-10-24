import { readdir, readFile, rename, unlink, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const rasterPattern = /\.(?:png|jpe?g|gif|avif|tiff?|bmp)$/i
const textPattern = /\.(?:vue|[cm]?[jt]s|css|json|md)$/i
export const imageDirectories = ['app/assets/images', 'public/images']

async function filesIn(directory: string): Promise<string[]> {
  if (!existsSync(directory)) return []
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const file = join(directory, entry.name)
      return entry.isDirectory() ? filesIn(file) : Promise.resolve(entry.isFile() ? [file] : [])
    })
  )
  return nested.flat()
}

function webpReference(value: string, source: string, root: string): string {
  const separator = value.search(/[?#]/)
  const asset = separator < 0 ? value : value.slice(0, separator)
  const suffix = separator < 0 ? '' : value.slice(separator)
  if (!asset || !rasterPattern.test(asset) || /^(?:https?:|data:|\/\/)/i.test(asset)) return value
  let file: string
  if (asset.startsWith('@/') || asset.startsWith('~/')) file = join(root, 'app', asset.slice(2))
  else if (asset.startsWith('/')) file = join(root, 'public', asset.slice(1))
  else file = resolve(dirname(source), asset)
  // Only content images are converted; platform icons and social previews keep their formats.
  if (!imageDirectories.some((directory) => file.startsWith(join(root, directory) + '/')))
    return value
  const output = file.slice(0, -extname(file).length) + '.webp'
  return existsSync(output) ? asset.slice(0, -extname(asset).length) + '.webp' + suffix : value
}

export async function convertImages(root: string, check = false) {
  const images = (
    await Promise.all(imageDirectories.map((directory) => filesIn(join(root, directory))))
  )
    .flat()
    .filter((file) => rasterPattern.test(file))
  if (check && images.length) {
    throw new Error(
      `Convert content images with npm run images:convert:\n${images.map((file) => relative(root, file)).join('\n')}`
    )
  }

  for (const file of images) {
    const output = file.slice(0, -extname(file).length) + '.webp'
    const temporary = `${output}.tmp`
    try {
      const metadata = await sharp(file, { animated: true }).metadata()
      const lossless = extname(file).toLowerCase() === '.png' && (metadata.width ?? 0) <= 512
      await sharp(file, { animated: true })
        .webp({ quality: 84, alphaQuality: 100, lossless, effort: 4 })
        .toFile(temporary)
      await rename(temporary, output)
    } catch (error) {
      await unlink(temporary).catch(() => {})
      throw error
    }
  }

  const sources = (
    await Promise.all(['app', 'content'].map((directory) => filesIn(join(root, directory))))
  )
    .flat()
    .filter((file) => textPattern.test(file))
  let updated = 0
  for (const source of sources) {
    const original = await readFile(source, 'utf8')
    const quoted = original.replace(
      /(['"])([^'"\n]+?\.(?:png|jpe?g|gif|avif|tiff?|bmp)(?:[?#][^'"\n]*)?)\1/gi,
      (_, quote: string, value: string) => `${quote}${webpReference(value, source, root)}${quote}`
    )
    const result = quoted.replace(
      /(url\(\s*|\]\()([^'"\s)]+?\.(?:png|jpe?g|gif|avif|tiff?|bmp)(?:[?#][^\s)]*)?)(\s*\))/gi,
      (_, before: string, value: string, after: string) =>
        `${before}${webpReference(value, source, root)}${after}`
    )
    if (result === original) continue
    if (check)
      throw new Error(
        `Outdated image reference in ${relative(root, source)}. Run npm run images:convert.`
      )
    await writeFile(source, result)
    updated++
  }

  // Remove originals only after their replacements and reference updates have succeeded.
  if (!check) await Promise.all(images.map((file) => unlink(file)))
  if (images.length || updated)
    process.stdout.write(
      `[webp] Converted ${images.length} images; updated ${updated} source files.\n`
    )
  return { converted: images.length, updated }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await convertImages(process.cwd(), process.argv.includes('--check'))
}
