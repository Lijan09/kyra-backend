import File, { IFile } from "../models/File";

export class FileRepository {
  async create(data: Partial<IFile>) {
    return await File.create(data);
  }

  async findAll() {
    return await File.find().sort({ timestamp: -1 });
  }

  async countFiles(): Promise<number> {
    return await File.countDocuments();
  }
}
