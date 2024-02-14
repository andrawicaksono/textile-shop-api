import fs, { ReadStream } from 'fs';
import path from 'path';
import { ApplicationError } from '../utils/error';

export class FileService {
  getFile = async (filename: string): Promise<[ReadStream | null, Error | null]> => {
    try {
      const filePath = path.join(__dirname, '../../uploads', filename);

      if (!fs.existsSync(filePath)) {
        throw new ApplicationError("File not found", 404);
      }

      const fileData = fs.createReadStream(filePath);

      return [fileData, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
