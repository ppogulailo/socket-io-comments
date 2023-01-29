import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { promisify } from 'util';
import { readFile } from 'fs';
import { GenericService } from './generic.service';

const readFileAsyc = promisify(readFile);
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private genericService: GenericService,
  ) {}

  async saveFile(ext: string, file: Express.Multer.File): Promise<void> {
    if (['jpeg', 'jpg', 'png', 'gif'].includes(ext)) {
      readFileAsyc(file.path)
        .then((b: Buffer) => {
          return sharp(b)
            .resize({ width: 320, height: 240 })
            .toFile(
              `${__dirname}/../../uploads/${this.genericService.pcoket.filename}`,
            );
        })
        .catch(() => {
          throw new Error('Unexpected error');
        });
    }
  }
}
