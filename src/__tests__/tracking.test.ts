import { TrackingService } from "../services/tracking.service";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

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

describe("TrackingService", () => {
  it("should record an action", async () => {
    const service = new TrackingService();
    await service.record("user1", "login", { ip: "127.0.0.1" });
    const logs = await service.getAll();
    expect(logs.length).toBe(1);
    expect(logs[0].action).toBe("login");
  });
});
