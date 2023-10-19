import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/user.service';
import { Hash } from 'src/utils/hash.util';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: User) {
    return {
      expiresIn: '3600',
      accessToken: this.jwtService.sign({
        username: user.username,
        id: user.id,
        roles: user.roles,
        avatarImage: user.avatarImage,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address,
        city: user.city,
        cv: user.cv,
      }),
      user: {
        id: user.id,
        roles: user.roles,
        avatarImage: user.avatarImage,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address,
        city: user.city,
        cv: user.cv,
      },
    };
  }

  async validateUser(signinDto: SigninDto) {
    const user = await this.userService.getByUsername(signinDto.username);
    const passwordMatch = await Hash.compare(signinDto.password, user.password);

    if (!user || !passwordMatch) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }

  async validatePassword(password: string, hashedPassword: string) {
    const validPassword = await Hash.compare(password, hashedPassword);
    return validPassword;
  }
}
