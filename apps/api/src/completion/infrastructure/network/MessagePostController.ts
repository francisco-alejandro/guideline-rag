import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessageCreateCommand } from '~completion/application/create';
import { MessageCreateDTO } from './MessageCreateDTO';
import { MessageSemanticReadQuery } from '~completion/application/read';
import { MessageSerializer } from '../serializer';
import { Message } from '~completion/domain';

type Guideline = {
  content: string;
};

interface GuidelineAdapter {
  read: (content: string) => Promise<Guideline[]>;
}

@Controller('messages')
export class MessagePostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('Guideline')
    private readonly guidelineAdapter: GuidelineAdapter,
  ) {}

  private async getGuidelines(content: string): Promise<string[]> {
    const guidelines = await this.guidelineAdapter.read(content);

    return guidelines.map((guideline) => guideline.content);
  }

  private async getMessages(content: string): Promise<Message[]> {
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

    const response = await this.commandBus.execute<
      MessageCreateCommand,
      Message
    >(command);

    return new MessageSerializer(response);
  }
}
