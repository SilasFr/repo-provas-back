import { Request, Response } from "express";
import * as authServices from "../services/authServices.js";
import bcrypt from "bcrypt";

export async function signup(req: Request, res: Response) {
  let { email, password } = req.body;
  password = bcrypt.hashSync(password, 10);

  await authServices.create(email, password);
  res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {}
