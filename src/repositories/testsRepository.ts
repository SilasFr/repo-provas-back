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
              Test: { include: { category: { select: { name: true } } } },
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

export async function getByDiscipline2() {}
