<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="sticky top-0 w-full">
    <nav class="flex items-center justify-center gap-5">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style lang="scss" scoped></style>
