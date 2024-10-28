import colors from "colors";

import type { ErrorRequestHandler } from "express";

const errorRequestHandler: ErrorRequestHandler = function (err, req, res, __) {
  const statusCode = err.status || err.statusCode || err.response?.status;

  console.log(colors.bgRed(err.name), colors.red(err.message));

  res.status(statusCode >= 400 ? statusCode : 500);
  res.send({
    error: err,
    message: err.message,
  });
};

export default errorRequestHandler;
