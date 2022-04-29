import prisma from "../database.js";

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
      teacher: { select: {} },
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
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

export default {
  getTestsByDiscipline,
  getFilteredTestsByDiscipline,
  getTestsByTeachers,
  getFilteredTestsByTeachers,
  updateTestViewCount,
};
