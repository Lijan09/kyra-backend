import { TrackingRepository } from "../repositories/tracking.repository";
import logger from "../utils/logger";

export class TrackingService {
  private repo: TrackingRepository;
  private buffer: any[] = [];
  private bufferLimit = 100;
  private flushInterval = 10000;

  constructor() {
    this.repo = new TrackingRepository();
  }

  private async flushBuffer() {
    if (this.buffer.length === 0) return;

    try {
      await this.repo.bulkCreate(this.buffer);
      this.buffer = [];
    } catch (err) {
      logger.error("Flushing error: ", err);
    }
  }

  async record(userId: string, action: string, metadata?: Record<string, any>) {
    const logEntry = { userId, action, metadata };
    this.buffer.push(logEntry);

    logger.info("user_action", logEntry);

    if (this.buffer.length >= this.bufferLimit) {
      await this.flushBuffer();
    }
    return await this.repo.create({ userId, action, metadata });
  }

  async getAll() {
    return await this.repo.findAll();
  }
}
