<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeHeroSection from '@/components/home/HomeHeroSection.vue'
import HomeAboutSection from '@/components/home/HomeAboutSection.vue'
import HomeProjectsSection from '@/components/home/HomeProjectsSection.vue'
import HomeContactSection from '@/components/home/HomeContactSection.vue'
import HomeFooter from '@/components/home/HomeFooter.vue'
</script>

<template>
  <div id="top" class="home-page">
    <div class="home-page__content">
      <HomeHeader />
      <main id="main-content">
        <HomeHeroSection />
        <HomeAboutSection />
        <HomeProjectsSection />
        <HomeContactSection />
      </main>
      <HomeFooter />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100dvh;
  background: var(--page-background);
}

.home-page__content {
  width: min(100%, var(--content-width));
  padding: 0 var(--page-gutter);
  margin: 0 auto;
}
</style>
