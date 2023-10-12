import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import JobApplication from './jobApplication.entity';
import { JobApplicationController } from './jobApplication.controller';
import { JobApplicationService } from './jobApplication.service';
import { AuthModule } from 'src/auth/auth.module';
import { Offer } from 'src/offer/offer.entity';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, Offer]), ConfigModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationService, ConfigModule, FileUploadService],
})
export class JobApplicationModule {}
