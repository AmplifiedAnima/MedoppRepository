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
      throw new NotAcceptableException('Username already exists.');
    }

    const cvFilePath = await this.fileUploadService.uploadFileCv(
      signupDto.cvFileName,
      signupDto.cvFileBuffer,
    );

    const avatarImageFilePath = await this.fileUploadService.uploadImage(
      signupDto.avatarImageName,
      signupDto.avatarImageFileBuffer,
    );

    const newUser = this.userRepository.create({
      avatarImage: avatarImageFilePath,
      username: signupDto.username,
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      password: Hash.make(signupDto.password),
      phoneNumber: signupDto.phoneNumber,
      email: signupDto.email,
      city: signupDto.city,
      cv: cvFilePath,
      address: signupDto.address,
      roles: [signupDto.role],
    });

    const userToDatabase = await this.userRepository.save(newUser);

    return userToDatabase;
  }
  async updateUserInfo(
    userId: string,
    updatedInfo: Partial<User>,
  ): Promise<User> {
    const user = await this.get(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updatedInfo.username === '') {
      throw new NotAcceptableException('Username cannot be empty');
    }

    if (updatedInfo.username && updatedInfo.username !== user.username) {
      const existingUserWithUsername = await this.getByUsername(
        updatedInfo.username,
      );
      if (existingUserWithUsername) {
        throw new NotAcceptableException('Username already exists');
      }
    }

    if (updatedInfo.password === '') {
      throw new NotAcceptableException('Password cannot be empty');
    }

    if (updatedInfo.password !== null) {
      updatedInfo.password = Hash.make(updatedInfo.password);
    }
    console.log(updatedInfo)
    Object.assign(user, updatedInfo);

    return await this.userRepository.save(user);
  }
}
