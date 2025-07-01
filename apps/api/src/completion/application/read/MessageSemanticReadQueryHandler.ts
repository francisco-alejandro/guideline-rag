import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { EmbedService } from '~shared/domain';
import { MessageSemanticReadQuery } from './MessageSemanticReadQuery';
import { Message, MessageRepository } from '~completion/domain';

@QueryHandler(MessageSemanticReadQuery)
export class MessageSemanticReadQueryHandler
  implements IQueryHandler<MessageSemanticReadQuery, Message[]>
{
  constructor(
    @Inject(MessageRepository) private respository: MessageRepository,
    @Inject(EmbedService) private embedService: EmbedService,
  ) {}

  async execute(query: MessageSemanticReadQuery): Promise<Message[]> {
    const { content } = query.data;

    const vector = await this.embedService.embed(content);

    return this.respository.findByVector(vector, 0.5, 5);
  }
}
