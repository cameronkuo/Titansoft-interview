import Joi from "joi";

import type * as types from "@/types";

export const verifyCodeSchema = Joi.object<types.auth.VerifyCodeSchema>({
  code: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required(),
});
