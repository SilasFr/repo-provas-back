import supertest from "supertest";
import app from "../../src/app";

export async function getTests(token: string) {
  const searchResult = await supertest(app)
    .get("/tests?groupBy=disciplines")
    .set("Authorization", `Bearer ${token}`);

  return searchResult.body.tests[0].disciplines[0].teacherDisciplines[0]
    .tests[0];
}
