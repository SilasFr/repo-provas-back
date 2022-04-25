import { prisma } from "../database.js";

export async function getByDiscipline() {
  return prisma.term.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          TeacherDiscipline: {
            select: {
              Test: {
                select: {
                  id: true,
                  name: true,
                  teacherDiscipline: {
                    select: { teacher: { select: { name: true } } },
                  },
                  category: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getByTeacher() {
  return prisma.teacher.findMany({
    select: {
      name: true,
      TeacherDiscipline: {
        select: {
          discipline: {
            select: {
              term: { select: { tests: { include: { category: {} } } } },
            },
          },
        },
      },
    },
  });
}
