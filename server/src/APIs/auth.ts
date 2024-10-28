import express from "express";

import * as authController from "@/controllers/auth";
import joiValidator from "@/middlewares/joi-validator";
import * as schemas from "@/schemas";

const router = express.Router();

router.get("/", authController.getAuthInfo);

router.post("/verify", joiValidator(schemas.auth.verifyCodeSchema, { stripUnknown: true }), authController.verifyCode);

export default router;
