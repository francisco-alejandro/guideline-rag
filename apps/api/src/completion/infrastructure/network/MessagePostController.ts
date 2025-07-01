import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessageCreateCommand } from '~completion/application/create';
import { MessageCreateDTO } from './MessageCreateDTO';
import { MessageSemanticReadQuery } from '~completion/application/read';
import { MessageSerializer } from '../serializer';

interface GuidelineAdapter {
  read: (content: string) => Promise<{ content: string }[]>;
}

@Controller('messages')
export class MessagePostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('Guideline')
    private readonly guidelineAdapter: GuidelineAdapter,
  ) {}

  private async getGuidelines(content: string) {
    const guidelines = await this.guidelineAdapter.read(content);

    return guidelines.map((guideline) => guideline.content);
  }

  private async getMessages(content: string) {
    const query = new MessageSemanticReadQuery({
      content,
    });

    return this.queryBus.execute(query);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/')
  async register(@Body() body: MessageCreateDTO): Promise<MessageSerializer> {
    const { content } = body;

    const [messages, guidelines] = await Promise.all([
      this.getMessages(content),
      this.getGuidelines(content),
    ]);

    const command = new MessageCreateCommand({
      ...body,
      messages,
      guidelines,
    });

    const response = await this.commandBus.execute(command);

    return new MessageSerializer(response);
  }
}
