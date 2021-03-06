import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import { ErrorHandler } from "./middlewares/errorHandler.js";
import router from "./routers/index.js";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(router);
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`running on ${process.env.PORT}`);
});
