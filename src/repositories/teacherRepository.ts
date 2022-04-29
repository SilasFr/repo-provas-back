import prisma from "../database.js";

async function getByDiscipline(id: number) {
  return await prisma.teacher.findMany({
    where: {
      teacherDisciplines: { every: { disciplineId: id } },
    },
  });
}

export default { getByDiscipline };
