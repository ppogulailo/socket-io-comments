import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from '../../users/users.service';
import { RequestModel } from '../../type/request.type';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  async use(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const tokenArray: string[] = req.headers['authorization'].split(' ');
      const decodedToken = await this.authService.verifyUser(tokenArray[1]);
      // make sure that the user is not deleted, or that props or rights changed compared to the time when the jwt was issued
      const user = await this.userService.findById(decodedToken.sub);
      if (user) {
        // add the user to our req object, so that we can access it later when we need it
        // if it would be here, we would like overwrite
        req.user = user;
        next();
      } else {
        throw new UnauthorizedException('User is unauthorized');
      }
    } catch {
      throw new UnauthorizedException('User is unauthorized');
    }
  }
}
