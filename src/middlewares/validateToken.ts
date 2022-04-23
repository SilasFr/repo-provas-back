import { NextFunction, Request, Response } from "express";
import * as errorUtils from "../utils/errorUtils.js";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers?.authorization;
  if (!token) {
    throw errorUtils.unauthorized("user must be logged");
  }

  const encriptingKey: string = process.env.JWT_SECRET;

  try {
    const sessionId = jwt.verify(token, encriptingKey);
    await authServices.session(sessionId.toString());

    next();
  } catch (e) {
    throw e;
  }
}
