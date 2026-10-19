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
  --primitive-size: clamp(5rem, 9vw, 10rem);
  --primitive-color: var(--card-accent);
  --primitive-travel: 2rem;

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
  --primitive-delay: 0ms;

  top: 9%;
  left: 7%;
  rotate: -12deg;
}

.home-hero-primitives__item--circuit {
  --primitive-delay: var(--motion-stagger);
  --primitive-color: var(--ink-muted);

  top: 49%;
  left: 3%;
  rotate: 8deg;
}

.home-hero-primitives__item--cube {
  --primitive-delay: calc(var(--motion-stagger) * 2);

  bottom: 8%;
  left: 12%;
  rotate: -8deg;
}

.home-hero-primitives__item--brace {
  --primitive-delay: calc(var(--motion-stagger) * 3);
  --primitive-color: var(--ink-muted);

  top: 11%;
  right: 8%;
  rotate: 16deg;
}

.home-hero-primitives__item--nut {
  --primitive-delay: calc(var(--motion-stagger) * 4);

  right: 9%;
  bottom: 12%;
  rotate: -10deg;
}

@media (prefers-reduced-motion: no-preference) {
  .home-hero-primitives__item {
    animation: primitive-assemble var(--motion-entrance) var(--ease-out) var(--primitive-delay) both;
  }
}

@keyframes primitive-assemble {
  from {
    opacity: 0;
    transform: translateY(var(--primitive-travel)) rotate(-20deg) scale(0.92);
  }

  to {
    opacity: 1;
    transform: translateY(0) rotate(0) scale(1);
  }
}

@media (max-width: 900px) {
  .home-hero-primitives {
    --primitive-size: clamp(3rem, 9vw, 5rem);
  }

  .home-hero-primitives__item--circuit,
  .home-hero-primitives__item--brace {
    display: none;
  }

  .home-hero-primitives__item--code {
    top: 3%;
    left: 3%;
  }

  .home-hero-primitives__item--cube {
    bottom: 6%;
    left: 4%;
  }

  .home-hero-primitives__item--nut {
    right: 3%;
    bottom: 5%;
  }
}
</style>
