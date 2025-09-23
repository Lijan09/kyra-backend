import { Request, Response } from "express";
import { TrackingService } from "../services/tracking.service";

const service = new TrackingService();

export const logAction = async (req: Request, res: Response) => {
  const { userId, action, metadata } = req.body;
  const result = await service.record(userId, action, metadata);
  res.json(result);
};

export const getActions = async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};
