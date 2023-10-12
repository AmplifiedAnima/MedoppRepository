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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import RoleGuard from 'src/auth/role.guard';
import Role from 'src/user/role.enum';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { UploadedFile } from '@nestjs/common';
import { multerConfig } from '../fileUploadService/multerConfig';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';

interface ApplicationToBeFetchedToFrontend {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  cvFilePath: string;
  offerId: string;
}

@Controller('job-applications')
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @UseGuards(RoleGuard(Role.Employee))
  @UseGuards(AuthGuard('jwt'))
  @Get('offers-applied-for')
  async getAllUserApplications(
    @Request() request: RequestWithUser,
  ): Promise<ApplicationToBeFetchedToFrontend[]> {
    const userApplications = await this.offerRepository
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.applications', 'application')
      .where('application.user = :userId', { userId: request.user.id })
      .getMany();

    const applicants: ApplicationToBeFetchedToFrontend[] = [];

    userApplications.forEach((offer) => {
      offer.applications.forEach((application) => {
        const applicationDto: ApplicationToBeFetchedToFrontend = {
          ...application,
          offerId: offer.id,
        };
        applicants.push(applicationDto);
      });
    });

    return applicants;
  }

  @UseGuards(RoleGuard(Role.Employer))
  @UseGuards(AuthGuard('jwt'))
  @Get('applications-for-user-offers')
  async getApplicantsForUserOffers(
    @Request() request: RequestWithUser,
  ): Promise<ApplicationToBeFetchedToFrontend[]> {
    console.log(request.user);
    const userOffers = await this.offerRepository
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.applications', 'application')
      .leftJoinAndSelect('application.user', 'user')
      .where('offer.user = :userId', { userId: request.user.id })
      .getMany();

    const applicants: ApplicationToBeFetchedToFrontend[] = [];

    userOffers.forEach((offer) => {
      offer.applications.forEach((application) => {
        const applicationDto: ApplicationToBeFetchedToFrontend = {
          ...application,
          offerId: offer.id,
        };
        applicants.push(applicationDto);
      });
    });

    return applicants;
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

      if (userCvUploadedAlready && !cv) {
        createJobApplicationDto.cvFilePath = userCvUploadedAlready;
      }

      if (cv) {
        createJobApplicationDto.cvFileBuffer = cv.buffer;
        createJobApplicationDto.cvFileName = cv.originalname;

        createJobApplicationDto.cvFilePath =
          await this.fileUploadService.uploadFileCv(
            createJobApplicationDto.cvFileName,
            createJobApplicationDto.cvFileBuffer,
          );
        console.log('CV Buffer:', cv.buffer); // Log the buffer
        console.log('CV Original Name:', cv.originalname);
      }
      if (!cv) {
        // Handle the case where cv is not provided
        throw new Error('CV file is required.');
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
