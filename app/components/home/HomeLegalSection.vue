<script setup lang="ts">
import HomeLegalField from './HomeLegalField.vue'

const { t, locale } = useI18n()
const isExpanded = ref(false)
const language = computed(() => (locale.value === 'en' ? 'en' : 'ru'))
const { data: business, error } = await useLegalBusiness()

if (error.value) throw createError(error.value)

function formatDate(date: string) {
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`))
}

type LegalField = {
  key: string
  value: string
  wide?: boolean
  datetime?: string
}

const groups = computed<{ key: string; fields: LegalField[] }[]>(() => {
  const data = business.value
  if (!data) return []
  const lang = language.value
  return [
    {
      key: 'detailsGroup',
      fields: [
        { key: 'businessName', value: data.businessName, wide: true },
        { key: 'inn', value: data.inn },
        { key: 'ogrnip', value: data.ogrnip },
        {
          key: 'registrationDate',
          value: formatDate(data.registrationDate),
          datetime: data.registrationDate
        },
        { key: 'region', value: data.region[lang] },
        { key: 'citizenship', value: data.citizenship[lang] },
        {
          key: 'status',
          value: t('home.legal.statusAsOf', {
            status: data.status.label[lang],
            date: formatDate(data.status.asOf)
          })
        }
      ]
    },
    {
      key: 'activitiesGroup',
      fields: [
        {
          key: 'activity',
          value: `${data.activity.code} — ${data.activity.label[lang]}`,
          wide: true
        },
        ...data.additionalActivities.map((activity) => ({
          key: 'additionalActivity',
          value: `${activity.code} — ${activity.label[lang]}`,
          wide: true
        }))
      ]
    },
    {
      key: 'registrationGroup',
      fields: [
        { key: 'taxAuthority', value: data.taxAuthority.name[lang], wide: true },
        { key: 'taxAuthorityCode', value: data.taxAuthority.code },
        { key: 'pensionNumber', value: data.pensionRegistration.number },
        {
          key: 'pensionDate',
          value: formatDate(data.pensionRegistration.date),
          datetime: data.pensionRegistration.date
        },
        { key: 'pensionAuthorityCode', value: data.pensionRegistration.authorityCode },
        { key: 'pensionAuthority', value: data.pensionRegistration.authority[lang], wide: true }
      ]
    },
    {
      key: 'smeGroup',
      fields: [
        { key: 'smeCategory', value: data.sme.category[lang] },
        {
          key: 'smeInclusionDate',
          value: formatDate(data.sme.inclusionDate),
          datetime: data.sme.inclusionDate
        }
      ]
    }
  ]
})
</script>

<template>
  <section v-if="business" class="home-legal" aria-labelledby="home-legal-title">
    <div class="home-legal__accordion" :class="{ 'home-legal__accordion--open': isExpanded }">
      <h2 id="home-legal-title" class="home-legal__title">
        <button
          id="home-legal-trigger"
          type="button"
          class="home-legal__trigger"
          :aria-expanded="isExpanded"
          aria-controls="home-legal-panel"
          @click="isExpanded = !isExpanded"
        >
          <span>{{ t('home.legal.title') }}</span>
          <span class="home-legal__toggle" aria-hidden="true" />
        </button>
      </h2>
      <div
        id="home-legal-panel"
        class="home-legal__panel"
        role="region"
        aria-labelledby="home-legal-trigger"
        :aria-hidden="!isExpanded"
        :inert="!isExpanded"
      >
        <div class="home-legal__clip">
          <div class="home-legal__content">
            <section
              v-for="group in groups"
              :key="group.key"
              class="home-legal__group"
              :aria-labelledby="`legal-${group.key}`"
            >
              <h3 :id="`legal-${group.key}`" class="home-legal__group-title">
                {{ t(`home.legal.${group.key}`) }}
              </h3>
              <dl class="home-legal__fields">
                <HomeLegalField
                  v-for="field in group.fields"
                  :key="`${field.key}-${field.value}`"
                  :class="{ 'home-legal__field--wide': field.wide }"
                  :label="t(`home.legal.${field.key}`)"
                  :value="field.value"
                  :datetime="field.datetime"
                />
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-legal {
  --legal-toggle-size: 2.5rem;
  --legal-group-gap: 2rem;

  margin-bottom: 2rem;
}

.home-legal__accordion {
  border-block: 1px solid var(--line);
}

.home-legal__title {
  margin: 0;
}

.home-legal__trigger {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 0;
  font: inherit;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-label);
  line-height: 1.5;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  transition: color var(--motion-fast) ease;
}

.home-legal__trigger:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 0.25rem;
}

.home-legal__toggle {
  position: relative;
  flex: none;
  width: var(--legal-toggle-size);
  height: var(--legal-toggle-size);
  border: 1px solid var(--line);
  border-radius: 50%;
  transition:
    color var(--motion-fast) ease,
    background-color var(--motion-fast) ease,
    border-color var(--motion-fast) ease,
    transform var(--motion-fast) var(--ease-out);
}

.home-legal__toggle::before,
.home-legal__toggle::after {
  position: absolute;
  inset: 0;
  width: 0.875rem;
  height: 2px;
  margin: auto;
  content: '';
  background: currentcolor;
  border-radius: 1px;
  transition:
    opacity var(--motion-fast) var(--ease-out),
    transform var(--motion-state) var(--ease-out);
}

.home-legal__toggle::after {
  transform: rotate(90deg);
}

.home-legal__accordion--open .home-legal__toggle {
  color: var(--page-background);
  background-color: var(--card-accent);
  border-color: var(--card-accent);
}

.home-legal__accordion--open .home-legal__toggle::after {
  opacity: 0;
  transform: rotate(180deg);
}

.home-legal__trigger:active .home-legal__toggle {
  transform: scale(0.94);
}

.home-legal__panel {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows var(--motion-state) var(--ease-out),
    opacity var(--motion-fast) var(--ease-out);
}

.home-legal__accordion--open .home-legal__panel {
  grid-template-rows: 1fr;
  opacity: 1;
}

.home-legal__clip {
  min-height: 0;
  overflow: hidden;
}

.home-legal__content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--legal-group-gap);
  padding: 0.5rem 0.5rem 2rem;
  transform: translateY(-0.375rem);
  transition: transform var(--motion-state) var(--ease-out);
}

.home-legal__accordion--open .home-legal__content {
  transform: translateY(0);
}

.home-legal__group {
  min-width: 0;
  padding-top: var(--legal-group-gap);
  border-top: 1px solid var(--line);
}

.home-legal__group-title {
  margin: 0 0 1.25rem;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-label);
  line-height: 1.5;
}

.home-legal__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 2rem;
  margin: 0;
}

.home-legal__field--wide {
  grid-column: 1 / -1;
}

@media (hover: hover) and (pointer: fine) {
  .home-legal__trigger:hover {
    color: var(--card-accent);
  }

  .home-legal__trigger:hover .home-legal__toggle {
    border-color: var(--card-accent);
  }
}

@media (max-width: 1000px) {
  .home-legal__content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .home-legal__fields {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-legal__toggle,
  .home-legal__toggle::before,
  .home-legal__toggle::after,
  .home-legal__panel,
  .home-legal__content {
    transition: none;
  }

  .home-legal__content,
  .home-legal__trigger:active .home-legal__toggle {
    transform: none;
  }
}
</style>
