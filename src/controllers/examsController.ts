import { Request, Response } from "express";

export async function getExams(req: Request, res: Response) {
  const [filter] = Object.keys(req.query);
  console.log(filter);

  res.sendStatus(200);
}
