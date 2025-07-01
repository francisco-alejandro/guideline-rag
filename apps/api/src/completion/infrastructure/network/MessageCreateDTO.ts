import { IsOptional, IsString } from 'class-validator';

export class MessageCreateDTO {
  @IsString()
  @IsOptional()
  chatId?: string;

  @IsString()
  content: string;
}
