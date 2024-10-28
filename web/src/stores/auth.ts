import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as APIs from '@/APIs'
import { defaultService, setAuthorization } from '@/libs/axios'
import { clearAllCookies, setCookie } from '@/libs/cookie'
import { devConsole } from '@/libs/helpers'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{
    /** 使用者名稱 */
    username: string
    /** 使用者頭像 */
    photo: string
    /** 使用者引言 */
    quote: string
  } | null>(null)

  const login = (code: string) => {
    return APIs.auth.login({ code }).then(res => {
      const token = res.data.token
      setAuthorization(defaultService, token)
      setCookie('token', token, 1)
    })
  }

  const getUserInfo = () => {
    return APIs.auth
      .getUserInfo()
      .then(res => {
        user.value = res.data
        devConsole.log('取得使用者資訊', user.value)
        return Promise.resolve(true)
      })
      .catch(() => {
        clearAllCookies() // 清除 cookie
        return Promise.reject(false)
      })
  }

  const logout = () => {
    clearAllCookies() // 清除 cookie
    setAuthorization(defaultService, '') // 清除 Authorization header
    user.value = null
  }

  return { user, login, logout, getUserInfo }
})
