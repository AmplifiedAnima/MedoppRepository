import {
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.interface';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: string, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
