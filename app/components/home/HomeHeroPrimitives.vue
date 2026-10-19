<script setup lang="ts">
import code from '@/assets/images/hero-primitives/code.webp'
import circuit from '@/assets/images/hero-primitives/circuit.webp'
import cube from '@/assets/images/hero-primitives/cube.webp'
import brace from '@/assets/images/hero-primitives/brace.webp'
import nut from '@/assets/images/hero-primitives/nut.webp'

const primitives = [
  { name: 'code', image: code },
  { name: 'circuit', image: circuit },
  { name: 'cube', image: cube },
  { name: 'brace', image: brace },
  { name: 'nut', image: nut }
]
</script>

<template>
  <div class="home-hero-primitives" aria-hidden="true">
    <span
      v-for="primitive in primitives"
      :key="primitive.name"
      class="home-hero-primitives__item"
      :class="`home-hero-primitives__item--${primitive.name}`"
      :style="{ '--primitive-image': `url(${primitive.image})` }"
    />
  </div>
</template>

<style scoped>
.home-hero-primitives {
  --primitive-size: clamp(7rem, 13vw, 14rem);
  --primitive-color: #8197df;
  --primitive-drift: 0.6rem;
  --primitive-tilt: 3deg;

  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.home-hero-primitives__item {
  position: absolute;
  width: var(--primitive-size);
  aspect-ratio: 1;
  background: var(--primitive-color);
  mask: var(--primitive-image) center / contain no-repeat;
}

.home-hero-primitives__item--code {
  --primitive-duration: 6.4s;
  --primitive-delay: -2s;

  top: 10%;
  left: 1%;
  rotate: -12deg;
}

.home-hero-primitives__item--circuit {
  --primitive-duration: 7.8s;
  --primitive-delay: -5s;
  --primitive-color: var(--ink-muted);

  top: 41%;
  left: 2%;
  rotate: 8deg;
}

.home-hero-primitives__item--cube {
  --primitive-duration: 8.2s;
  --primitive-delay: -3s;

  bottom: 6%;
  left: 6%;
  rotate: -8deg;
}

.home-hero-primitives__item--brace {
  --primitive-duration: 7s;
  --primitive-delay: -4s;
  --primitive-color: var(--ink-muted);

  top: 16%;
  right: 3%;
  rotate: 16deg;
}

.home-hero-primitives__item--nut {
  --primitive-duration: 8.6s;
  --primitive-delay: -1s;

  top: 60%;
  right: 1%;
  rotate: -10deg;
}

@media (prefers-reduced-motion: no-preference) {
  .home-hero-primitives__item {
    animation: primitive-float var(--primitive-duration) ease-in-out var(--primitive-delay) infinite
      alternate;
  }
}

@keyframes primitive-float {
  from {
    transform: translateY(calc(-1 * var(--primitive-drift)))
      rotate(calc(-1 * var(--primitive-tilt)));
  }

  to {
    transform: translateY(var(--primitive-drift)) rotate(var(--primitive-tilt));
  }
}

@media (max-width: 900px) {
  .home-hero-primitives {
    display: none;
  }
}
</style>
