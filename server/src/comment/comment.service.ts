import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { COMMENT_SELECT_FIELDS } from './comment.constants';
import { CreateCommentDto } from './dto/create-comment.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async getAll(id: string, skip = 0, take = 25) {
    const post = await this.prismaService.post.findUnique({
      where: { id: id },
      select: {
        body: true,
        title: true,
        file: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          take: take,
          skip: skip,
          select: {
            ...COMMENT_SELECT_FIELDS,
            _count: { select: { likes: true } },
          },
        },
      },
    });

    const likes = await this.prismaService.like.findMany({
      where: {
        commentId: { in: post.comments.map((comment) => comment.id) },
      },
    });

    return {
      ...post,
      _count: true,
      comments: post.comments.map((comment) => {
        const { _count, ...commentFields } = comment;
        return {
          ...commentFields,
          likedByMe: likes.find((like) => like.commentId === comment.id),
          likeCount: _count.likes,
        };
      }),
    };
    const count = await this.prismaService.comment.count({
      where: {
        postId: id,
      },
    });
    return { post, count };
  }

  async getWithFilter(
    id: string,
    data = false,
    message = '',
    name = '',
    email = '',
    skip = 0,
    take = 25,
  ) {
    const post = await this.prismaService.post.findUnique({
      where: { id: id },

      select: {
        body: true,
        title: true,
        file: true,
        comments: {
          orderBy: {
            createdAt: data ? 'asc' : 'desc',
          },
          take: take,
          skip: skip,
          where: {
            parentId: null,
            user: {
              name: {
                contains: name,
              },
              email: {
                contains: email,
              },
            },
            message: {
              contains: message,
            },
          },
          select: {
            ...COMMENT_SELECT_FIELDS,
            _count: { select: { likes: true } },
          },
        },
      },
    });
    const likes = await this.prismaService.like.findMany({
      where: {
        commentId: { in: post.comments.map((comment) => comment.id) },
      },
    });

    const count = await this.prismaService.comment.count({
      where: {
        postId: id,
        parentId: null,
        user: {
          name: {
            contains: `${name}`,
          },
          email: {
            contains: `${email}`,
          },
        },
        message: {
          contains: `${message}`,
        },
      },
    });

    return {
      count,
      ...post,
      comments: post.comments.map((comment) => {
        const { _count, ...commentFields } = comment;
        return {
          ...commentFields,
          likedByMe: likes.find((like) => like.commentId === comment.id),
          likeCount: _count.likes,
        };
      }),
    };
  }

  async getComment(dto: { id: string }[]) {
    const child = await this.prismaService.comment.findMany({
      where: {
        id: { in: dto.map((child) => child.id) },
      },
      select: {
        ...COMMENT_SELECT_FIELDS,
        _count: { select: { likes: true } },
      },
    });
    const likes = await this.prismaService.like.findMany({
      where: {
        // userId: req.cookies.userId,
        commentId: { in: child.map((comment) => comment.id) },
      },
    });
    return {
      comments: child.map((comment) => {
        const { _count, ...commentFields } = comment;
        return {
          ...commentFields,
          likedByMe: likes.find((like) => like.commentId === comment.id),
          likeCount: _count.likes,
        };
      }),
    };
  }

  async add(dto: CreateCommentDto, userId: string) {
    return this.prismaService.comment
      .create({
        data: {
          message: dto.message,
          userId: userId,
          parentId: dto.parentId,
          postId: dto.id,
        },
        select: COMMENT_SELECT_FIELDS,
      })
      .then((comment) => {
        return {
          ...comment,
          likeCount: 0,
          likedByMe: false,
        };
      });
  }

  async update(dto: CreateCommentDto, id) {
    const { userId } = await this.prismaService.comment.findUnique({
      where: { id: dto.id },
      select: { userId: true },
    });
    if (userId !== id) {
      throw new WsException('Login was not successfull, wrong credentials');
    }

    return this.prismaService.comment.update({
      where: { id: dto.id },
      data: { message: dto.message },
      select: { message: true, id: true },
    });
  }

  async remove(id: string, userid: string) {
    const { userId } = await this.prismaService.comment.findUnique({
      where: { id: id },
      select: { userId: true },
    });

    if (userId !== userid) {
      throw new WsException('Login was not successfull, wrong credentials');
    }

    return this.prismaService.comment.delete({
      where: { id: id },
      select: { id: true },
    });
  }

  async toggleLike(id, userid) {
    const data = {
      commentId: id,
      userId: userid,
    };
    const like = await this.prismaService.like.findUnique({
      where: { userId_commentId: data },
    });

    if (like == null) {
      return await this.prismaService.like.create({ data }).then(() => {
        return { addLike: true, id: id };
      });
    } else {
      return await this.prismaService.like
        .delete({ where: { userId_commentId: data } })
        .then(() => {
          return { addLike: false, id: id };
        });
    }
  }
}
