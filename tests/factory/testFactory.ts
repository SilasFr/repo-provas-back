import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database";

export async function getTests(token: string) {
  const searchResult = await supertest(app)
    .get("/tests?groupBy=disciplines")
    .set("Authorization", `Bearer ${token}`);

  return searchResult.body.tests[0].disciplines[0].teacherDisciplines[0]
    .tests[0];
}

export async function getTestById(id: number) {
  return await prisma.test.findUnique({ where: { id: id } });
}
