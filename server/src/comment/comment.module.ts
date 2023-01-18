import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaService } from '../prisma/prisma.service';
import { CommentGateway } from './comment.gateway';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [AuthModule],
  providers: [CommentService, PrismaService, CommentGateway, UsersService],
})
export class CommentModule {}
