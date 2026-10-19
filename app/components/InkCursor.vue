<script setup lang="ts">
const cursor = useTemplateRef<HTMLElement>('cursor')
const filterId = `ink-cursor-${useId()}`
const particleCount = 20

const { visible } = useInkCursor(cursor)
</script>

<template>
  <Teleport to="body">
    <svg class="ink-cursor-filter" width="0" height="0" aria-hidden="true">
      <defs>
        <filter :id="filterId">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
    <div
      v-show="visible"
      ref="cursor"
      class="ink-cursor"
      :style="{ filter: `url(#${filterId})` }"
      aria-hidden="true"
    >
      <span v-for="particle in particleCount" :key="particle" class="ink-cursor__particle" />
    </div>
  </Teleport>
</template>

<style scoped>
.ink-cursor-filter {
  position: absolute;
  pointer-events: none;
}

.ink-cursor {
  --ink-cursor-size: 26px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  pointer-events: none;
  mix-blend-mode: difference;
}

.ink-cursor__particle {
  position: absolute;
  display: block;
  width: var(--ink-cursor-size);
  height: var(--ink-cursor-size);
  background: #fff;
  border-radius: 20px;
  transform-origin: center;
}

@media (min-width: 481px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .ink-cursor {
    display: block;
  }
}
</style>
