import { prisma } from "../database.js";

export async function create(email: string, password: string) {
  return prisma.user.create({
    data: { email, password },
  });
}
