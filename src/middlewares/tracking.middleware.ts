import { Request, Response, NextFunction } from "express";
import { TrackingService } from "../services/tracking.service";

const trackingService = new TrackingService();

export const trackAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await trackingService.record("anonymous", `${req.method} ${req.originalUrl}`, {
    ip: req.ip,
  });
  next();
};
