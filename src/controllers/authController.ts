import { Request, Response } from "express";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;

  await authServices.create(email, password);
  res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {
  const { email, password } = res.locals.payload;

  const token = await authServices.login(email, password);

  res.status(200).send(token);
}

export async function validateSession(req: Request, res: Response) {
  const token: string = req.headers?.authorization;
  if (!token) {
    res.sendStatus(422);
  }
  const encriptingKey: string = process.env.JWT_SECRET;

  try {
    const sessionId = jwt.verify(token, encriptingKey);
    await authServices.session(sessionId.toString());

    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
}
