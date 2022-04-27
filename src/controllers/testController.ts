import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy, where } = req.query as { groupBy: string; where: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  if (where) {
    const tests = await testService.findSearch({ groupBy }, where);
    return res.send({ tests });
  }

  const tests = await testService.find({ groupBy });
  res.send({ tests });
}

export default {
  find,
};
