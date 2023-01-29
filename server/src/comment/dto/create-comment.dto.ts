import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @MinLength(1)
  @IsString()
  message: string;
  @IsOptional()
  @IsString()
  parentId: string;
  @IsString()
  id: string;
}
