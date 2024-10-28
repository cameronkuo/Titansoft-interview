import type * as types from "@/types";
import type { RequestHandler } from "express";

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
export const verifyCode: RequestHandler<
  object,
  types.auth.VerifyCodeResponseSchema & { message?: string },
  types.auth.VerifyCodeSchema
> = (req, res) => {
  const { code } = req.body;

  setTimeout(() => {
    if (code === "1234") {
      res.send({
        valid: true,
        token: "example_token",
      });
    } else {
      res.status(400).send({
        valid: false,
        message: "invalid code",
      });
    }
  }, 1000);
};

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
export const getAuthInfo: RequestHandler<
  object,
  Either<types.auth.AuthInfoResponseSchema, types.common.ErrorResponseSchema>
> = (req, res) => {
  if (req.headers.authorization === "example_token") {
    res.send({
      username: "johnDoe",
      quote: "Hello, World!",
      photo: "https://example.com/image.jpg",
    });
  } else {
    res.status(401).send({
      message: "unauthorized",
    });
  }
};
