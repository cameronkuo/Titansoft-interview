import type { Request, Response } from "express";

export const getAuthInfo = (req: Request, res: Response) => {
  /*
   * ### 1. Verification API - POST /api/verify
   *
   * #### Request Body:
   *
   * | Parameter | Type   | Description              |
   * |-----------|--------|--------------------------|
   * | code      | string | The verification code.   |
   *
   * #### Example Request:
   *
   * ```json
   * {
   *     "code": "12345"
   * }
   * ```
   *
   * #### Response:
   * Returns whether the verification code is valid. If valid, a token is also provided.
   *
   * #### Example Response (valid code):
   * ```json
   * {
   *     "valid": true,
   *     "token": "example_token"
   * }
   * ```
   * #### Example Response (invalid code):
   * ```json
   * {
   *     "valid": false
   * }
   * ```
   */
  res.send("Auth route");
};

export const verifyCode = (req: Request, res: Response) => {
  /**
   * ## 2. Authorization API - GET /api/auth
   *
   * #### Request Headers:
   *
   * | Header Name   | Value  | Description                         |
   * |---------------|--------|-------------------------------------|
   * | Authorization | string | The token received from /api/verify |
   *
   * #### Response:
   * If authorized, the response will contain the username,quote and photo. Otherwise, an error message will be provided.
   * If valid, a token is also provided.
   *
   * #### Example Response (Authorized):
   * When valid:
   * ```json
   * {
   *   "username": "johnDoe",
   *   "quote": "Hello, World!",
   *   "photo": "https://example.com/image.jpg"
   * }
   * ```
   * #### Example Response (Unauthorized):
   * ```json
   * {
   *     "message": "unauthorized"
   * }
   * ```
   */
  res.send("Verify route");
};
