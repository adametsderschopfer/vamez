<script setup lang="ts">
const route = useRoute()

const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <AppBottomControls :show-menu="isHomePage" />
  </div>
</template>
