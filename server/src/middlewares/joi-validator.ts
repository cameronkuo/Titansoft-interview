import Joi from "joi";

import type { RequestHandler } from "express";
import type { Schema, ValidationOptions } from "joi";

const joiValidator = (schema: Schema, options?: ValidationOptions): RequestHandler => {
  return (req, res, next) => {
    if (Joi.isSchema(schema) === false) {
      res.status(500).json({ error: "Invalid schema" });
      return;
    }
    const { error } = schema.validate(req.body, options);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    next();
  };
};

export default joiValidator;
