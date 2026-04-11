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
    })
  }
})
