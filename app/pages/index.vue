<script setup lang="ts">
const introSectionId = 'intro'

const activeSectionId = useState('active-section-id', () => introSectionId)

let observer: IntersectionObserver | null = null

onMounted(() => {
  activeSectionId.value = introSectionId

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible[0]) {
        activeSectionId.value = (visible[0].target as HTMLElement).id
      }
    },
    {
      rootMargin: '-35% 0px -45% 0px',
      threshold: [0.25, 0.45, 0.7]
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
    </div>
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
