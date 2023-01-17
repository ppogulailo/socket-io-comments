import {
    MiddlewareConsumer,
    Module, NestModule,
    RequestMethod,
} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/guards/AuthCheak.guard';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        AuthModule,
        UsersModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: '/api/auth/signup', method: RequestMethod.POST },
                { path: '/api/auth/signin', method: RequestMethod.POST },
                { path: '/api/auth/refresh', method: RequestMethod.GET },
            )
            .forRoutes('');
    }
}