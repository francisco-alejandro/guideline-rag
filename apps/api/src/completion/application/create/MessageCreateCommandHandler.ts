import { Inject } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmbedService, Id, ResponseService } from '~shared/domain';
import { MessageCreateCommand } from './MessageCreateCommand';
import { Message, MessageRepository, Prompt } from '~completion/domain';

@CommandHandler(MessageCreateCommand)
export class MessageCreateCommandHandler
  implements ICommandHandler<MessageCreateCommand>
{
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(MessageRepository) private repository: MessageRepository,
    @Inject(EmbedService) private embedService: EmbedService,
    @Inject(ResponseService) private responseService: ResponseService,
  ) {}

  private async createAndEmit(
    role: 'user' | 'assistant',
    chatId: Id,
    turnId: Id,
    content: string,
    vector: number[] | null,
  ): Promise<Message> {
    const message = Message.create(
      Id.generate(),
      role,
      chatId,
      turnId,
      content,
      vector,
    );

    await this.repository.save(message);

    for (const event of message.pullDomainEvents()) {
      this.bus.publish(event);
    }

    return message;
  }

  private getChatId(chatId: string | undefined): Id {
    if (chatId) {
      return new Id(chatId);
    }

    return Id.generate();
  }

  async execute(command: MessageCreateCommand): Promise<Message> {
    const { content } = command.data;
    const chatId = this.getChatId(command.data.chatId);
    const turnId = Id.generate();

    const embedding = await this.embedService.embed(content);

    await this.createAndEmit('user', chatId, turnId, content, embedding);

    const prompt = Prompt.create(
      command.data.messages,
      command.data.guidelines,
    );

    const text = await this.responseService.send(
      prompt.input,
      prompt.instructions,
    );

    const response = await this.createAndEmit(
      'assistant',
      chatId,
      turnId,
      text,
      null,
    );

    return response;
  }
}
