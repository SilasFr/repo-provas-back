import { Test } from "@prisma/client";
import prisma from "../database.js";

export type TestCreate = Omit<Test, "id">;

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getFilteredTestsByDiscipline(filter: string) {
  return prisma.term.findMany({
    include: {
      disciplines: {
        where: {
          name: filter,
        },
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function getFilteredTestsByTeachers(filter: string) {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: { select: { name: true, id: true } },
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
    where: { teacher: { name: filter } },
  });
}

async function updateTestViewCount(id: number) {
  return prisma.test.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

async function create(test: TestCreate) {
  return await prisma.test.create({ data: { ...test } });
}

export default {
  getTestsByDiscipline,
  getFilteredTestsByDiscipline,
  getTestsByTeachers,
  getFilteredTestsByTeachers,
  updateTestViewCount,
  create,
};
