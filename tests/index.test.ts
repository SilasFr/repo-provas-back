import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/database.js";
import { faker } from "@faker-js/faker";

describe("test user creation", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });
  it("should return status 201 given valid user", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(10),
    };

    const result = await supertest(app).post("/sign-up").send(user);

    expect(result.status).toEqual(201);
  });
});
