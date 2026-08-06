<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'blog-page-transition',
    mode: 'out-in'
  }
})

useHead({
  title: 'CV · Владислав Адамец',
  meta: [
    {
      name: 'description',
      content:
        'CV Владислава Адамца: Senior Frontend Developer, React, Vue, Next.js, Nuxt.js, React Native и frontend architecture.'
    },
    { property: 'og:title', content: 'CV · Владислав Адамец' },
    {
      property: 'og:description',
      content:
        'Senior Frontend Developer с 8 годами коммерческого опыта в web, mobile и frontend architecture.'
    }
  ]
})
</script>

<template>
  <div class="cv-page">
    <CvHeroSection />
    <CvHighlightsSection />
    <CvExperienceSection />
    <CvSkillsSection />
  </div>
</template>

<style scoped>
.cv-page {
  min-height: 100dvh;
}
</style>
