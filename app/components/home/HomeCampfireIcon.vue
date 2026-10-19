<template>
  <svg class="home-campfire" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    <g class="home-campfire__flame">
      <path
        class="home-campfire__outer"
        d="M33 7c2 10-8 13-12 20-6 10-1 21 11 21s21-12 16-23c-1 5-4 8-8 10 4-12-1-21-7-28Z"
      />
      <path
        class="home-campfire__core"
        d="M33 29c1 6-6 9-6 14 0 4 3 6 6 6 5 0 9-5 7-10-1 2-2 3-4 4 2-6 0-10-3-14Z"
      />
    </g>
    <path class="home-campfire__spark home-campfire__spark--first" d="m22 17 1-4" />
    <path class="home-campfire__spark home-campfire__spark--second" d="m44 14 2-3" />
    <g class="home-campfire__logs">
      <path d="m19 52 27 7M18 59l27-7" />
    </g>
  </svg>
</template>

<style scoped>
.home-campfire {
  --campfire-flame: #e69a43;
  --campfire-core: #ffd083;
  --campfire-cycle: 2.4s;
  --campfire-ease: cubic-bezier(0.77, 0, 0.175, 1);

  display: block;
  flex: none;
  width: 0.85em;
  height: 0.85em;
  overflow: visible;
}

.home-campfire__flame {
  transform-origin: center bottom;
  transform-box: fill-box;
}

.home-campfire__outer {
  fill: var(--campfire-flame);
}

.home-campfire__core {
  fill: var(--campfire-core);
}

.home-campfire__spark {
  stroke: var(--campfire-flame);
  stroke-width: 2;
  stroke-linecap: round;
  transform-origin: center;
  transform-box: fill-box;
}

.home-campfire__logs {
  stroke: var(--ink-muted);
  stroke-width: 4;
  stroke-linecap: round;
}

@media (prefers-reduced-motion: no-preference) {
  .home-campfire__flame {
    animation: campfire-flame var(--campfire-cycle) var(--campfire-ease) infinite;
  }

  .home-campfire__spark {
    opacity: 0;
    animation: campfire-spark var(--campfire-cycle) var(--ease-out) infinite;
  }

  .home-campfire__spark--second {
    animation-delay: -1.2s;
  }
}

@keyframes campfire-flame {
  0%,
  100% {
    transform: rotate(-2deg) scale(0.97, 1.03);
  }

  45% {
    transform: rotate(2deg) scale(1.04, 0.96);
  }

  75% {
    transform: rotate(-1deg) scale(0.99, 1.04);
  }
}

@keyframes campfire-spark {
  0%,
  15% {
    opacity: 0;
    transform: translate(0, 0) scale(0.7);
  }

  35% {
    opacity: 0.9;
  }

  80%,
  100% {
    opacity: 0;
    transform: translate(40%, -250%) scale(0.3);
  }
}
</style>
