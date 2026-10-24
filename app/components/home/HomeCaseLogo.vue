<script setup lang="ts">
defineProps<{
  src?: string
  srcDark?: string
  name: string
  kind?: 'wordmark' | 'symbol'
  monochrome?: boolean
  size?: 'regular' | 'large'
}>()
</script>

<template>
  <span
    class="case-logo"
    :class="{
      'case-logo--symbol': kind === 'symbol',
      'case-logo--monochrome': monochrome,
      'case-logo--text': !src,
      'case-logo--large': size === 'large'
    }"
  >
    <img
      v-if="src"
      class="case-logo__image case-logo__image--light"
      :src="src"
      :alt="kind === 'symbol' ? '' : name"
      width="288"
      height="40"
      loading="lazy"
      decoding="async"
    />
    <img
      v-if="srcDark"
      class="case-logo__image case-logo__image--dark"
      :src="srcDark"
      :alt="kind === 'symbol' ? '' : name"
      width="288"
      height="40"
      loading="lazy"
      decoding="async"
    />
    <span v-if="kind === 'symbol' || !src" class="case-logo__name">{{ name }}</span>
  </span>
</template>

<style scoped>
.case-logo {
  display: block;
  width: min(100%, 16rem);
  height: clamp(2rem, 3vw, 2.75rem);
}

.case-logo__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left center;
}

.case-logo--text {
  width: 100%;
  height: auto;
}

.case-logo--large {
  width: min(100%, 24rem);
  height: clamp(4.5rem, 6vw, 6rem);
}

.case-logo__image--dark {
  display: none;
}

.case-logo--symbol {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 3rem;
}

.case-logo--symbol .case-logo__image {
  flex: none;
  width: 3rem;
  height: 3rem;
}

.case-logo--monochrome .case-logo__image--light {
  filter: brightness(0);
}

.case-logo__name {
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.035em;
}

[data-theme='dark'] .case-logo__image--light {
  display: none;
}

[data-theme='dark'] .case-logo__image--dark {
  display: block;
}
</style>
