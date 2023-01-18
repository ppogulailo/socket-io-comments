import { IsString } from 'class-validator';

export class ChildrenCommentDto {
  @IsString()
  id: string;
}
