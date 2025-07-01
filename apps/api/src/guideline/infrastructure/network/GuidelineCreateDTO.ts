import { IsArray, IsString } from 'class-validator';

export class GuidelineCreateDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
