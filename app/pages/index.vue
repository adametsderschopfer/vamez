<script setup lang="ts">
import HomeIntroSection from '@/components/home/HomeIntroSection.vue'
import SummarySection from '@/components/home/SummarySection.vue'
import ExperienceSection from '@/components/home/ExperienceSection.vue'
import ContactsSection from '@/components/home/ContactsSection.vue'

const introSectionId = 'intro'

const activeSectionId = useState('active-section-id', () => introSectionId)

let rafId: number | null = null

function updateActiveSection() {
  const sections = document.querySelectorAll<HTMLElement>('[data-anchor]')

  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 32
  if (atBottom && sections.length > 0) {
    activeSectionId.value = sections[sections.length - 1].id
    return
  }

  const triggerY = window.scrollY + window.innerHeight * 0.35
  let currentId = sections[0]?.id ?? introSectionId

  for (const section of sections) {
    if (section.offsetTop <= triggerY) {
      currentId = section.id
    }
  }

  activeSectionId.value = currentId
}

function onScroll() {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    updateActiveSection()
    rafId = null
  })
}

onMounted(() => {
  updateActiveSection()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="landing">
    <div class="landing__anchors">
      <HomeIntroSection />
      <SummarySection />
      <ExperienceSection />
      <ContactsSection />
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
