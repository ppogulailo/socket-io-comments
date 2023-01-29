import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/guards/AuthCheak.guard';
import { PostModule } from './post/post.module';
import { FilesModule } from './files/files.module';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 15,
    }),
    CacheModule.register({ isGlobal: true }),
    CommentModule,
    UsersModule,
    AuthModule,
    PostModule,
    FilesModule,
    HttpModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/auth/signup', method: RequestMethod.POST },
        { path: '/api/auth/signin', method: RequestMethod.POST },
        { path: '/api/auth/refresh', method: RequestMethod.GET },
          { path: '/api/files/image/:imagename', method: RequestMethod.GET },
      )
      .forRoutes('');
  }
}
