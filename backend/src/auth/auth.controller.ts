import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
  UseInterceptors,
  Patch,
  UploadedFiles,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/user/user.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/fileUploadService/multerConfig';
import { EditProfileDto } from './dto/editProfile.dto';
import { FileUploadService } from 'src/fileUploadService/file-upload-service';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
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
  ) {
    if (files.cv) {
      const cv = files.cv[0];
      signupDto.cvFileName = cv.originalname;
      signupDto.cvFileBuffer = cv.buffer;
    }

    if (files.avatarImage) {
      const avatarImage = files.avatarImage[0];
      signupDto.avatarImageName = avatarImage.originalname;
      signupDto.avatarImageFileBuffer = avatarImage.buffer;
    }

    console.log(files.cv, files.avatarImage);
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
  ): Promise<User> {
    const currentPassword = request.body.currentPassword;

    const user = await this.authService.validateUser({
      username: request.user.username,
      password: currentPassword,
    });

    const userId = request.user.id;

    const oldPasswordIsValid = await this.authService.validatePassword(
      currentPassword,
      user.password,
    );

    console.log(
      `is valid ? ${oldPasswordIsValid}`,
      currentPassword,
      user.password,
    );

    if (!oldPasswordIsValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    if (currentPassword === editProfileDto.password) {
      throw new UnauthorizedException(
        'Old and new password cannot be the same ',
      );
    }
    if (editProfileDto.password === '') {
      editProfileDto.password = currentPassword;
    }
    if (files.cv) {
      const cv = files.cv[0];
      editProfileDto.cvFileName = cv.originalname;
      editProfileDto.cvFileBuffer = cv.buffer;
    }

    if (files.avatarImage) {
      const avatarImage = files.avatarImage[0];
      editProfileDto.avatarImageName = avatarImage.originalname;
      editProfileDto.avatarImageFileBuffer = avatarImage.buffer;
    }

    const updatedUser = await this.userService.updateUserInfo(
      userId,
      editProfileDto,
      files,
    );

    console.log('User Updated', updatedUser.username);
    return updatedUser;
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async getLoggedInUser(@Request() request: RequestWithUser): Promise<User> {
    return request.user;
  }
}
