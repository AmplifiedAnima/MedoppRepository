import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { User } from './user.entity';
import RoleGuard from 'src/auth/role.guard';
import { JobApplicationService } from 'src/jobApplication/jobApplication.service';
import { JobApplicationModule } from 'src/jobApplication/jobApplication.module';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, JobApplicationModule, FileUploadService],
  exports: [UsersService],
})
export class UsersModule {}
