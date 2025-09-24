import logger from "../utils/logger";
import { FileRepository } from "../repositories/file.repository";
import { TrackingRepository } from "../repositories/tracking.repository";
import nodemailer from "nodemailer";
import config from "../config/config";

interface DataMetric {
  name: string;
  value: number;
  threshold: number;
}

export class QualityService {
  private alertCooldowns: Record<string, number> = {};

  constructor(
    private fileRepo = new FileRepository(),
    private trackingRepo = new TrackingRepository(),
    private cooldownSeconds = 300
  ) {}

  async checkMetrics() {
    const metrics: DataMetric[] = await this.gatherMetrics();

    for (const metric of metrics) {
      if (metric.value < metric.threshold) {
        const now = Date.now();
        if (
          !this.alertCooldowns[metric.name] ||
          now - this.alertCooldowns[metric.name] > this.cooldownSeconds * 1000
        ) {
          await this.sendAlert(metric);
          this.alertCooldowns[metric.name] = now;
        }
      }
    }
  }

  private async gatherMetrics(): Promise<DataMetric[]> {
    const metrics: DataMetric[] = [];

    const fileCount = await this.fileRepo.countFiles();
    metrics.push({ name: "totalFiles", value: fileCount, threshold: 1 });

    const trackingCount = await this.trackingRepo.countLogs();
    metrics.push({
      name: "totalTrackingLogs",
      value: trackingCount,
      threshold: 1,
    });

    return metrics;
  }

  private async sendAlert(metric: DataMetric) {
    const message = `Data quality alert: ${metric.name} is below threshold! Current value: ${metric.value}, Threshold: ${metric.threshold}`;

    logger.info("data_quality_alert", {
      metric: metric.name,
      value: metric.value,
    });

    await this.sendEmail("test@test.com", "Data Quality Alert", message);
  }

  private async sendEmail(to: string, subject: string, text: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: false,
        auth: {
          user: config.SMTP_USER,
          pass: config.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject,
        text,
      });
      logger.info("data_quality_email_sent", { to, subject });
    } catch (err) {
      logger.error("data_quality_email_error", { error: err });
    }
  }
}
