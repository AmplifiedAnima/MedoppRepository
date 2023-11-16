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

  userDataFunction = (user: User) => {
    const userData = {
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
    };
    return userData;
  };

  async createToken(user: User) {
    const userData = this.userDataFunction(user);
    return {
      expiresIn: '3600',
      accessToken: this.jwtService.sign(userData),
      user: userData,
    };
  }

  async validateToken(accessToken: string): Promise<User> {
    try {
      const decoded = this.jwtService.verify(accessToken);
      const user = await this.userService.get(decoded.user.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      console.log(`auth ${user}`);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
  async refreshToken(user: User) {
    const userData = this.userDataFunction(user);
    return {
      expiresIn: '3600',
      accessToken: this.jwtService.sign(userData),
      user: userData,
    };
  }
  async validateUser(signinDto: SigninDto): Promise<User> {
    const user = await this.userService.getByUsername(signinDto.username);
    const passwordMatch = await Hash.compare(signinDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    if (!user || !passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async validatePassword(password: string, hashedPassword: string) {
    const validPassword = await Hash.compare(password, hashedPassword);
    if (!validPassword) {
      throw new UnauthorizedException('Seems like the password doesnt match');
    }
    return validPassword;
  }
}
