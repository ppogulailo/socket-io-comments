import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MAX_TXT_FILE_SIZE } from '../../post/post.constant';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    if (value.originalname.split('.')[1] == 'txt' && value.size > 100000) {
      throw new HttpException(MAX_TXT_FILE_SIZE, HttpStatus.PAYLOAD_TOO_LARGE);
    }
    return value;
  }
}
