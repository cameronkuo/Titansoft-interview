import Joi from "joi";

import type * as types from "@/types";

export const verifyCodeSchema = Joi.object<types.auth.VerifyCodeSchema>({
  code: Joi.string()
    .length(4)
    .message("驗證碼必須為 4 位")
    .pattern(/^[0-9]+$/)
    .message("驗證碼必須為數字")
    .required(),
});
