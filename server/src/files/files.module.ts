import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { GenericService } from './generic.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, GenericService, PrismaService],
  exports: [FilesService, GenericService],
})
export class FilesModule {}
