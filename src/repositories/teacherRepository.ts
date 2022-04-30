import prisma from "../database.js";

async function getByDiscipline(id: number) {
  return await prisma.teacher.findMany({
    where: {
      teacherDisciplines: { some: { disciplineId: id } },
    },
  });
}

export default { getByDiscipline };
