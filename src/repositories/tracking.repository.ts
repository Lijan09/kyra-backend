import Tracking, { ITracking } from "../models/Tracking";

export class TrackingRepository {
  async create(data: Partial<ITracking>) {
    return await Tracking.create(data);
  }

  async findAll() {
    return await Tracking.find().sort({ timestamp: -1 });
  }

  async bulkCreate(data: Partial<ITracking>[]) {
    return await Tracking.insertMany(data);
  }
}
