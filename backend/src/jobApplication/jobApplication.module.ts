import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import JobApplication from './jobApplication.entity';
import { JobApplicationController } from './jobApplication.controller';
import { JobApplicationService } from './jobApplication.service';
import { AuthModule } from 'src/auth/auth.module';
import { Offer } from 'src/offer/offer.entity';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/user.service';
import { UsersModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common/utils';
@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, Offer, User]), ConfigModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationService, ConfigModule, FileUploadService,UsersService],
})
export class JobApplicationModule {}
