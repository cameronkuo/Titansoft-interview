<script setup lang="ts">
import IconSprite from '@/components/IconSprite.vue'
</script>

<template>
  <main class="mx-auto mt-[20vh] flex max-w-screen-sm flex-col items-center justify-center gap-5">
    <h1>Home</h1>
  </main>
  <button id="hint-button" class="fixed right-20 top-14 border-none bg-transparent text-inherit">
    <span class="mr-3">Click here to see your profile</span>
    <IconSprite id="click-here" class="w-5" style="transform: scaleX(-1)" />
  </button>
</template>

<style lang="scss" scoped>
#hint-button :deep(svg) {
  animation: identifier 1s infinite ease-in-out;
  z-index: 999;
}

@keyframes identifier {
  0% {
    transform: translate(0, 0) scaleX(-1) scale(1);
  }
  50% {
    transform: translate(10px, -10px) scaleX(-1) scale(1.1);
  }
}
</style>
