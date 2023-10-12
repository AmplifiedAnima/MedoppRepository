import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Specify the upload directory
      limits: {
        fileSize: 1024 * 1024, // File size limit (e.g., 1MB)
      },
    }),
  ],
})
export class FileUploadModule {}