import teacherRepository from "../repositories/teacherRepository.js";

async function getByDiscipline(id: string) {
  return await teacherRepository.getByDiscipline(Number(id));
}

export default { getByDiscipline };
