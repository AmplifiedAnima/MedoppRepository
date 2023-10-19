import { IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { Buffer } from 'buffer';

export class EditProfileDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsString()
  currentPassword: string;

  @IsString()
  avatarImage: string;

  avatarImageFileBuffer: Buffer;

  @IsString()
  avatarImageName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  cv: string;

  @IsString()
  phoneNumber: string;

  cvFileBuffer: Buffer;

  @IsString()
  cvFileName: string;

  @IsString()
  address: string;

  @IsString()
  city: string;      
}
