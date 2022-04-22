import { Router } from "express";
import {
  signin,
  signup,
  validateSession,
} from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import signupSchema from "../schemas/signupSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), signup);
authRouter.post("/sign-in", validateSchema(signupSchema), signin);
authRouter.get("/session", validateSession);

export default authRouter;
