import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";
import { generateToken } from "../middlewares/jwt.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import signupSchema from "../schemas/signupSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), signup);
authRouter.post(
  "/sign-in",
  validateSchema(signupSchema),
  generateToken,
  signin
);

export default authRouter;
