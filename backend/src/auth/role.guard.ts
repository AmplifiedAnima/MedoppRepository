import Role from 'src/user/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from 'src/user/user.interface';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      console.log('User:', user.username, user.roles, user.id); // Log user object
      console.log('Roles:', user?.roles); // Log roles
      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
