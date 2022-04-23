import { Router } from "express";
import { getExams } from "../controllers/examsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const examRouter = Router();

examRouter.get("/exams?:filter", getExams);

export default examRouter;
