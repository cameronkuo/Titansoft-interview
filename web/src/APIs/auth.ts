import { defaultRequest, useErrorHandler } from '@/libs/axios'

import type { AxiosResponse } from 'axios'

/** 驗證信箱 */
export const login = async (
  data: _APIs_Request__CheckOTPCode,
): Promise<AxiosResponse<_APIs_Response__CheckOTPCode>> =>
  useErrorHandler(
    defaultRequest({
      url: '/auth/verify',
      method: 'POST',
      data,
    }),
    {
      disableNotification: true,
    },
  )

/** 取得使用者資訊 */
export const getUserInfo = async (): Promise<
  AxiosResponse<_APIs_Response__GetUserInfo>
> =>
  useErrorHandler(
    defaultRequest({
      url: '/auth',
      method: 'GET',
    }),
  )
