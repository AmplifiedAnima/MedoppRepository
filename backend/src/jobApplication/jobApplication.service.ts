import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import JobApplication from './jobApplication.entity';
import { CreateJobApplicationDto } from './dto/createApplication.dto';
import { User } from '../user/user.entity';
import { Offer } from 'src/offer/offer.entity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config/dist';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';
import { ApplicationToBeFetchedToFrontend } from './jobApplication.interface';
import { UsersService } from 'src/user/user.service';
import { EditProfileDto } from 'src/auth/dto/editProfile.dto';

@Injectable()
export class JobApplicationService {
  private readonly s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly fileUploadService: FileUploadService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }
  async getAllUserApplications(
    user: User,
  ): Promise<ApplicationToBeFetchedToFrontend[]> {
    const userApplications = await this.offerRepository
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.applications', 'application')
      .where('application.user = :userId', { userId: user.id })
      .getMany();

    const applicants: ApplicationToBeFetchedToFrontend[] = [];

    userApplications.forEach((offer) => {
      offer.applications.forEach((application) => {
        const applicationDto: ApplicationToBeFetchedToFrontend = {
          ...application,
          offerId: offer.id,
          offer: offer,
        };
        applicants.push(applicationDto);
      });
    });

    return applicants;
  }

  // for applicants who applied
  async getApplicantsForUserOffers(
    user: User,
  ): Promise<ApplicationToBeFetchedToFrontend[]> {
    const userOffers = await this.offerRepository
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.applications', 'application')
      .leftJoinAndSelect('application.user', 'user')
      .where('offer.user = :userId', { userId: user.id })
      .getMany();

    const applicants: ApplicationToBeFetchedToFrontend[] = [];

    userOffers.forEach((offer) => {
      offer.applications.forEach((application) => {
        const { user, ...applicationTrimed } = application;
        const applicationDto: ApplicationToBeFetchedToFrontend = {
          ...applicationTrimed,
          offerId: offer.id,
          offer,
        };
        applicants.push(applicationDto);
      });
    });

    return applicants;
  }

  async getAllApplications(user: User): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  async createJobApplication(
    createJobApplicationDto: CreateJobApplicationDto,
    user: User,
  ): Promise<JobApplication> {
    console.log(user);

    const offerId = createJobApplicationDto.offerId;
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
    });

    console.log(offer, offerId);
    const existingJobApplication = await this.jobApplicationRepository.findOne({
      where: {
        user: { id: user.id },
        offer: { id: offerId },
      },
    });

    if (existingJobApplication) {
      throw new ConflictException(
        'You have already applied for this job offer.',
      );
    }
    let cvFilePath = createJobApplicationDto.cvFilePath;

    if (!cvFilePath) {
      cvFilePath = await this.fileUploadService.uploadFileCv(
        createJobApplicationDto.cvFileName,
        createJobApplicationDto.cvFileBuffer,
      );
    }

    await this.userRepository.save(user);
    const newJobApplication = this.jobApplicationRepository.create({
      ...createJobApplicationDto,
      user,
      offer,
      cvFilePath,
    });

    await this.jobApplicationRepository.save(newJobApplication);

    console.log(cvFilePath);
    this.usersService.updateCv(user.id, cvFilePath);

    return newJobApplication;
  }
}
