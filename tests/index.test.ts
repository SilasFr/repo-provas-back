import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/database.js";
import { faker } from "@faker-js/faker";

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
  it("should return tests filtered by query", async () => {});
});
