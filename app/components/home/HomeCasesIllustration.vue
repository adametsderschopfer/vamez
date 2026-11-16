<script setup lang="ts">
import casesIllustration from '@/assets/images/cases-illustration.webp'

const root = useTemplateRef<HTMLElement>('root')
const pending = shallowRef(false)
let observer: IntersectionObserver | undefined

useFloatingMotion(root, {
  selector: '.cases-illustration__gear',
  driftDistance: 0,
  rotationRange: 9
})

onMounted(() => {
  if (!root.value || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

  pending.value = root.value.getBoundingClientRect().top >= window.innerHeight
  if (!pending.value) return

  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    pending.value = false
    observer?.disconnect()
  })
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="root" class="cases-illustration" aria-hidden="true">
    <div
      class="cases-illustration__reveal"
      :class="{ 'cases-illustration__reveal--pending': pending }"
      :style="{ '--cases-art': `url(${casesIllustration})` }"
    >
      <img
        class="cases-illustration__base"
        :src="casesIllustration"
        width="960"
        height="640"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span class="cases-illustration__gear cases-illustration__gear--large" />
      <span class="cases-illustration__gear cases-illustration__gear--small" />
    </div>
  </div>
</template>

<style scoped>
.cases-illustration__reveal {
  position: relative;
}

.cases-illustration__base {
  display: block;
  width: 100%;
  height: auto;
  clip-path: polygon(0 0, 52% 0, 52% 47%, 61% 47%, 61% 63%, 100% 63%, 100% 100%, 0 100%);
}

.cases-illustration__gear {
  position: absolute;
  inset: 0;
  background: var(--cases-art) center / 100% 100% no-repeat;
}

.cases-illustration__gear--large {
  --gear-center: 65.4% 26.6%;

  clip-path: circle(15.7% at var(--gear-center));
  transform-origin: var(--gear-center);
}

.cases-illustration__gear--small {
  --gear-center: 84% 47.5%;

  clip-path: circle(11.3% at var(--gear-center));
  transform-origin: var(--gear-center);
}

@media (prefers-reduced-motion: no-preference) {
  .cases-illustration__reveal {
    --reveal-duration: calc(var(--motion-state) * 2);

    clip-path: inset(0);
    transition:
      clip-path var(--reveal-duration) var(--ease-out),
      opacity var(--reveal-duration) var(--ease-out),
      transform var(--reveal-duration) var(--ease-out);
  }

  .cases-illustration__reveal--pending {
    opacity: 0;
    clip-path: inset(0 100% 0 0);
    transform: translateY(0.65rem);
  }
}
</style>
