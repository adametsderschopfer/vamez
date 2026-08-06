<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeHeroSection from '@/components/home/HomeHeroSection.vue'
import HomeJournalSection from '@/components/home/HomeJournalSection.vue'

const { themeMode } = useThemeMode()
</script>

<template>
  <div class="home-page" :class="{ 'home-page--dark': themeMode === 'dark' }">
    <HomeHeader />
    <HomeHeroSection />
    <HomeJournalSection />
  </div>
</template>

<style scoped>
.home-page {
  --home-page-background: #f7f4ec;
  --home-page-contact: #171716;
  --home-page-text: #1979bd;

  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  color: var(--home-page-text);
  background: var(--home-page-background);
}

.home-page--dark {
  --home-page-background: #191816;
  --home-page-contact: #f7f4ec;
  --home-page-text: #89cdf6;
}
</style>
