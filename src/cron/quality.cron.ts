import cron from "node-cron";
import { QualityService } from "../services/quality.service";
import logger from "../utils/logger";

const dataQualityService = new QualityService();

cron.schedule("0 * * * *", async () => {
  logger.info("Running data quality check");
  await dataQualityService.checkMetrics();
});
