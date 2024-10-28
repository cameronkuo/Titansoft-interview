// ========== Dependencies ========== //
import axios from 'axios'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'

import { clearAllCookies, getCookie } from '@/libs/cookie'
import { devConsole } from '@/libs/helpers'

// ========== Types ========== //
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  CreateAxiosDefaults,
  RawAxiosResponseHeaders,
} from 'axios'

import type { Ref } from 'vue'

type FetchResult<T, D> = {
  pending: Ref<boolean>
  data: Ref<AxiosResponse<T, D>['data']>
  headers?: Ref<RawAxiosResponseHeaders | AxiosResponseHeaders>
  status: Ref<AxiosResponse<T, D>['status']>
  statusText: Ref<AxiosResponse<T, D>['statusText']>
  config: Ref<AxiosRequestConfig<D>>
  request: Ref<AxiosResponse<T, D>['request']>
  error: Ref<AxiosError<T, D>>
  then: Promise<AxiosResponse<T, D>>['then']
  catch: Promise<AxiosResponse<T, D>>['catch']
  finally: Promise<AxiosResponse<T, D>>['finally']
}

interface ErrorHandlerOptions {
  disableNotification?: boolean // disable error notification
  disableRedirect?: boolean // disable redirect to login page when 401 error occurs
}

// ========== Services ========== //
const createService = (config: CreateAxiosDefaults) => {
  // create an axios instance
  const axiosInstance = axios.create(config)

  // request interceptor
  axiosInstance.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) delete config.headers.Authorization
      return config
    },
    error => {
      devConsole.log({ error }) // for debug
      return Promise.reject(error)
    },
  )

  // response interceptor
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      devConsole.log({ error }) // for debug
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export const defaultService = createService({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: getCookie('token'),
  },
})

// ========== Composables ========== //
export const setAuthorization = function (
  service: ReturnType<typeof createService>,
  token: string,
) {
  if (token) service.defaults.headers.Authorization = token
  else delete service.defaults.headers.Authorization
}

export const useFetch = <T, D = unknown>(
  req: Promise<AxiosResponse<T, D>>,
): FetchResult<T, D> => {
  const pending = ref(true)
  const data = ref()
  const headers = ref()
  const status = ref()
  const statusText = ref()
  const config = ref()
  const request = ref()
  const error = ref()

  req
    .then(res => {
      pending.value = true
      data.value = res.data
      status.value = res.status
    })
    .catch(err => {
      error.value = err
    })
    .finally(() => {
      setTimeout(() => {
        pending.value = false
      }, 500)
    })

  return {
    pending,
    data,
    headers,
    status,
    statusText,
    config,
    request,
    error,
    then: req.then.bind(req),
    catch: req.catch.bind(req),
    finally: req.finally.bind(req),
  }
}

export const useErrorHandler = <T>(
  request: Promise<T>,
  options?: ErrorHandlerOptions,
): Promise<T> => {
  return request.catch(error => {
    const response = error.response

    if (response?.status === 401) {
      clearAllCookies()
      ElNotification.error({
        title: '無法執行',
        message: '請先登入',
      })
      if (!options?.disableRedirect) {
        setTimeout(() => {
          location.href = '/login?redirect=' + location.pathname
        }, 1000)
      }
    } else if (response?.status === 403) {
      ElNotification.error({
        title: '權限不足',
        message: '請聯絡管理員',
      })
    } else if (!options?.disableNotification) {
      ElNotification.error({
        title: '錯誤',
        message: response?.data?.message ?? error.message,
      })
    }

    return Promise.reject(error)
  })
}

// ========== Requests ========== //
export const defaultRequest = function <T = unknown, D = unknown>(
  config: AxiosRequestConfig<D>,
): Promise<AxiosResponse<T, D>> {
  return defaultService(config)
}
