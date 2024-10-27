import type { Application, Request, Response } from "express";
import fs from "fs";
import logger from "morgan";
import path from "path";
import * as rfs from "rotating-file-stream";

const LOGS_DIR = path.join(__dirname, "../../", "logs");

if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR);

/** 跳過不需要 log 的路徑 */
const skip = (req: Request, res: Response) =>
  req.path.startsWith("/assets") ||
  req.path.startsWith("/bower_components") ||
  req.path.startsWith("/css") ||
  req.path.startsWith("/img") ||
  req.path.startsWith("/js");

const accessLogStream = rfs.createStream("access.log", {
  // interval: "1a", // rotate daily
  size: "300K", // rotate by size
  path: LOGS_DIR,
  // compress: true,
});

// Custom token format
logger.token("error", (req, res) => {
  return req.errored?.message || res.statusMessage;
});

export default (app: Application) => {
  // Print all logs to console
  app.use(logger("dev", { skip }));

  //
  app.use(
    logger(
      (tokens, req, res) =>
        Object.entries({
          Address: tokens["remote-addr"](req, res),
          User: tokens["remote-user"](req, res),
          Time: tokens.date(req, res, "iso"),
          URL: `"${tokens.method(req, res)} ${tokens.url(req, res)}"`,
          HTTPVersion: tokens["http-version"](req, res),
          Status: tokens.status(req, res),
          ContentLength: tokens.res(req, res, "content-length"),
          Referrer: tokens.referrer(req, res),
          UserAgent: `"${tokens["user-agent"](req, res)}"`,
          ResponseTime: tokens["response-time"](req, res),
          ResponseTimeMs: tokens["response-time"](req, res, "ms"),
          Error: `"${tokens.error(req, res)}"`,
        })
          .map(([key, val]) => `${key}[${val || null}]`)
          .join(" "),
      {
        skip: (req, res) => skip(req, res) || res.statusCode < 400,
        stream: accessLogStream,
      }
    )
    // logger("combined", {
    //   skip: (req, res) => skip(req, res) || res.statusCode < 400,
    //   stream: accessLogStream,
    // }),
  );
};
