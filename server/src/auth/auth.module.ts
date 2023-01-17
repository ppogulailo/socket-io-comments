import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RecaptchaGuard } from '../common/guards/reCaptcha.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [JwtModule.register({}), UsersModule, ConfigModule, HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
    PrismaService,
    RecaptchaGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
