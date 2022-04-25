import { Request, Response } from "express";
import * as testsServices from "../services/testsServices.js";

export async function getTests(req: Request, res: Response) {
  const [filter] = Object.keys(req.query);

  const tests = await testsServices.getByFilter(filter);
  res.status(200).send(tests);
}
