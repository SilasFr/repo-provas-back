import teacherRepository from "../repositories/teacherRepository.js";

async function getByDiscipline(id: string) {
  return teacherRepository.getByDiscipline(Number(id));
}

export default { getByDiscipline };
