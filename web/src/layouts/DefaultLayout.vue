<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElMessage, ElMessageBox } from 'element-plus'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

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
  <header class="sticky top-0 flex w-full justify-between px-5 py-2">
    <nav class="flex items-center justify-center gap-5">
      <RouterLink to="/" class="text-inherit">Home</RouterLink>
      <RouterLink to="/profile" class="text-inherit">Profile</RouterLink>
    </nav>
    <template v-if="authStore.user">
      <ElDropdown>
        <button class="flex items-center gap-2 border-none bg-transparent p-0 dark:text-white">
          <img v-if="authStore.user?.photo" :src="authStore.user.photo" class="h-10 w-10 rounded-full object-cover object-top" />
          <small>Hi, {{ authStore.user?.username ?? '訪客' }}</small>
        </button>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem @click="handleLogout">登出</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </template>
  </header>
  <RouterView />
</template>

<style lang="scss" scoped></style>
