import { Router } from "express";
import { getTests } from "../controllers/testsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const testsRouter = Router();

testsRouter.get("/tests?:filter", getTests);

export default testsRouter;
