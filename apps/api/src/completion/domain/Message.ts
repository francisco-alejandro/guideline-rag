import { AggregateRoot, Id } from '~shared/domain';
import { MessageCreatedEvent } from '~completion/domain/events';
import { MessageEmbeddedEvent } from './events/MessageEmbeddedEvent';

export type Role = 'user' | 'assistant';

export class Message extends AggregateRoot {
  constructor(
    public id: Id,
    public role: Role,
    public chatId: Id,
    public turnId: Id,
    public content: string,
    public vector: number[] | null,
  ) {
    super();
  }

  static create(
    id: Id,
    role: Role,
    chatId: Id,
    turnId: Id,
    content: string,
    vector: number[] | null,
  ): Message {
    const message = new Message(id, role, chatId, turnId, content, vector);

    message.record(
      new MessageCreatedEvent(id, {
        role: message.role,
        chatId: message.chatId.value,
        turnId: message.turnId.value,
        content: message.content,
        vector: message.vector,
      }),
    );

    return message;
  }

  embed(vector: number[]): void {
    this.vector = vector;

    this.record(
      new MessageEmbeddedEvent(this.id, {
        vector: this.vector,
      }),
    );
  }
}
