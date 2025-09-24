import { Request, Response } from "express";
import { QualityService } from "../services/quality.service";

const dataQualityService = new QualityService();

export const qualityCheck = async (req: Request, res: Response) => {
  try {
    await dataQualityService.checkMetrics();
    res.status(200).json({ message: "Data quality check completed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to check data quality" });
  }
};
