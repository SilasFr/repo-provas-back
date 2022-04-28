import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import testRouter from "./testRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(testRouter);
router.use(categoryRouter);

export default router;

// "test": "dotenv -e .env.test npx prisma db seed && NODE_OPTIONS=--experimental-vm-modules dotenv -e .env.test jest -i",
