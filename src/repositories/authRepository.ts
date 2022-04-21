import { User } from "@prisma/client";
import { prisma } from "../database.js";

export type UserInsertData = Partial<User>;

export async function create(email: string, password: string) {
  return prisma.user.create({
    data: { email, password },
  });
}

export async function validate(email: string, password: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
