export interface FileIdGenerator {
  generateFileId(file: File): string;
}

export class FileIdGeneratorImpl implements FileIdGenerator {
  generateFileId(): string {
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}
