import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const localizedText = z.object({ ru: z.string(), en: z.string() })
const image = z.object({
  src: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive()
})

export default defineContentConfig({
  collections: {
    companies: defineCollection({
      type: 'data',
      source: 'companies/*.json',
      schema: z.object({
        key: z.string(),
        order: z.number().int().nonnegative(),
        name: z.string(),
        logo: z.string(),
        logoDark: z.string(),
        logoKind: z.enum(['wordmark', 'symbol']).default('wordmark'),
        logoMonochrome: z.boolean().default(false),
        role: localizedText.optional(),
        summary: localizedText.optional(),
        status: z.enum(['active', 'closed']).default('active'),
        url: z.string().url(),
        tone: z.enum(['accent', 'paper']),
        industry: localizedText,
        period: localizedText,
        statement: localizedText
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/**/*.json',
      schema: z.object({
        key: z.string(),
        company: z.string(),
        order: z.number().int().nonnegative(),
        title: localizedText,
        description: localizedText,
        sections: z
          .array(
            z.object({
              title: localizedText,
              description: localizedText
            })
          )
          .optional(),
        contribution: localizedText.optional(),
        stack: z.array(z.string()).optional(),
        url: z.string().url().optional(),
        isPlaceholder: z.boolean().default(false),
        preview: image
          .extend({
            alt: localizedText,
            kind: z.enum(['app', 'website', 'photo'])
          })
          .optional(),
        logo: image.optional()
      })
    })
  }
})
