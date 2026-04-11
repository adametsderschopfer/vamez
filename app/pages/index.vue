<script setup lang="ts">
import HomeIntroSection from '@/components/home/HomeIntroSection.vue'
import ExperienceSection from '@/components/home/ExperienceSection.vue'
import AppFooter from '@/components/AppFooter.vue'

const introSectionId = 'intro'

const activeSectionId = useState('active-section-id', () => introSectionId)

let observer: IntersectionObserver | null = null

onMounted(() => {
  activeSectionId.value = introSectionId

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSectionId.value = (entry.target as HTMLElement).id
        }
      })
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    }
  )

  document.querySelectorAll<HTMLElement>('[data-anchor]').forEach((sectionElement) => {
    observer?.observe(sectionElement)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="landing">
    <div class="landing__anchors">
      <HomeIntroSection />
      <ExperienceSection />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.landing {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.landing__anchors {
  position: relative;
  min-height: 100vh;
}
</style>
