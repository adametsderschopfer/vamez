<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const gridRef = ref<HTMLElement | null>(null)
const unitRef = ref<HTMLElement | null>(null)
const verticalLines = ref(0)
const horizontalLines = ref(0)
let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  const grid = gridRef.value
  const unit = unitRef.value
  if (!grid || !unit) return

  function updateLines() {
    const step = unit!.getBoundingClientRect().width
    if (!step) return
    verticalLines.value = Math.floor(grid!.clientWidth / step)
    horizontalLines.value = Math.floor(grid!.clientHeight / step)
  }

  updateLines()
  resizeObserver = new ResizeObserver(updateLines)
  resizeObserver.observe(grid)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div ref="gridRef" class="home-identity-grid" aria-hidden="true">
    <span ref="unitRef" class="home-identity-grid__unit" />
    <span
      v-for="line in verticalLines"
      :key="`vertical-${line}`"
      class="home-identity-grid__line home-identity-grid__line--vertical"
      :style="{ '--grid-line-index': line }"
    />
    <span
      v-for="line in horizontalLines"
      :key="`horizontal-${line}`"
      class="home-identity-grid__line home-identity-grid__line--horizontal"
      :style="{ '--grid-line-index': line }"
    />
  </div>
</template>

<style scoped>
.home-identity-grid {
  --grid-line-color: color-mix(in srgb, var(--ink-on-accent) 7%, transparent);
  --grid-line-width: 1px;
  --grid-draw-duration: 0.9s;
  --grid-draw-delay: 0.1s;
  --grid-line-stagger: 0.025s;

  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.home-identity-grid__unit {
  position: absolute;
  visibility: hidden;
  width: var(--equipment-grid-size);
}

.home-identity-grid__line {
  position: absolute;
  background: var(--grid-line-color);
  animation-duration: var(--grid-draw-duration);
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-delay: calc(var(--grid-draw-delay) + var(--grid-line-index) * var(--grid-line-stagger));
  animation-fill-mode: both;
}

.home-identity-grid__line--vertical {
  top: 0;
  left: calc(var(--grid-line-index) * var(--equipment-grid-size));
  width: var(--grid-line-width);
  height: 100%;
  transform-origin: top;
  animation-name: home-identity-grid-draw-vertical;
}

.home-identity-grid__line--horizontal {
  top: calc(var(--grid-line-index) * var(--equipment-grid-size));
  left: 0;
  width: 100%;
  height: var(--grid-line-width);
  transform-origin: left;
  animation-name: home-identity-grid-draw-horizontal;
}

@keyframes home-identity-grid-draw-vertical {
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
}

@keyframes home-identity-grid-draw-horizontal {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-identity-grid__line {
    animation: none;
  }
}
</style>
