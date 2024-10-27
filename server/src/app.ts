import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "@/middlewares/logger";

import API from "@/APIs";

const app = express();

logger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../", "public")));

app.use("/api/v1", API);

export default app;
