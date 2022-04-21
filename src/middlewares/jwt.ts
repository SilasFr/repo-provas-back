import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function generateToken(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const encriptingKey = process.env.JWT_SECRET;
  const config = { expiresIn: 60 * 60 * 24 };

  const token = jwt.sign(data, encriptingKey, config);

  res.locals.token = token;
  next();
}

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
