import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
  UploadedFile,
  UseInterceptors,
  Patch,
  UploadedFiles,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/user/user.interface';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { multerConfig } from 'src/fileUploadService/multerConfig';
import { EditProfileDto } from './dto/editProfile.dto';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post('signin')
  async signIn(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(signinDto);
    console.log(user.roles);
    return await this.authService.createToken(user);
  }

  @Post('signup')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cv', maxCount: 1 },
      { name: 'avatarImage', maxCount: 1 },
    ]),
  )
  async signUp(
    @Body() signupDto: SignupDto,
    @UploadedFiles()
    files: { cv?: Express.Multer.File[]; avatarImage?: Express.Multer.File[] },
  ): Promise<any> {
    const cv = files.cv[0];
    const avatarImage = files.avatarImage[0];

    console.log(cv, avatarImage);
    if (!cv) {
      throw new Error('CV file is required.');
    }

    console.log('CV Buffer:', cv.buffer);
    console.log('CV Original Name:', cv.originalname);
    console.log('image Buffer:', avatarImage.buffer);
    console.log('avatarImage:', avatarImage.originalname);

    signupDto.cvFileName = cv.originalname;
    signupDto.cvFileBuffer = cv.buffer;

    signupDto.cv = await this.fileUploadService.uploadFileCv(
      signupDto.cvFileName,
      signupDto.cvFileBuffer,
    );

    if (!avatarImage) {
      throw new Error('Avatar Image is required');
    }

    signupDto.avatarImageName = avatarImage.originalname;
    signupDto.avatarImageFileBuffer = avatarImage.buffer;

    signupDto.avatarImage = await this.fileUploadService.uploadImage(
      signupDto.avatarImageName,
      signupDto.avatarImageFileBuffer,
    );

    return this.userService.createUser(signupDto);
  }

  @UseGuards(AuthGuard())
  @Patch('editprofile')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cv', maxCount: 1 },
      { name: 'avatarImage', maxCount: 1 },
    ]),
  )
  async editProfile(
    @Body() editProfileDto: EditProfileDto,
    @UploadedFiles()
    files: { cv?: Express.Multer.File[]; avatarImage?: Express.Multer.File[] },
    @Request() request: RequestWithUser,
  ): Promise<any> {
    const userId = request.user.id;
  
    if (files.cv) {
      const cv = files.cv[0];
      editProfileDto.cvFileName = cv.originalname;
      editProfileDto.cvFileBuffer = cv.buffer;
      editProfileDto.cv = await this.fileUploadService.uploadFileCv(
        editProfileDto.cvFileName,
        editProfileDto.cvFileBuffer,
      );
    } else {
      editProfileDto.cv = request.user.cv;
    }
  
    if (files.avatarImage) {
      const avatarImage = files.avatarImage[0];
      editProfileDto.avatarImageName = avatarImage.originalname;
      editProfileDto.avatarImageFileBuffer = avatarImage.buffer;
      editProfileDto.avatarImage = await this.fileUploadService.uploadImage(
        editProfileDto.avatarImageName,
        editProfileDto.avatarImageFileBuffer,
      );
    } else {
      editProfileDto.avatarImage = request.user.avatarImage;
    }
  
    const updatedUser = await this.userService.updateUserInfo(
      userId,
      editProfileDto,
    );
  
    console.log('User Updated', updatedUser.username);
    return updatedUser;
  }
  

  @UseGuards(AuthGuard())
  @Get('me')
  async getLoggedInUser(@Request() request: RequestWithUser): Promise<any> {
    return request.user;
  }
}
