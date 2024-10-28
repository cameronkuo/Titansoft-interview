import { ElNotification } from 'element-plus'

import { getCookie } from '@/libs/cookie'
import { useAuthStore } from '@/stores/auth'

import type { Router } from 'vue-router'

export default function (router: Router) {
  router.beforeEach(to => {
    const authStore = useAuthStore()

    if (to.meta.title) {
      document.title = to.meta.title as string
    }

    if (to.matched.every(route => !route.meta.auth)) return true
    else if (!getCookie('token')) {
      ElNotification.error({
        title: '登入逾時',
        message: '請重新登入',
      })
      authStore.user = null
      return { name: 'VerifyView', query: { redirect: to.fullPath } }
    } else if (!authStore.user) {
      return authStore
        .getUserInfo()
        .then(() => true)
        .catch(() => ({ name: 'VerifyView', query: { redirect: to.fullPath } }))
    }
  })
}
