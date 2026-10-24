import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const localizedText = z.object({ ru: z.string(), en: z.string() })
const legalActivity = z.object({ code: z.string(), label: localizedText })
const image = z.object({
  src: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive()
})

export default defineContentConfig({
  collections: {
    legal: defineCollection({
      type: 'data',
      source: 'legal/*.json',
      schema: z.object({
        businessName: z.string(),
        owner: z.object({
          name: z.string(),
          givenName: z.string(),
          familyName: z.string(),
          additionalName: z.string()
        }),
        inn: z.string().regex(/^\d{12}$/),
        ogrnip: z.string().regex(/^\d{15}$/),
        registrationDate: z.string().date(),
        region: localizedText,
        citizenship: localizedText,
        status: z.object({ label: localizedText, asOf: z.string().date() }),
        activity: legalActivity,
        additionalActivities: z.array(legalActivity),
        taxAuthority: z.object({ code: z.string(), name: localizedText }),
        pensionRegistration: z.object({
          number: z.string(),
          date: z.string().date(),
          authorityCode: z.string(),
          authority: localizedText
        }),
        sme: z.object({ category: localizedText, inclusionDate: z.string().date() })
      })
    }),
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
            srcSmall: z.string().optional(),
            alt: localizedText,
            kind: z.enum(['app', 'website', 'photo'])
          })
          .optional(),
        logo: image.optional()
      })
    })
  }
})
