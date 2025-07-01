import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Message, MessageRepository } from '~completion/domain';
import { Id } from '~shared/domain';

@Injectable()
export class SupabaseMessageRepository implements MessageRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async save(message: Message): Promise<void> {
    const content = {
      id: message.id.value,
      role: message.role,
      chat_id: message.chatId.value,
      turn_id: message.turnId.value,
      content: message.content,
      embedding: message.vector,
    };

    const { error } = await this.supabase.from('messages').upsert(content);

    if (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: Id): Promise<Message | null> {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .eq('id', id.value)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return null;
    }

    return new Message(
      new Id(data.id),
      data.role,
      data.chat_id,
      data.turn_id,
      data.content,
      data.embedding,
    );
  }

  async findByVector(
    embedding: number[],
    threshold: number,
    limit: number,
  ): Promise<Message[]> {
    const { data, error } = await this.supabase.rpc('match_messages', {
      query: embedding,
      threshold: threshold,
      count: limit,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(
      (item) =>
        new Message(
          new Id(item.id),
          item.role,
          new Id(item.chat_id),
          new Id(item.turn_id),
          item.content,
          item.embedding,
        ),
    );
  }
}
