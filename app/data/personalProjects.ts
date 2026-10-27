export const personalProjects = [
  { key: 'shelf', featured: true },
  { key: 'pause', featured: false },
  { key: 'spectrum', featured: false }
] as const

export type PersonalProject = (typeof personalProjects)[number]
