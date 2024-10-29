<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogout = () => {
  ElMessageBox.confirm('確定要登出嗎？', '登出', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    authStore.logout()
    if (route.meta.auth) {
      router.replace({ name: 'VerifyView', query: { redirect: route.fullPath } })
    }
  })
}
</script>

<template>
  <main class="mx-auto mt-[20vh] flex max-w-screen-sm flex-col items-center justify-center gap-5">
    <div class="flex items-center gap-5">
      <img class="w-40" :src="authStore.user?.photo" alt="avatar" />
      <div class="flex flex-col items-end">
        <h1 class="text-2xl font-bold">"{{ authStore.user?.quote }}"</h1>
        <p class="text-gray-500">—— {{ authStore.user?.username }}</p>
        <button class="mt-20 border-none bg-transparent text-inherit underline" @click="handleLogout">Logout</button>
      </div>
    </div>
  </main>
</template>
