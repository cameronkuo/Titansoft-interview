import express from "express";

import * as authController from "@/controllers/auth";

const router = express.Router();

router.get("/", authController.getAuthInfo);

router.post("/verify", authController.verifyCode);

export default router;
