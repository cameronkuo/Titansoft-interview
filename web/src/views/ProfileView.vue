<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <main class="mx-auto mt-[20vh] flex max-w-screen-sm flex-col items-center justify-center gap-5">
    <div class="flex items-center gap-5">
      <img class="w-40" :src="authStore.user?.photo" alt="avatar" />
      <div class="mb-20 flex flex-col">
        <h1 class="text-2xl font-bold">"{{ authStore.user?.quote }}"</h1>
        <p class="text-right text-gray-500">—— {{ authStore.user?.username }}</p>
      </div>
    </div>
  </main>
</template>
