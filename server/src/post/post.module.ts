import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';
import { FilesModule } from '../files/files.module';
import { HttpModule } from '@nestjs/axios';
import { CommentService } from '../comment/comment.service';
@Module({
  imports: [FilesModule, HttpModule],
  controllers: [PostController],
  providers: [PostService, PrismaService, CommentService],
})
export class PostModule {}
