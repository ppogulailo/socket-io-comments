import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
export class FindCommentDto {
  @IsEmail()
  message: string;
  @IsString()
  id: string;
  @IsBoolean()
  data: boolean;
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsNumber()
  page: number;
}
