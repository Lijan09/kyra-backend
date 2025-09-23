import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  filename: string;
  path: string;
  size: number;
  uploadedAt: Date;
}

const FileSchema: Schema = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IFile>("File", FileSchema);
