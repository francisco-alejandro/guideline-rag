import { Injectable } from '@nestjs/common';
import { EventRepository, Event } from '~shared/domain';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseEventRepository implements EventRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async save(event: Event): Promise<void> {
    const content = {
      id: event.id,
      topic: event.topic,
      aggregate_root_id: event.aggregateRootId,
      data: event.data,
    };

    const { error } = await this.supabase.from('events').insert(content);

    if (error) {
      throw new Error(error.message);
    }
  }
}
