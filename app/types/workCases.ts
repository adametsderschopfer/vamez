import type { Collections } from '@nuxt/content'

export type WorkProject = Collections['projects']
export type ProjectPreview = NonNullable<WorkProject['preview']>
export type WorkCase = Collections['companies'] & { projects: WorkProject[] }
