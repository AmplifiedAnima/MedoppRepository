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
import { FileInterceptor } from '@nestjs/platform-express';
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
    FileInterceptor('cv', multerConfig),
    FileInterceptor('avatarImage', multerConfig))
  async signUp(
    @Body() signupDto: SignupDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<any> {
    const cv = files[0]; // The first file in the array.
    const avatarImage = files[1]; //
    if (!cv) {
      throw new Error('CV file is required.');
    }

    signupDto.cvFileName = cv.originalname;
    signupDto.cvFileBuffer = cv.buffer;

    signupDto.cv = await this.fileUploadService.uploadFileCv(
      signupDto.cvFileName,
      signupDto.cvFileBuffer,
    );

    if (!avatarImage) {
      throw new Error('Avatar Image is required');
    }

    // signupDto.avatarImageName = avatarImage.originalname;
    // signupDto.avatarImageFileBuffer = avatarImage.buffer;

    // signupDto.avatarImage = await this.fileUploadService.uploadImage(
    //   signupDto.avatarImageName,
    //   signupDto.avatarImageFileBuffer,
    // );

    // console.log('CV Buffer:', cv.buffer);
    // console.log('CV Original Name:', cv.originalname);
    // console.log('image Buffer:', avatarImage.buffer);
    // console.log('CV Original Name:', avatarImage.originalname);

    return this.userService.createUser(signupDto);
  }

  @UseGuards(AuthGuard())
  @Patch('editprofile')
  async editProfile(
    @Body() editProfileDto: EditProfileDto,
    @Request() request: RequestWithUser,
  ): Promise<any> {
    const userId = request.user.id;

    const updatedUser = await this.userService.updateUserInfo(
      userId,
      editProfileDto,
    );
    console.log('user Updated', updatedUser.username);
    return updatedUser;
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async getLoggedInUser(@Request() request: RequestWithUser): Promise<any> {
    return request.user;
  }
}
