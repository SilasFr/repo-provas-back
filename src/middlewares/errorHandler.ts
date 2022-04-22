import { NextFunction, Request, Response } from "express";

export function ErrorHandler(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "bad_request") {
    res.send(error.message).status(400);
  }

  if (error.type === "unauthorized") {
    res.send(error.message).status(401);
  }

  if (error.type === "forbiden") {
    res.send(error.message).status(403);
  }

  if (error.type === "not_found") {
    res.send(error.message).status(404);
  }

  console.log("error-handler: ", error);
  res.status(500).send(error);
}
