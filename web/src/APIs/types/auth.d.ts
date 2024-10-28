// ========== Check OTP Code ========== //

interface _APIs_Request__CheckOTPCode {
  /** 驗證碼 */
  code: string
}

interface _APIs_Response__CheckOTPCode {
  /** access token */
  token: string
}

// ========== Get User Info ========== //

interface _APIs_Response__GetUserInfo {
  /** 使用者名稱 */
  username: string
  /** 使用者頭像 */
  photo: string
  /** 使用者引言 */
  quote: string
}
