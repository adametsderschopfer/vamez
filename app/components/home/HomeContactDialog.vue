<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HomeContactCard from './HomeContactCard.vue'

const emit = defineEmits<{ close: [] }>()
const cardRef = ref<InstanceType<typeof HomeContactCard> | null>(null)
const backdropRef = ref<HTMLElement | null>(null)
const { playMotion } = useDialogMotion()

onMounted(() => {
  void playMotion('open', cardRef.value?.element ?? null, backdropRef.value)
  cardRef.value?.focusClose()
})

function animateClose() {
  return playMotion('close', cardRef.value?.element ?? null, backdropRef.value)
}

defineExpose({ animateClose })
</script>

<template>
  <Teleport to="body">
    <div ref="backdropRef" class="home-contact-dialog__backdrop" @click="emit('close')" />
    <HomeContactCard ref="cardRef" modal @close="emit('close')" />
  </Teleport>
</template>

<style scoped>
.home-contact-dialog__backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(8, 13, 10, 0.6);
  backdrop-filter: blur(0.4rem);
}
</style>
