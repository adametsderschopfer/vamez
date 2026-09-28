<script setup lang="ts">
import HomeHeroSection from '@/components/home/HomeHeroSection.vue'
import HomeAboutSection from '@/components/home/HomeAboutSection.vue'
import HomeWebSection from '@/components/home/HomeWebSection.vue'
import HomeContactSection from '@/components/home/HomeContactSection.vue'
import HomeFooter from '@/components/home/HomeFooter.vue'
import { ref } from 'vue'

useRevealOnScroll()
const contactSection = ref<InstanceType<typeof HomeContactSection> | null>(null)

function openContacts() {
  void contactSection.value?.openContacts()
}
</script>

<template>
  <div id="top" class="home-page">
    <div class="home-page__content">
      <HomeHeroSection @open-contacts="openContacts" />
      <HomeAboutSection />
      <HomeWebSection class="home-page__reveal" data-reveal="idle" />
      <HomeContactSection ref="contactSection" class="home-page__reveal" data-reveal="idle" />
      <HomeFooter />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  --home-reveal-distance: 1.25rem;
  --home-reveal-duration: 0.65s;

  min-height: 100dvh;
  background: var(--page-background);
}

.home-page__content {
  display: grid;
  gap: var(--grid-gap);
  width: min(100%, 1800px);
  padding: var(--page-gutter) var(--page-gutter) 0;
  margin: 0 auto;
}

.home-page__reveal {
  transition:
    opacity var(--home-reveal-duration) ease,
    transform var(--home-reveal-duration) cubic-bezier(0.22, 1, 0.36, 1);
}

.home-page__reveal[data-reveal='pending'] {
  opacity: 0.8;
  transform: translateY(var(--home-reveal-distance));
}

@media (prefers-reduced-motion: reduce) {
  .home-page__reveal {
    transition: none;
  }

  .home-page__reveal[data-reveal='pending'] {
    opacity: 1;
    transform: none;
  }
}
</style>
