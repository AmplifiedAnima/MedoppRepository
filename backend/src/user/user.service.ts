import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { Hash } from 'src/utils/hash.util';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { ConflictException } from '@nestjs/common/exceptions';

type FileData = {
  [fieldName: string]: Express.Multer.File;
};
@Injectable()
export class UsersService {
  private s3Client: S3Client;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private fileUploadService: FileUploadService,
    private configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async get(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
  async createUser(signupDto: SignupDto): Promise<User> {
    const user = await this.getByUsername(signupDto.username);

    if (user) {
      throw new ConflictException('Username already exists.');
    }
    if (signupDto.cvFileBuffer) {
      signupDto.cv = await this.fileUploadService.uploadFileCv(
        signupDto.cvFileName,
        signupDto.cvFileBuffer,
      );
    } else {
      signupDto.cv = '';
    }

    if (signupDto.avatarImageFileBuffer) {
      signupDto.avatarImage = await this.fileUploadService.uploadImage(
        signupDto.avatarImageName,
        signupDto.avatarImageFileBuffer,
      );
    } else {
      signupDto.avatarImage = '';
    }
    const newUser = this.userRepository.create({
      avatarImage: signupDto.avatarImage,
      username: signupDto.username,
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      password: Hash.make(signupDto.password),
      phoneNumber: signupDto.phoneNumber,
      email: signupDto.email,
      city: signupDto.city,
      cv: signupDto.cv,
      address: signupDto.address,
      roles: [signupDto.role],
    });

    const userToDatabase = await this.userRepository.save(newUser);

    return userToDatabase;
  }

  async updateUserInfo(
    userId: string,
    updatedInfo: Partial<User>,
    files: {
      cv?: Express.Multer.File[]; 
      avatarImage?: Express.Multer.File[];
    }
  ): Promise<User> {
    const user = await this.get(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updatedInfo.username === '') {
      throw new Error('Username cannot be empty');
    }

    if (updatedInfo.username && updatedInfo.username !== user.username) {
      const existingUserWithUsername = await this.getByUsername(
        updatedInfo.username,
      );
      if (existingUserWithUsername) {
        throw new Error('Username already exists');
      }
    }

    if (updatedInfo.password === '') {
      throw new Error('Password cannot be empty');
    }

    if (files.cv) {
      updatedInfo.cv = await this.fileUploadService.uploadFileCv(
        updatedInfo.cvFileName,
        updatedInfo.cvFileBuffer,
      );
    }

    if (files.avatarImage) {
      updatedInfo.avatarImage = await this.fileUploadService.uploadImage(
        updatedInfo.avatarImageName,
        updatedInfo.avatarImageFileBuffer,
      );
    }

    if (updatedInfo.password !== null) {
      updatedInfo.password = Hash.make(updatedInfo.password);
    }
    console.log(updatedInfo);

    Object.assign(user, updatedInfo);

    return await this.userRepository.save(user);
  }
}
