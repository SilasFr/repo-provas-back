import prisma from "../database.js";

async function getByDiscipline(id: number) {
  return await prisma.teacher.findMany({
    where: {
      teacherDisciplines: { some: { disciplineId: id } },
    },
  });
}

async function getTeacherDisciplineId(teacherId: number, disciplineId: number) {
  return await prisma.teacherDiscipline.findFirst({
    where: { disciplineId: disciplineId, teacherId: teacherId },
  });
}

export default {
  getByDiscipline,
  getTeacherDisciplineId,
};
