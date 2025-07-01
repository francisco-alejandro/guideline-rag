import { Event, Id } from '~shared/domain';
import { Role } from '../Message';

type MessageCreatedEventData = {
  role: Role;
  chatId: string;
  turnId: string;
  content: string;
  vector: number[] | null;
};

export class MessageCreatedEvent extends Event<MessageCreatedEventData> {
  constructor(aggregateRootId: Id, data: MessageCreatedEventData) {
    super('message.created', aggregateRootId.value, data);
  }
}
