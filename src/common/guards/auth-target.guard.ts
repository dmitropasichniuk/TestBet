import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PermissionDictionary } from '../dictionary/permission';
import { JwtPayloadData } from 'src/auth/dto/jwt-payload.data';

@Injectable()
export class AuthTargetGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToRpc().getData();
    const user: JwtPayloadData = request.user.payload.jwtPayloadData;

    if (user) {
      if (user.permissionLevel == PermissionDictionary.USER_ADMIN_PERMISSION_LEVEL) {
        return true;
      }

      if (user.userId == request.body.targetId) {
        return true;
      }
    }

    return false;
  }
}
