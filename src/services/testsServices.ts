import * as testsRepo from "../repositories/testsRepository.js";

export async function getByFilter(filter: string) {
  if (filter === "discipline") {
    return await testsRepo.getByDiscipline();
  }

  if (filter === "teacher") {
    return await testsRepo.getByTeacher();
  }
}
