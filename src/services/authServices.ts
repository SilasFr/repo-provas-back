import * as authRepo from "../repositories/authRepository.js";

export async function create(email: string, password: string) {
  await authRepo.create(email, password);
}
