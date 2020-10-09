import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

interface Request {
  user: {
    id: number,
    permissionLevel: number,
  }
}

interface RequestUser {
  id: number,
  permissionLevel: number,
}

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private minLevel?: number) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToRpc().getData();
    const user: RequestUser = request.user;

    if (user.permissionLevel < this.minLevel) {
      return false;
    }

    return true;
  }
}
