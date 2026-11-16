<script setup lang="ts">
defineProps<{ interactive?: boolean }>()
</script>

<template>
  <article class="project-card-frame" :class="{ 'project-card-frame--interactive': interactive }">
    <div class="project-card-frame__visual">
      <slot name="visual" />
    </div>
    <div v-if="$slots.default" class="project-card-frame__body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.project-card-frame {
  --preview-height: clamp(12rem, 20vw, 19rem);
  --project-card-radius: 1.25rem;

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  color: var(--ink);
  text-align: left;
  background: var(--card-surface);
  border: 1px var(--project-card-border-style, solid) var(--line);
  border-radius: var(--project-card-radius);
  isolation: isolate;
  transition:
    border-color var(--motion-fast),
    box-shadow var(--motion-fast);
}

.project-card-frame__visual {
  position: relative;
  width: 100%;
  padding: 0.65rem;
}

.project-card-frame__visual:only-child {
  display: grid;
  flex: 1;
}

.project-card-frame__body {
  padding: 0.75rem 1.25rem 1.5rem;
}

@media (hover: hover) {
  .project-card-frame--interactive:hover {
    border-color: var(--card-accent);
    box-shadow: 0 0.75rem 2rem rgb(0 0 0 / 15%);
  }
}

@media (max-width: 600px) {
  .project-card-frame {
    --preview-height: 15rem;
  }
}
</style>
