import express from "express";

import authRouter from "@/APIs/auth";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRouter);

export default router;
