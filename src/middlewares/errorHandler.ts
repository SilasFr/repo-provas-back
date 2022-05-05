import { NextFunction, Request, Response } from "express";

export function ErrorHandler(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "bad_request") {
    res.status(400).send(error.message);
  }

  if (error.type === "unauthorized") {
    res.status(401).send(error.message);
  }

  if (error.type === "forbiden") {
    res.status(403).send(error.message);
  }

  if (error.type === "not_found") {
    res.status(404).send(error.message);
  }

  console.log("error-handler: ", error);
  res.status(500).send(error);
}
