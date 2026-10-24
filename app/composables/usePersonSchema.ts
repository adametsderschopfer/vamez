import type { Ref } from 'vue'

export async function usePersonSchema(siteUrl: Readonly<Ref<string>>) {
  const { t } = useI18n()
  const { data: business } = await useLegalBusiness()

  return computed(() => {
    const shortName = `${t('home.intro.firstName')} ${t('home.intro.lastName')}`
    const owner = business.value?.owner
    return {
      '@id': `${siteUrl.value}/#person`,
      '@type': 'Person',
      name: owner?.name ?? shortName,
      givenName: owner?.givenName,
      familyName: owner?.familyName,
      additionalName: owner?.additionalName,
      alternateName: [
        ...new Set([shortName, 'Vladislav Adamets', business.value?.businessName].filter(Boolean))
      ],
      taxID: business.value?.inn,
      identifier: business.value
        ? [
            { '@type': 'PropertyValue', propertyID: 'ИНН', value: business.value.inn },
            { '@type': 'PropertyValue', propertyID: 'ОГРНИП', value: business.value.ogrnip }
          ]
        : undefined,
      url: `${siteUrl.value}/`,
      sameAs: [
        'https://github.com/adametsderschopfer',
        'https://www.youtube.com/@vlad_adamets',
        'https://t.me/adametsderschopfer'
      ]
    }
  })
}
