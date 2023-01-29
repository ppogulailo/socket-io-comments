import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

// validation without check inside tag
// const htmlTagsWithOutTextInsideElemet =
//   /^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/;
const htmlTagsRegularExpression =
  /^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>([\w\s]+)[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/;

@Injectable()
export class HtmlValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value.match(htmlTagsRegularExpression)) {
      throw new WsException('Html is not valid');
    }
    return value;
  }
}
