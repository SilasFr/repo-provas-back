import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/database.js";
import { faker } from "@faker-js/faker";
import { getTestById, getTests } from "./factory/testFactory.js";

const user = {
  email: faker.internet.email(),
  password: faker.internet.password(10),
};

describe("test user creation", () => {
  beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

  it("should return status 201 given valid user", async () => {
    const result = await supertest(app).post("/sign-up").send(user);
    expect(result.status).toEqual(201);
  });

  it("should login successfully", async () => {
    const result = await supertest(app).post("/sign-in").send(user);
    expect(result.status).toEqual(200);
  });
});

describe("tests sprint 2", () => {
  // Teste de pesquisa de prova
  it("should return tests by discipline", async () => {
    const response = await supertest(app).post("/sign-in").send(user);
    const token: string = response.body.token;

    const searchResult = await supertest(app)
      .get("/tests?groupBy=disciplines")
      .set("Authorization", `Bearer ${token}`);

    expect(searchResult.body.length).not.toBe(null);
    expect(searchResult.status).toEqual(200);
  });

  it("should return tests filtered by query", async () => {
    const response = await supertest(app).post("/sign-in").send(user);
    const token: string = response.body.token;

    const searchResult = await supertest(app)
      .get(
        "/tests?groupBy=disciplines&where=Desenvolvimento Web - Arquitetura de software"
      )
      .set("Authorization", `Bearer ${token}`);

    expect(searchResult.body.length).not.toBe(null);
    expect(searchResult.status).toEqual(200);
  });

  it("should not return any tests given invalid teacher name", async () => {
    const response = await supertest(app).post("/sign-in").send(user);
    const token: string = response.body.token;

    const searchResult = await supertest(app)
      .get("/tests?groupBy=teachers&where=Silas")
      .set("Authorization", `Bearer ${token}`);

    expect(searchResult.body.tests.length).toBe(0);
    expect(searchResult.status).toEqual(200);
  });

  it("should not return any tests given invalid discipline name", async () => {
    const response = await supertest(app).post("/sign-in").send(user);
    const token: string = response.body.token;

    const searchResult = await supertest(app)
      .get("/tests?groupBy=disciplines&where=Culinária")
      .set("Authorization", `Bearer ${token}`);

    expect(searchResult.body.tests[0].disciplines.length).toBe(0);
    expect(searchResult.status).toEqual(200);
  });

  // Testes de views
  it("it should increment the view count of a test", async () => {
    const responseLogin = await supertest(app).post("/sign-in").send(user);
    const token: string = responseLogin.body.token;

    const test = await getTests(token);

    const response = await supertest(app).patch(`/tests/views/${test.id}`);

    expect(response.status).toEqual(200);
  });

  //Testar adição de prova
  it("should add a new test given valid data", async () => {
    const responseLogin = await supertest(app).post("/sign-in").send(user);
    const token: string = responseLogin.body.token;

    const response = await supertest(app)
      .post("/tests/add")
      .send({
        name: faker.unique(faker.name.jobDescriptor),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        teacherId: 1,
        disciplineId: 1,
      })
      .set("Authorization", `Bearer ${token}`);

    const insertedPostId: number = response.body.id;

    const existingTest = await getTestById(insertedPostId);

    expect(existingTest).not.toBe(null);
    expect(response.status).toEqual(201);
  });
});
