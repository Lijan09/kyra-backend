import { FileRepository } from "../repositories/file.repository";
import logger from "../utils/logger";

export class FileService {
  private repo: FileRepository;

  constructor() {
    this.repo = new FileRepository();
  }

  async saveFile(file: Express.Multer.File) {
    if (!file) {
      logger.warn("File required for upload");
      return;
    }

    const saved = await this.repo.create({
      filename: file.originalname,
      path: file.path,
      size: file.size,
    });
    logger.info("file_upload", saved.toObject());
    return saved;
  }

  async getAll() {
    return await this.repo.findAll();
  }
}
