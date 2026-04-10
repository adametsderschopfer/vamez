<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  label: string
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="liquid-state-button"
    type="button"
    :aria-label="label"
    :title="label"
    @click="$emit('click')"
  >
    <component :is="icon" class="liquid-state-button__icon" :size="18" />
  </button>
</template>

<style scoped>
.liquid-state-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--liquid-control-size);
  height: var(--liquid-control-size);
  padding: 0;
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  background: var(--glass-bg);
  color: var(--color-text);
  box-shadow: 0 18px 50px var(--glass-shadow);
  backdrop-filter: blur(24px);
  cursor: pointer;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.liquid-state-button:hover {
  transform: translateY(-2px) scale(1.08);
}

.liquid-state-button:hover .liquid-state-button__icon {
  transform: scale(1.3) rotate(15deg);
}

.liquid-state-button:active {
  transform: scale(0.95);
}

.liquid-state-button__icon {
  flex: none;
  color: var(--color-text);
  opacity: 0.92;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
