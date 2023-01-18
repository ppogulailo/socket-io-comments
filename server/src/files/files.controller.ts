import { CacheTTL, Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { GenericService } from './generic.service';
import { join } from 'path';
import { of } from 'rxjs';
@Controller('files')
export class FilesController {
  static genericSercive: GenericService;
  constructor(
    public filesService: FilesService,
    genericSercive: GenericService,
  ) {
    FilesController.genericSercive = genericSercive;
  }

  @Get('image/:imagename')
  @CacheTTL(60)
  async findFile(@Param('imagename') imagename, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }
}
