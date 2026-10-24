export function useLegalBusiness() {
  return useAsyncData('legal-business', () => queryCollection('legal').first())
}
