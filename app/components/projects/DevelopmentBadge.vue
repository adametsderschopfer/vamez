<script setup lang="ts">
import { CodeXml, Sparkles } from 'lucide-vue-next'

defineProps<{ mode: 'manual' | 'ai' | 'mixed' }>()
const { t } = useI18n()
</script>

<template>
  <span class="development-badges">
    <span v-if="mode !== 'ai'" class="development-badges__item development-badges__item--manual">
      <CodeXml :size="12" aria-hidden="true" />
      <span>{{ t('portfolio.development.manualLabel') }}</span>
      <span v-if="mode === 'mixed'" class="development-badges__share">≈50%</span>
    </span>
    <span v-if="mode !== 'manual'" class="development-badges__item development-badges__item--ai">
      <Sparkles :size="12" aria-hidden="true" />
      <span>{{ t('portfolio.development.aiLabel') }}</span>
      <span v-if="mode === 'mixed'" class="development-badges__share">≈50%</span>
    </span>
  </span>
</template>

<style scoped>
.development-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.15rem;
}

.development-badges__item {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  padding: 0.2rem 0.35rem;
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  border: 1px solid color-mix(in srgb, currentcolor 18%, transparent);
  border-radius: 0.3rem;
}

.development-badges__item--manual {
  color: var(--ink);
  background: color-mix(in srgb, var(--ink) 10%, var(--page-background));
}

.development-badges__item--ai {
  color: var(--card-accent);
  background: color-mix(in srgb, var(--card-accent) 18%, var(--page-background));
}

.development-badges__share {
  padding-left: 0.25rem;
  border-left: 1px solid color-mix(in srgb, currentcolor 25%, transparent);
}

.development-badges :deep(svg) {
  flex: none;
}
</style>
