import { QualityService } from "./../services/quality.service";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { FileRepository } from "../repositories/file.repository";
import { TrackingRepository } from "../repositories/tracking.repository";
import File from "../models/File";
import Tracking from "../models/Tracking";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await File.deleteMany({});
  await Tracking.deleteMany({});
});

describe("Data Quality Check", () => {
  it("should detect low file count and tracking logs", async () => {
    const fileRepo = new FileRepository();
    const trackingRepo = new TrackingRepository();
    const service = new QualityService(fileRepo, trackingRepo, 0);

    const metricsSpy = jest
      .spyOn(service as any, "sendAlert")
      .mockResolvedValue(undefined);

    await service.checkMetrics();

    expect(metricsSpy).toHaveBeenCalledTimes(2);
  });

  it("should not send alert if counts meet threshold", async () => {
    await File.create({
      filename: "file1.pdf",
      path: "/uploads/file1.pdf",
      size: 10,
    });
    await Tracking.create({
      userId: "user1",
      action: "login",
      timestamp: new Date(),
    });

    const fileRepo = new FileRepository();
    const trackingRepo = new TrackingRepository();
    const service = new QualityService(fileRepo, trackingRepo, 0);

    const metricsSpy = jest
      .spyOn(service as any, "sendAlert")
      .mockResolvedValue(undefined);

    await service.checkMetrics();

    expect(metricsSpy).not.toHaveBeenCalled();
  });
});
