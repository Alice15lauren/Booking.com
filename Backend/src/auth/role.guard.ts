import { Role } from 'src/auth/roles.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES_KEY } from './role.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { role?: Role } }>();

    const user = request.user;

    if (!user || !user.role) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
