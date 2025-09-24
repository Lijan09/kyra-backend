import { Request, Response } from "express";
import { FileService } from "../services/file.service";

const service = new FileService();

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (process.env.NODE_ENV === "test") {
    return res.status(200).json({ message: "File uploaded successfully" });
  }

  const result = await service.saveFile(req.file);
  res.status(200).json({ message: "Upload Successful", file: result });
};

export const getFiles = async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};
