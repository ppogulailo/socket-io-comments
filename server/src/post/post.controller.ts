import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { CreatePostDto } from './dto/post.dto';
import { GenericService } from '../files/generic.service';
import { v4 } from 'uuid';
import { FilesService } from '../files/files.service';
import { RequestModel } from '../type/request.type';
import { POST_NOT_FOUND_ERROR } from './post.constant';
import { imageFileFilter } from 'src/files/files.filter';
import { PostService } from './post.service';
import { FileSizeValidationPipe } from '../common/pipes/file-size.validation.pipe';
@UseInterceptors(CacheInterceptor)
@Controller('post')
export class PostController {
  static genericService: GenericService;

  constructor(
    private readonly postService: PostService,
    private readonly filesService: FilesService,
    genericService: GenericService,
  ) {
    PostController.genericService = genericService;
  }
  @Get()
  @CacheTTL(60)
  async fetch(@Query() param) {
    const fetchPost = await this.postService.fetchPost(param.skip);
    if (!fetchPost) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }
    return fetchPost;
  }
  @Get('all')
  @CacheTTL(60)
  async findAllPost() {
    const fetchPost = await this.postService.findAllPost();
    if (!fetchPost) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }
    return fetchPost;
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: Express.Request, file: Express.Multer.File, cb) =>
          cb(null, 'uploads'),
        filename: (req: Express.Request, file: Express.Multer.File, cb) => {
          if (file.originalname.split('.')[1] == 'txt')
            file.mimetype = 'text/txt';
          const [, ext] = file.mimetype.split('/');
          PostController.genericService.pcoket.filename = `${v4()}.${ext}`;
          cb(null, PostController.genericService.pcoket.filename);
        },
      }),
      fileFilter: imageFileFilter,
      limits: {
        files: 1,
      },
    }),
  )
  async create(
    @Body() dto: CreatePostDto,
    @Req() req: RequestModel,
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new HttpException(
        req.fileValidationError,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const [, ext] = file.mimetype.split('/');

    await this.filesService.saveFile(ext, file);

    return this.postService.createPost(dto, req.user.id, file.filename);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestModel) {
    const deletedPost = this.postService.removePost(id, req.user.id);
    if (!deletedPost) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }
    return deletedPost;
  }
}
