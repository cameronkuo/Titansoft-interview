<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import IconSprite from '@/components/IconSprite.vue'
import { getCookie } from '@/libs/cookie'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

if (!authStore.user && getCookie('token')) {
  authStore.getUserInfo()
}
</script>

<template>
  <header class="sticky top-0 flex w-full justify-between px-10 py-2">
    <nav class="flex items-center justify-center gap-5">
      <RouterLink to="/" class="text-inherit">Home</RouterLink>
    </nav>
    <RouterLink :to="{ name: 'ProfileView' }" class="flex items-center gap-2 whitespace-nowrap border-none bg-transparent p-0 no-underline dark:text-white">
      <img v-if="authStore.user?.photo" :src="authStore.user.photo" class="h-10 w-10 rounded-full object-cover object-top" />
      <IconSprite v-else id="person" class="w-10 dark:text-gray-400" />
      <small>Hi, {{ authStore.user?.username ?? '訪客' }}</small>
    </RouterLink>
  </header>
  <RouterView />
</template>
