import { Request, Response } from "express";
import teacherService from "../services/teacherService.js";

async function getByDiscipline(req: Request, res: Response) {
  const { id } = req.params;
  const teachers = await teacherService.getByDiscipline(id);

  res.send(teachers);
}

export default {
  getByDiscipline,
};
