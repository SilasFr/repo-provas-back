import prisma from "../src/database.js";
import { faker } from "@faker-js/faker";

async function main() {
  //upsert = update/insert
  //melhor que create por que pode dar conflito em campos unicos
  await prisma.user.upsert({
    where: {
      email: "silas@email.com",
    },
    update: {},
    create: {
      email: "silas@email.com",
      password: "testando123",
    },
  });

  await seedCategories();

  await seedTerms();

  await seedTeachers();

  await seedDisciplines();

  await seedTeacherDiscipline();

  await seedTests(20);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function seedTests(qty) {
  for (let i = 0; i < qty; i++) {
    await prisma.test.upsert({
      where: {
        id: i,
      },
      update: {},
      create: {
        name: faker.commerce.productName(),
        pdfUrl: faker.internet.url(),
        categoryId: Math.floor(Math.random() * 10) + 1,
        teacherDisciplineId: Math.floor(Math.random() * (6 - 1)) + 1,
      },
    });
  }
}

async function seedDisciplines() {
  await prisma.discipline.upsert({
    where: {
      name: "Desenvolvimento Web - FrontEnd estático",
    },
    update: {},
    create: {
      name: "Desenvolvimento Web - FrontEnd estático",
      termId: 1,
    },
  });

  await prisma.discipline.upsert({
    where: {
      name: "Desenvolvimento Web - FrontEnd dinâmico",
    },
    update: {},
    create: {
      name: "Desenvolvimento Web - FrontEnd dinâmico",
      termId: 2,
    },
  });

  await prisma.discipline.upsert({
    where: {
      name: "Desenvolvimento Web - Single Page Applications",
    },
    update: {},
    create: {
      name: "Desenvolvimento Web - Single Page Applications",
      termId: 3,
    },
  });

  await prisma.discipline.upsert({
    where: {
      name: "Desenvolvimento Web - BackEnd + Banco noSQL",
    },
    update: {},
    create: {
      name: "Desenvolvimento Web - BackEnd + Banco noSQL",
      termId: 4,
    },
  });

  await prisma.discipline.upsert({
    where: {
      name: "Desenvolvimento Web - SQL",
    },
    update: {},
    create: {
      name: "Desenvolvimento Web - SQL",
      termId: 5,
    },
  });

  await prisma.discipline.upsert({
    where: {
      name: "Desenvolvimento Web - Arquitetura de software",
    },
    update: {},
    create: {
      name: "Desenvolvimento Web - Arquitetura de software",
      termId: 6,
    },
  });
}

async function seedTeachers() {
  await prisma.teacher.upsert({
    where: {
      name: "Dina",
    },
    update: {},
    create: {
      name: "Dina",
    },
  });

  await prisma.teacher.upsert({
    where: {
      name: "Bruna",
    },
    update: {},
    create: {
      name: "Bruna",
    },
  });

  await prisma.teacher.upsert({
    where: {
      name: "Rita",
    },
    update: {},
    create: {
      name: "Rita",
    },
  });
}

async function seedTerms() {
  await prisma.term.upsert({
    where: {
      number: 1,
    },
    update: {},
    create: {
      number: 1,
    },
  });

  await prisma.term.upsert({
    where: {
      number: 2,
    },
    update: {},
    create: { number: 2 },
  });

  await prisma.term.upsert({
    where: {
      number: 3,
    },
    update: {},
    create: {
      number: 3,
    },
  });

  await prisma.term.upsert({
    where: {
      number: 4,
    },
    update: {},
    create: {
      number: 4,
    },
  });

  await prisma.term.upsert({
    where: { number: 5 },
    update: {},
    create: { number: 5 },
  });

  await prisma.term.upsert({
    where: { number: 6 },
    update: {},
    create: { number: 6 },
  });
}

async function seedCategories() {
  await prisma.category.upsert({
    where: {
      name: "P1",
    },
    update: {},
    create: {
      name: "P1",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "P2",
    },
    update: {},
    create: {
      name: "P2",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "P3",
    },
    update: {},
    create: {
      name: "P3",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "P2ch",
    },
    update: {},
    create: {
      name: "P2ch",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "Dinâmica de grupo",
    },
    update: {},
    create: {
      name: "Dinâmica de grupo",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "Teste de personalidade",
    },
    update: {},
    create: {
      name: "Teste de personalidade",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "Autoavaliação",
    },
    update: {},
    create: {
      name: "Autoavaliação",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "Pesquisa",
    },
    update: {},
    create: {
      name: "Pesquisa",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "Formulário",
    },
    update: {},
    create: {
      name: "Formulário",
    },
  });

  await prisma.category.upsert({
    where: {
      name: "Projetão",
    },
    update: {},
    create: {
      name: "Projetão",
    },
  });
}

async function seedTeacherDiscipline() {
  const webProf = await prisma.teacher.findUnique({ where: { name: "Dina" } });
  const webDisciplines = await prisma.discipline.findMany({
    where: {
      name: {
        contains: "Desenvolvimento Web",
      },
    },
  });

  webDisciplines.map(async (discipline) => {
    await prisma.teacherDiscipline.upsert({
      where: {
        id: discipline.id,
      },
      update: {},
      create: { disciplineId: discipline.id, teacherId: webProf.id },
    });
  });
}
