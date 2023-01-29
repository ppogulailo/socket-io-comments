import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from '../prisma/prisma.service';
import { LOGIN_ERROR } from '../auth/auth.constants';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
    return createdUser;
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    return user;
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async remove(id: string) {
    const { id: userId } = await this.prismaService.user.findUnique({
      where: { id: id },
      select: { id: true },
    });
    if (userId !== id) {
      throw new UnauthorizedException(LOGIN_ERROR);
    }
    return this.prismaService.user.delete({
      where: { id: id },
      select: { id: true },
    });
  }
}
