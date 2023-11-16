import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.entity';
import JobApplication from 'src/jobApplication/jobApplication.entity';
import { JobApplicationService } from 'src/jobApplication/jobApplication.service';
import { UsersService } from 'src/user/user.service';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer,User,JobApplication]), AuthModule],
  controllers: [OffersController],
  providers: [OffersService, JobApplicationService,UsersService,FileUploadService],
})
export class OfferModule {}
