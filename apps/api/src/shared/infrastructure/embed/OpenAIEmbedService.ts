import { Injectable } from '@nestjs/common';
import { EmbedService } from '~shared/domain';
import OpenAI from 'openai';

@Injectable()
export class OpenAIEmbedService implements EmbedService {
  constructor(private readonly openai: OpenAI) {}

  async embed(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }
}
