import { Id } from '~shared/domain';
import { Message } from './Message';

export const MessageRepository = Symbol('MessageRepository');

export interface MessageRepository {
  findById(id: Id): Promise<Message | null>;
  findByVector(
    embedding: number[],
    threshold: number,
    limit: number,
  ): Promise<Message[]>;
  save(message: Message): Promise<void>;
}
