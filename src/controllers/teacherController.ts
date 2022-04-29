import { Request, Response } from "express";
import teacherService from "../services/teacherService.js";

async function getByDiscipline(req: Request, res: Response) {
  const { disciplineId } = req.params;
  const teachers = teacherService.getByDiscipline(disciplineId);

  res.send(teachers);
}

export default {
  getByDiscipline,
};
