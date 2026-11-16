<script setup lang="ts">
import ProjectCardFrame from '@/components/projects/ProjectCardFrame.vue'

const { t } = useI18n()
</script>

<template>
  <ProjectCardFrame class="upcoming-project">
    <template #visual>
      <div class="upcoming-project__cover">
        <svg class="upcoming-project__shapes" viewBox="0 0 240 112" fill="none" aria-hidden="true">
          <circle cx="55" cy="54" r="37" fill="currentColor" fill-opacity=".16" />
          <circle cx="55" cy="54" r="37" stroke="currentColor" />
          <path
            d="M142 14 190 98H94Z"
            fill="currentColor"
            fill-opacity=".09"
            stroke="currentColor"
          />
          <rect
            x="176"
            y="31"
            width="47"
            height="47"
            rx="8"
            stroke="currentColor"
            transform="rotate(12 199.5 54.5)"
          />
        </svg>
        <h3 class="upcoming-project__title">{{ t('home.personalProjects.nextProject') }}</h3>
      </div>
    </template>
  </ProjectCardFrame>
</template>

<style scoped>
.upcoming-project {
  --project-card-border-style: dashed;
}

.upcoming-project__cover {
  display: grid;
  gap: 0.75rem;
  align-content: center;
  justify-items: center;
  min-height: var(--preview-height);
  padding: 1rem;
  text-align: center;
  background: var(--card-soft);
  border-radius: 0.8rem;
}

.upcoming-project__shapes {
  width: min(100%, 14rem);
  color: var(--card-accent);
}

.upcoming-project__title {
  margin: 0;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-label);
  line-height: 1.4;
  color: var(--ink);
}
</style>
