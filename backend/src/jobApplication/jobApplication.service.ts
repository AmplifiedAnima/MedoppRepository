import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import JobApplication from './jobApplication.entity';
import { CreateJobApplicationDto } from './dto/createApplication.dto';
import { User } from '../user/user.entity';
import { Offer } from 'src/offer/offer.entity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config/dist';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';

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
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
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

    let cvFilePath = createJobApplicationDto.cvFilePath; // Use provided cvFilePath if available

    if (!cvFilePath) {
      // If cvFilePath is not provided, use the file upload service
      cvFilePath = await this.fileUploadService.uploadFileCv(
        createJobApplicationDto.cvFileName,
        createJobApplicationDto.cvFileBuffer,
      );
    }

    const newJobApplication = this.jobApplicationRepository.create({
      ...createJobApplicationDto,
      user,
      offer,
      cvFilePath,
    });

    await this.jobApplicationRepository.save(newJobApplication);

    return newJobApplication;
  }
}
