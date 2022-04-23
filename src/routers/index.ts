import { Router } from "express";
import authRouter from "./authRouter.js";
import examRouter from "./examsRouter.js";

const router = Router();

router.use(authRouter);
router.use(examRouter);

export default router;
