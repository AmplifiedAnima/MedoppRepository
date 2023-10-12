import {
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

import Role from 'src/user/role.enum';
import { Buffer } from 'buffer';

export class SignupDto {
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
  avatarImage: string;

  avatarImageFileBuffer: Buffer;

  @IsString()
  avatarImageName: string;

  @IsString()
  @IsEnum(Role)
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email?: string;

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
