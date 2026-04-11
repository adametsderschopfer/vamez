import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        locale: z.enum(['ru', 'en']),
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tags: z.array(z.string()).default([])
      })
    }),
    experience: defineCollection({
      type: 'data',
      source: 'experience/*.json',
      schema: z.object({
        locale: z.enum(['ru', 'en']),
        careerStart: z.string(),
        items: z.array(
          z.object({
            id: z.string(),
            order: z.number().int(),
            role: z.string(),
            title: z.string(),
            period: z.string(),
            start: z.string(),
            end: z.string().nullable(),
            description: z.string(),
            stack: z.array(z.string()).default([]),
            tasks: z.array(z.string()).default([]),
            achievements: z.array(z.string()).default([])
          })
        )
      })
    })
  }
})
