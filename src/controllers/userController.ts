import { Request, Response } from "express";
import userService from "../services/userService.js";
import dotenv from "dotenv";
dotenv.config();

async function signUp(req: Request, res: Response) {
  const user = req.body;

  await userService.signUp(user);

  res.sendStatus(201);
}

async function signIn(req: Request, res: Response) {
  const user = req.body;

  const token = await userService.signIn(user);

  res.send({ token });
}

async function oauth(req: Request, res: Response) {
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  );
}

export default {
  signUp,
  signIn,
  oauth,
};
