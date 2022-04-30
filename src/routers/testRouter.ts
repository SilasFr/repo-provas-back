import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);
testRouter.patch("/tests/views/:id", testController.updateViews);
testRouter.post(
  "/tests/add",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(testSchema),
  testController.create
);

export default testRouter;
