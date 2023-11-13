import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { JobApplicationService } from './jobApplication.service';
import { CreateJobApplicationDto } from './dto/createApplication.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../user/user.interface';
import { Offer } from 'src/offer/offer.entity';
import JobApplication from './jobApplication.entity';
import { ConflictException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import RoleGuard from 'src/auth/role.guard';
import Role from 'src/user/role.enum';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { UploadedFile } from '@nestjs/common';
import { multerConfig } from '../fileUploadService/multerConfig';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';
import { ApplicationToBeFetchedToFrontend } from './jobApplication.interface';

@Controller('job-applications')
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
    @InjectRepository(Offer)
    private readonly fileUploadService: FileUploadService,
  ) {}

  @UseGuards(RoleGuard(Role.Employee))
  @UseGuards(AuthGuard('jwt'))
  @Get('offers-applied-for')
  async getAllUserApplications(
    @Request() request: RequestWithUser,
  ): Promise<ApplicationToBeFetchedToFrontend[]> {
    return this.jobApplicationService.getAllUserApplications(request.user);
  }

  @UseGuards(RoleGuard(Role.Employer))
  @UseGuards(AuthGuard('jwt'))
  @Get('applications-for-user-offers')
  async getApplicantsForUserOffers(
    @Request() request: RequestWithUser,
  ): Promise<ApplicationToBeFetchedToFrontend[]> {
    return this.jobApplicationService.getApplicantsForUserOffers(request.user);
  }

  @UseGuards(RoleGuard(Role.Employee))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('cv', multerConfig))
  async createJobApplication(
    @Body() createJobApplicationDto: CreateJobApplicationDto,
    @Request() request: RequestWithUser,
    @UploadedFile() cv: Express.Multer.File,
  ): Promise<JobApplication> {
    try {
      const userCvUploadedAlready = request.user.cv;

      if (userCvUploadedAlready) {
        createJobApplicationDto.cvFilePath = userCvUploadedAlready;
      }

      if (cv) {
        if (!cv) {
          throw new ConflictException(
            'You need  to attach cv to apply for the offer.',
          );
        }
        createJobApplicationDto.cvFileBuffer = cv.buffer;
        createJobApplicationDto.cvFileName = cv.originalname;
      }

      console.log(request.user);

      return this.jobApplicationService.createJobApplication(
        createJobApplicationDto,
        request.user,
      );
    } catch (error) {
      console.error('Error in createJobApplication:', error);
      throw error;
    }
  }
}
