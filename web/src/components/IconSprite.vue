<script setup lang="ts">
import defaultMap from "@/assets/images/sprites.svg";

defineProps<{
  id: string;
  map?: string;
}>();
</script>

<template>
  <svg class="aspect-square">
    <use :href="`${map ?? defaultMap}#${id}`" />
  </svg>
</template>
