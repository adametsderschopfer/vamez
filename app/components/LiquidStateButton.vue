<script setup lang="ts">
defineProps<{
  icon: object
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button class="liquid-state-button" type="button" @click="$emit('click')">
    <component :is="icon" class="liquid-state-button__icon" :size="18" weight="regular" />
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
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.liquid-state-button:hover {
  transform: translateY(-1px) scale(1.015);
}

.liquid-state-button:active {
  transform: scale(0.975);
}

.liquid-state-button__icon {
  flex: none;
  color: var(--color-text);
  opacity: 0.92;
}
</style>
