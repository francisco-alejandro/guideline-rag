import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Guideline, GuidelineRepository } from '~guideline/domain';
import { Id } from '~shared/domain';

type GuidelineDTO = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  embedding: number[];
  active: boolean;
};

@Injectable()
export class SupabaseGuidelineRepository implements GuidelineRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async save(guideline: Guideline): Promise<void> {
    const content = {
      id: guideline.id.value,
      title: guideline.title,
      content: guideline.content,
      tags: guideline.tags,
      active: guideline.active,
      embedding: guideline.vector || null,
    };

    const { error } = await this.supabase.from('guidelines').upsert(content);

    if (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: Id): Promise<Guideline | null> {
    const { data, error } = (await this.supabase
      .from('guidelines')
      .select('*')
      .eq('id', id.value)
      .single()) as { data: GuidelineDTO | null; error: Error | null };

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return null;
    }

    return new Guideline(
      new Id(data.id),
      data.title,
      data.content,
      data.tags,
      data.embedding,
      data.active,
    );
  }

  async findByVector(
    embedding: number[],
    threshold: number,
    limit: number,
  ): Promise<Guideline[]> {
    const { data, error } = (await this.supabase.rpc('match_guidelines', {
      query: embedding,
      threshold: threshold,
      count: limit,
    })) as { data: GuidelineDTO[] | null; error: Error | null };

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return [];
    }

    return data.map(
      (item) =>
        new Guideline(
          new Id(item.id),
          item.title,
          item.content,
          item.tags,
          item.embedding,
          true,
        ),
    );
  }
}
