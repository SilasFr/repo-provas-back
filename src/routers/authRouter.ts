import { Router } from "express";
import { signup } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import signupSchema from "../schemas/signupSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), signup);

export default authRouter;
