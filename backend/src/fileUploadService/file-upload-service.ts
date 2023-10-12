import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Buffer } from 'buffer';

@Injectable()
export class FileUploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFileToBucket(
    bucketName: string,
    fileName: string,
    file: Buffer,
  ): Promise<string> {
    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: file,
        }),
      );

      console.log('AWS S3 Response:', response);

      const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
      console.log('File uploaded successfully.');
      return fileUrl;
    } catch (error) {
      console.error('Error uploading file to AWS S3:', error);
      throw error;
    }
  }

  async uploadFileCv(fileName: string, file: Buffer): Promise<string> {
    const bucketName = 'cv-bucket-medopp';
    return this.uploadFileToBucket(bucketName, fileName, file);
  }

  async uploadImage(fileName: string, image: Buffer): Promise<string> {
    const bucketName = 'avatar-image-bucket-medopp';
    return this.uploadFileToBucket(bucketName, fileName, image);
  }


}
