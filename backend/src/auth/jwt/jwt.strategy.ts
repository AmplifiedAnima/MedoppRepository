import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/user/user.service';
import Role from 'src/user/role.enum';

interface JwtPayload {
  iat: number;
  exp: number;
  id: string;
  roles: Role[];
  username: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate({ id, username }: JwtPayload, done) {
    const user = await this.usersService.get(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    user.username = username;

    done(null, user);
  }
}
