import mongoose, { Schema, Document } from "mongoose";

export interface ITracking extends Document {
  userId: string;
  action: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

const TrackingSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    action: { type: String, required: true },
    metadata: { type: Object },
    timestamp: { type: Date, default: Date.now },
  },
  {
    capped: { size: 1024 * 1024 * 100, max: 10000, autoIndexId: true },
  }
);

export default mongoose.model<ITracking>("Tracking", TrackingSchema);
