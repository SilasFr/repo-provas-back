import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers?.authorization;
  const encriptingKey = process.env.JWT_SECRET;

  try {
    jwt.verify(token, encriptingKey);
  } catch (e) {
    throw e;
  }

  next();
}
