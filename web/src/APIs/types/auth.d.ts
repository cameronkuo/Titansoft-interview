// ========== Check OTP Code ========== //

interface _APIs_Request__CheckOTPCode {
  /** 驗證碼 */
  code: string
}

type _APIs_Response__CheckOTPCode = _APIs_Response__Construct<{
  /** access token */
  token: string
}>

// ========== Get User Info ========== //

type _APIs_Response__GetUserInfo = _APIs_Response__Construct<{
  /** 使用者名稱 */
  username: string
  /** 使用者頭像 */
  photo: string
  /** 使用者引言 */
  quote: string
}>
