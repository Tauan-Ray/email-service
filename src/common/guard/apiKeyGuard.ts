import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { serverConfig } from 'src/config/env';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const apikey = req.headers['x-api-key'];
    if (apikey !== serverConfig.email_service_key) {
      throw new UnauthorizedException('API KEY inválida');
    }

    return true;
  }
}
