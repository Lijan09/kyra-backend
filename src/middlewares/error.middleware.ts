import { Request, Response, NextFunction } from "express";
import multer from "multer";
import logger from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err.message === "Invalid file format") {
    return res.status(400).json({ error: "Invalid file format" });
  } else {
    logger.error("Internal Server Error");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
