import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`running on ${process.env.PORT}`);
});
