import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { PermissionDictionary } from '../dictionary/permission';

@Injectable()
export class RolesGuards implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.permissionLevel === PermissionDictionary.USER_CLIENT_PERMISSION_LEVEL ) {
      throw new HttpException('access is denied', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
