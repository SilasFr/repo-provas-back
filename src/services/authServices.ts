import { Session, User } from "@prisma/client";
import * as authRepo from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

export async function create(email: string, password: string) {
  const encriptedPassword = bcrypt.hashSync(password, 10);

  await authRepo.create(email, encriptedPassword);
}

export async function login(email: string, password: string) {
  const user: User = await findUser(email);

  validateUserPassword(password, user);

  const token = await generateToken(user);

  return token;
}

async function generateToken(user: User) {
  const sessionToken = uuid();
  const session: Session = await authRepo.createSession(user.id, sessionToken);

  const data = session.id.toString();
  const encriptingKey = process.env.JWT_SECRET;
  const token = jwt.sign(data, encriptingKey);

  return token;
}

function validateUserPassword(password: string, user: User) {
  const isValidPassword: boolean = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    throw { type: "unauthorized" };
  }
}

async function findUser(email: string) {
  const user: User = await authRepo.findUserByEmail(email);
  if (!user) {
    throw { type: "not_found" };
  }
  return user;
}
