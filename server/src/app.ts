import path from "path";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import API from "@/APIs";
import logger from "@/middlewares/logger";

const app = express();

logger(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../", "public")));

app.use("/api/v1", API);

export default app;
