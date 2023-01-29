import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { recaptcha } = context.switchToHttp().getRequest().headers;
    console.log(recaptcha)
    console.log('sec',this.configService.get(
          'RECAPTCHA_SECRET',
        ))
    const { data } = await this.httpService
      .post(
        `https://www.google.com/recaptcha/api/siteverify?response=${recaptcha}&secret=${this.configService.get(
          'RECAPTCHA_SECRET',
        )}`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      .toPromise();
    if (!data.success) {
      throw new HttpException(data['error-codes'][0], 498);
    }

    return true;
  }
}
