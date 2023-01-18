import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';
import { POST_SELECT_FIELD } from './post.constant';
import { Cache } from 'cache-manager';
import { LOGIN_ERROR } from 'src/auth/auth.constants';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAllPost() {
    return this.prismaService.post.findMany({
      select: POST_SELECT_FIELD,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async fetchPost(skip = 0, take = 25) {
    const post = await this.prismaService.post.findMany({
      select: POST_SELECT_FIELD,
      orderBy: {
        createdAt: 'desc',
      },
      take: Number(take),
      skip: Number(skip),
    });
    const count = await this.prismaService.post.count();

    return { post, count };
  }

  async createPost(dto: CreatePostDto, userId: string, file: string) {
    return this.prismaService.post.create({
      data: {
        body: dto.body,
        title: dto.title,
        userId: userId,
        file: file,
      },
      select: POST_SELECT_FIELD,
    });
  }

  async removePost(param: string, userid: string) {
    const { userId } = await this.prismaService.post.findUnique({
      where: { id: param },
      select: { userId: true },
    });
    if (userId !== userid) {
      throw new UnauthorizedException(LOGIN_ERROR);
    }
    return this.prismaService.post.delete({
      where: { id: param },
      select: { id: true },
    });
  }
}
