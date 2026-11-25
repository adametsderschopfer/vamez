export function useWorkCases() {
  return useAsyncData('work-cases', async () => {
    const [companies, projects] = await Promise.all([
      queryCollection('companies').order('order', 'ASC').all(),
      queryCollection('projects')
        .where('company', 'NOT IN', [
          'elm-tech',
          'codepoint',
          'omp',
          'geptop',
          'itspecial',
          'mozen'
        ])
        .order('order', 'ASC')
        .all()
    ])
    return companies.map((company) => ({
      ...company,
      projects: projects.filter((project) => project.company === company.key)
    }))
  })
}
