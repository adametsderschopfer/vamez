import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        projectId: z.string(),
        locale: z.enum(['ru', 'en']),
        year: z.number().int(),
        order: z.number().int(),
        tone: z.enum(['accent', 'soft', 'purple', 'surface']),
        category: z.string(),
        lead: z.string(),
        technologies: z.array(z.string())
      })
    })
  }
})
