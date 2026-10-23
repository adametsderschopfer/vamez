<script setup lang="ts">
import { getInkCursorPath } from '@/utils/inkCursorShape'

const cursor = useTemplateRef<HTMLElement>('cursor')
const filterId = `ink-cursor-${useId()}`
const detailMaskId = `${filterId}-details`
const particleCount = 20

const { visible } = useInkCursor(cursor)

useHead(() => ({
  bodyAttrs: { 'data-ink-cursor': visible.value ? 'active' : undefined }
}))
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
    <div v-show="visible" ref="cursor" class="ink-cursor" aria-hidden="true">
      <svg class="ink-cursor__shape" viewBox="0 0 104 116" aria-hidden="true">
        <defs>
          <mask :id="detailMaskId" maskUnits="userSpaceOnUse" x="0" y="0" width="104" height="116">
            <rect width="104" height="116" fill="#fff" />
            <path
              class="ink-cursor__creases"
              fill="none"
              stroke="#000"
              stroke-width="1.4"
              stroke-linecap="round"
              opacity="0"
            />
          </mask>
        </defs>
        <path
          class="ink-cursor__outline"
          :d="getInkCursorPath(0, 0)"
          :mask="`url(#${detailMaskId})`"
        />
      </svg>
      <div class="ink-cursor__trail" :style="{ filter: `url(#${filterId})` }">
        <span v-for="particle in particleCount" :key="particle" class="ink-cursor__particle" />
      </div>
    </div>
  </Teleport>
</template>

<style>
body[data-ink-cursor='active'],
body[data-ink-cursor='active'] *,
body[data-ink-cursor='active'] *::before,
body[data-ink-cursor='active'] *::after {
  cursor: none !important;
}
</style>

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

.ink-cursor__trail {
  position: absolute;
  inset: 0;
}

.ink-cursor__shape {
  position: absolute;
  width: 104px;
  height: 116px;
  overflow: visible;
  fill: #fff;
  transform-origin: 48px 28px;
}

@media (min-width: 481px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .ink-cursor {
    display: block;
  }
}
</style>
